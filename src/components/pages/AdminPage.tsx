import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  getFeatureFlags,
  toggleFeatureFlagEnabled,
  toggleFeatureFlagPremium,
  type FeatureFlag,
} from '../../utils/featureFlags';
import { appendAuditEntry, getAuditLog, clearAuditLog, type AuditEntry } from '../../utils/adminAuditLog';

// ══════════════════════════════════════════════════════════
// Types
// ══════════════════════════════════════════════════════════

type UserRole = 'admin' | 'premium' | 'user';
type UserStatus = 'active' | 'suspended';

interface UserEntry {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  lastActive: string;
  provider: string;
}

type AdminTab = 'dashboard' | 'users' | 'content' | 'features' | 'analytics' | 'settings';

// ══════════════════════════════════════════════════════════
// Helpers — Read real users from authStore localStorage
// ══════════════════════════════════════════════════════════

interface StoredAuthUser {
  user: {
    id: string;
    email: string;
    displayName: string;
    provider: string;
    createdAt: string;
    twoFactorEnabled?: boolean;
  };
}

const USERS_STORAGE_KEY = 'auth_users_db';
const USER_STATUS_KEY = 'admin_user_statuses';
const USER_ROLE_OVERRIDE_KEY = 'admin_user_roles';

function loadRealUsers(): UserEntry[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return [];
    const stored: StoredAuthUser[] = JSON.parse(raw);

    // Load admin-managed overrides
    const statusMap: Record<string, UserStatus> = (() => {
      try { return JSON.parse(localStorage.getItem(USER_STATUS_KEY) || '{}'); } catch { return {}; }
    })();
    const roleMap: Record<string, UserRole> = (() => {
      try { return JSON.parse(localStorage.getItem(USER_ROLE_OVERRIDE_KEY) || '{}'); } catch { return {}; }
    })();

    return stored.map((s) => ({
      id: s.user.id,
      name: s.user.displayName,
      email: s.user.email,
      role: roleMap[s.user.id] ?? (s.user.id === 'admin-001' ? 'admin' : 'user'),
      status: statusMap[s.user.id] ?? 'active',
      joined: s.user.createdAt?.slice(0, 10) ?? '',
      lastActive: s.user.createdAt?.slice(0, 10) ?? '',
      provider: s.user.provider ?? 'email',
    }));
  } catch {
    return [];
  }
}

function saveUserRole(id: string, role: UserRole): void {
  const map: Record<string, UserRole> = (() => {
    try { return JSON.parse(localStorage.getItem(USER_ROLE_OVERRIDE_KEY) || '{}'); } catch { return {}; }
  })();
  map[id] = role;
  localStorage.setItem(USER_ROLE_OVERRIDE_KEY, JSON.stringify(map));
}

function saveUserStatus(id: string, status: UserStatus): void {
  const map: Record<string, UserStatus> = (() => {
    try { return JSON.parse(localStorage.getItem(USER_STATUS_KEY) || '{}'); } catch { return {}; }
  })();
  map[id] = status;
  localStorage.setItem(USER_STATUS_KEY, JSON.stringify(map));
}

// ══════════════════════════════════════════════════════════
// Static / Mock data
// ══════════════════════════════════════════════════════════

const DASHBOARD_STATS = [
  { label: 'Tổng người dùng', icon: 'group', trend: '+12%', trendUp: true, valueKey: 'users' },
  { label: 'Lượt xem hôm nay', icon: 'visibility', trend: '+8%', trendUp: true, valueKey: 'views' },
  { label: 'Module phổ biến', icon: 'star', trend: '', trendUp: true, valueKey: 'top' },
  { label: 'Thời gian TB', icon: 'timer', trend: '-5%', trendUp: false, valueKey: 'time' },
];

const MODULE_USAGE = [
  { name: 'Âm Lịch',   percentage: 95, color: 'from-blue-400 to-blue-600' },
  { name: 'Tử Vi',     percentage: 78, color: 'from-amber-400 to-amber-600' },
  { name: 'Chiêm Tinh',percentage: 62, color: 'from-rose-400 to-rose-600' },
  { name: 'Dụng Sự',   percentage: 55, color: 'from-emerald-400 to-emerald-600' },
  { name: 'Gieo Quẻ',  percentage: 45, color: 'from-purple-400 to-purple-600' },
];

const ADMIN_TABS: { id: AdminTab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Tổng quan',   icon: 'dashboard' },
  { id: 'users',     label: 'Người dùng',  icon: 'group' },
  { id: 'content',   label: 'Nội dung',    icon: 'article' },
  { id: 'features',  label: 'Tính năng',   icon: 'toggle_on' },
  { id: 'analytics', label: 'Phân tích',   icon: 'analytics' },
  { id: 'settings',  label: 'Hệ thống',    icon: 'settings' },
];

// ══════════════════════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════════════════════

function AdminToggle({ checked, onChange, variant = 'default' }: {
  checked: boolean;
  onChange: () => void;
  variant?: 'default' | 'danger';
}) {
  const activeColor = variant === 'danger'
    ? 'bg-red-500 dark:bg-red-400'
    : 'bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500';
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 ${checked ? activeColor : 'bg-gray-200 dark:bg-gray-600'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

// ══════════════════════════════════════════════════════════
// Main Page
// ══════════════════════════════════════════════════════════

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Feature flags — loaded from localStorage, persisted on every change
  const [features, setFeatures] = useState<FeatureFlag[]>(() => getFeatureFlags());

  // Users — loaded from real authStore localStorage
  const [users, setUsers] = useState<UserEntry[]>(() => loadRealUsers());
  const [userSearch, setUserSearch] = useState('');

  // System settings
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Audit log state
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(() => getAuditLog());
  const [confirmClearAudit, setConfirmClearAudit] = useState(false);

  // User action dropdown
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const deleteUserFromStore = useAuthStore((s) => s.deleteUser);

  const refreshAuditLog = useCallback(() => setAuditLog(getAuditLog()), []);

  // Promo code manager state
  const PROMO_STORAGE_KEY = 'promo_redemptions';
  const loadPromoRedemptions = useCallback(() => {
    try {
      const raw = localStorage.getItem(PROMO_STORAGE_KEY);
      return raw ? JSON.parse(raw) as { code: string; type: string; redeemedAt: string; label: string; userId?: string }[] : [];
    } catch { return []; }
  }, []);
  const [promoRedemptions, setPromoRedemptions] = useState(() => loadPromoRedemptions());
  const [confirmRevokePromo, setConfirmRevokePromo] = useState<{ code: string; idx: number } | null>(null);

  // Group redemptions by code
  const promoByCode = useMemo(() => {
    const PROMO_CODES = [
      { code: 'PREMIUM1M', label: 'Premium miễn phí 1 tháng', type: 'free_premium' },
      { code: 'PREMIUM3M', label: 'Premium miễn phí 3 tháng', type: 'free_premium' },
      { code: 'PREMIUM6M', label: 'Premium miễn phí 6 tháng', type: 'free_premium' },
      { code: 'DISCOUNT15', label: 'Giảm giá 15%', type: 'discount' },
      { code: 'DISCOUNT30', label: 'Giảm giá 30%', type: 'discount' },
    ];
    return PROMO_CODES.map((promo) => ({
      ...promo,
      redemptions: promoRedemptions.filter((r) => r.code === promo.code),
    }));
  }, [promoRedemptions]);

  const handleRevokePromo = (idx: number) => {
    const updated = promoRedemptions.filter((_, i) => i !== idx);
    localStorage.setItem(PROMO_STORAGE_KEY, JSON.stringify(updated));
    setPromoRedemptions(updated);
    appendAuditEntry('promo_revoke', `Thu hồi mã ${promoRedemptions[idx]?.code} (lượt dùng #${idx + 1})`, { code: promoRedemptions[idx]?.code });
    refreshAuditLog();
    setConfirmRevokePromo(null);
  };

  // ─── Feature flag handlers ───────────────────────────────
  const handleToggleEnabled = (id: string) => {
    const flag = features.find((f) => f.id === id);
    const updated = toggleFeatureFlagEnabled(id);
    setFeatures(updated);
    appendAuditEntry(
      'feature_toggle',
      `Tính năng "${flag?.name ?? id}" được ${flag?.enabled ? 'tắt' : 'bật'}`,
      { id, newValue: !flag?.enabled }
    );
    refreshAuditLog();
  };

  const handleTogglePremium = (id: string) => {
    const flag = features.find((f) => f.id === id);
    const updated = toggleFeatureFlagPremium(id);
    setFeatures(updated);
    appendAuditEntry(
      'feature_premium_toggle',
      `"${flag?.name ?? id}" Premium: ${flag?.premium ? 'bỏ đánh dấu' : 'đánh dấu'}`,
      { id, newPremium: !flag?.premium }
    );
    refreshAuditLog();
  };

  // ─── User management handlers ─────────────────────────────
  const handleRoleChange = (user: UserEntry, newRole: UserRole) => {
    saveUserRole(user.id, newRole);
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, role: newRole } : u));
    appendAuditEntry('user_role_change', `${user.name} (${user.email}) → ${newRole}`, { userId: user.id, newRole });
    refreshAuditLog();
    setOpenActionMenu(null);
  };

  const handleStatusChange = (user: UserEntry, newStatus: UserStatus) => {
    saveUserStatus(user.id, newStatus);
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: newStatus } : u));
    appendAuditEntry(
      newStatus === 'suspended' ? 'user_suspend' : 'user_reactivate',
      `${user.name} (${user.email}) ${newStatus === 'suspended' ? 'bị đình chỉ' : 'được khôi phục'}`,
      { userId: user.id }
    );
    refreshAuditLog();
    setOpenActionMenu(null);
  };

  const handleDeleteUser = (user: UserEntry) => {
    const result = deleteUserFromStore(user.id);
    if (result.success) {
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      appendAuditEntry('user_delete', `Xóa tài khoản ${user.name} (${user.email})`, { userId: user.id });
      refreshAuditLog();
    }
    setConfirmDeleteId(null);
    setOpenActionMenu(null);
  };

  // ─── Maintenance mode ────────────────────────────────────
  const handleMaintenanceToggle = () => {
    const next = !maintenanceMode;
    setMaintenanceMode(next);
    appendAuditEntry('maintenance_mode', `Chế độ bảo trì: ${next ? 'BẬT' : 'TẮT'}`, { enabled: next });
    refreshAuditLog();
  };

  // ─── Helpers ─────────────────────────────────────────────
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const roleBadge = (role: UserRole) => {
    const styles: Record<UserRole, string> = {
      admin:   'bg-red-500/10 text-red-600 dark:text-red-400',
      premium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      user:    'bg-gray-500/10 text-gray-500 dark:text-gray-400',
    };
    const labels: Record<UserRole, string> = { admin: 'Admin', premium: 'Premium', user: 'User' };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[role]}`}>
        {labels[role]}
      </span>
    );
  };

  const statusBadge = (status: UserStatus) =>
    status === 'suspended' ? (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-500 dark:text-red-400">
        Đình chỉ
      </span>
    ) : null;

  // ─── Render ───────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-6xl animate-fade-in-up" onClick={() => setOpenActionMenu(null)} role="presentation">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors"
          aria-label="Quay lại"
        >
          <span className="material-icons-round text-xl">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Quản trị</h1>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Bảng điều khiển</p>
        </div>
      </div>

      {/* 2-column layout: sidebar + content */}

      {/* Mobile: horizontal tab strip (above content) */}
      <div className="md:hidden mb-4">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold/15 to-amber-500/10 dark:from-gold-dark/12 dark:to-amber-400/8 text-gold dark:text-gold-dark shadow-sm'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <span className="material-icons-round text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: sidebar + content (flex row) */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT SIDEBAR ── */}
        <nav className="hidden md:flex flex-col gap-0.5 w-[190px] shrink-0 sticky top-4 glass-card p-2">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-gold/15 to-amber-500/10 dark:from-gold-dark/15 dark:to-amber-400/8 text-gold dark:text-gold-dark'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100/80 dark:hover:bg-white/5'
              }`}
            >
              <span className={`material-icons-round text-[18px] ${
                activeTab === tab.id ? 'text-gold dark:text-gold-dark' : 'text-text-secondary-light/50 dark:text-text-secondary-dark/40'
              }`}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 min-w-0 space-y-3">

      {/* ──── Dashboard ──── */}
      {activeTab === 'dashboard' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {DASHBOARD_STATS.map((stat) => {
              const displayValue =
                stat.valueKey === 'users' ? String(users.length) :
                stat.valueKey === 'views' ? '3,567' :
                stat.valueKey === 'top'   ? 'Tử Vi' : '4m 32s';
              return (
                <div key={stat.label} className="glass-card p-4">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gold/8 dark:bg-gold-dark/6 flex items-center justify-center">
                      <span className="material-icons-round text-base text-gold dark:text-gold-dark">{stat.icon}</span>
                    </div>
                    {stat.trend && (
                      <span className={`text-[10px] font-bold ${stat.trendUp ? 'text-good dark:text-good-dark' : 'text-bad dark:text-bad-dark'}`}>
                        {stat.trend}
                      </span>
                    )}
                  </div>
                  <p className="text-xl font-bold">{displayValue}</p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Module Usage */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">bar_chart</span>
              Sử dụng theo module
            </h3>
            <div className="space-y-3">
              {MODULE_USAGE.map((m) => (
                <div key={m.name}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-text-secondary-light dark:text-text-secondary-dark">{m.percentage}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                    <div className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-1000`} style={{ width: `${m.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity — from audit log if available, else static */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">history</span>
              Hoạt động gần đây
            </h3>
            <div className="space-y-0">
              {auditLog.length > 0
                ? auditLog.slice(0, 5).map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border-light/15 dark:border-border-dark/15 last:border-0">
                    <div className="w-7 h-7 rounded-lg bg-surface-subtle-light dark:bg-white/5 flex items-center justify-center shrink-0">
                      <span className="material-icons-round text-xs text-text-secondary-light dark:text-text-secondary-dark">admin_panel_settings</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{entry.description}</p>
                      <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">{entry.action}</p>
                    </div>
                    <span className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 whitespace-nowrap">
                      {new Date(entry.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
                : [
                  { action: 'Người dùng mới đăng ký', user: 'Phạm Diệu D', time: '2 phút trước', icon: 'person_add' },
                  { action: 'Tạo lá số Tử Vi',        user: 'Lê Hoàng C',  time: '15 phút trước', icon: 'auto_awesome' },
                  { action: 'Gieo quẻ Mai Hoa',        user: 'Trần Thị B',  time: '1 giờ trước',  icon: 'casino' },
                  { action: 'Xuất báo cáo PDF',        user: 'Nguyễn Văn A',time: '3 giờ trước',  icon: 'picture_as_pdf' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border-light/15 dark:border-border-dark/15 last:border-0">
                    <div className="w-7 h-7 rounded-lg bg-surface-subtle-light dark:bg-white/5 flex items-center justify-center shrink-0">
                      <span className="material-icons-round text-xs text-text-secondary-light dark:text-text-secondary-dark">{item.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.action}</p>
                      <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">{item.user}</p>
                    </div>
                    <span className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 whitespace-nowrap">{item.time}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* ──── Users ──── */}
      {activeTab === 'users' && (
        <div className="glass-card overflow-hidden">
          <div className="p-4 border-b border-border-light/20 dark:border-border-dark/20">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-icons-round text-base text-text-secondary-light/50 dark:text-text-secondary-dark/50">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/20 dark:border-border-dark/20 text-xs focus:ring-2 focus:ring-gold/20 dark:focus:ring-gold-dark/20 outline-none transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-light/30 dark:border-border-dark/30 text-text-secondary-light dark:text-text-secondary-dark">
                  <th className="text-left px-4 py-2.5 font-semibold">Người dùng</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden sm:table-cell">Email</th>
                  <th className="text-center px-4 py-2.5 font-semibold">Vai trò</th>
                  <th className="text-left px-4 py-2.5 font-semibold hidden md:table-cell">Tham gia</th>
                  <th className="text-center px-4 py-2.5 font-semibold w-12" />
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-xs text-text-secondary-light dark:text-text-secondary-dark">
                      {users.length === 0 ? 'Chưa có người dùng đăng ký.' : 'Không tìm thấy kết quả.'}
                    </td>
                  </tr>
                ) : filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b border-border-light/10 dark:border-border-dark/10 transition-colors ${user.status === 'suspended' ? 'opacity-50' : 'hover:bg-gray-50/50 dark:hover:bg-white/3'}`}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gold/8 dark:bg-gold-dark/6 flex items-center justify-center shrink-0">
                          <span className="text-[10px] font-bold text-gold dark:text-gold-dark">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <span className="font-medium truncate">{user.name}</span>
                          {statusBadge(user.status)}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-text-secondary-light dark:text-text-secondary-dark hidden sm:table-cell">{user.email}</td>
                    <td className="px-4 py-2.5 text-center">{roleBadge(user.role)}</td>
                    <td className="px-4 py-2.5 text-text-secondary-light dark:text-text-secondary-dark hidden md:table-cell">{user.joined?.slice(0, 10)}</td>
                    <td className="px-4 py-2.5 text-center">
                      {user.role !== 'admin' && (
                        <div className="relative" onClick={(e) => e.stopPropagation()} role="presentation">
                          <button
                            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                            onClick={() => setOpenActionMenu(openActionMenu === user.id ? null : user.id)}
                          >
                            <span className="material-icons-round text-sm text-text-secondary-light/50 dark:text-text-secondary-dark/40">more_vert</span>
                          </button>
                          {openActionMenu === user.id && (
                            <div className="absolute right-0 mt-1 w-44 rounded-xl shadow-xl bg-surface-light dark:bg-surface-dark border border-border-light/30 dark:border-border-dark/30 overflow-hidden z-50">
                              {user.role !== 'premium' && (
                                <button onClick={() => handleRoleChange(user, 'premium')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-amber-50 dark:hover:bg-amber-900/10 text-amber-700 dark:text-amber-400 flex items-center gap-2">
                                  <span className="material-icons-round text-sm">workspace_premium</span> Nâng lên Premium
                                </button>
                              )}
                              {user.role === 'premium' && (
                                <button onClick={() => handleRoleChange(user, 'user')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2">
                                  <span className="material-icons-round text-sm">person</span> Hạ xuống User
                                </button>
                              )}
                              {user.status === 'active' ? (
                                <button onClick={() => handleStatusChange(user, 'suspended')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 flex items-center gap-2">
                                  <span className="material-icons-round text-sm">block</span> Đình chỉ
                                </button>
                              ) : (
                                <button onClick={() => handleStatusChange(user, 'active')} className="w-full text-left px-4 py-2.5 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                                  <span className="material-icons-round text-sm">check_circle</span> Khôi phục
                                </button>
                              )}
                              <div className="border-t border-border-light/20 dark:border-border-dark/20" />
                              {confirmDeleteId === user.id ? (
                                <div className="px-4 py-2.5 flex items-center gap-2">
                                  <span className="text-[10px] text-red-600 dark:text-red-400 flex-1">Xác nhận xóa?</span>
                                  <button onClick={() => handleDeleteUser(user)} className="text-[10px] font-bold text-red-600 dark:text-red-400 hover:underline">Đồng ý</button>
                                  <button onClick={() => setConfirmDeleteId(null)} className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark hover:underline">Hủy</button>
                                </div>
                              ) : (
                                <button onClick={() => setConfirmDeleteId(user.id)} className="w-full text-left px-4 py-2.5 text-xs hover:bg-red-50 dark:hover:bg-red-900/10 text-red-600 dark:text-red-400 flex items-center gap-2">
                                  <span className="material-icons-round text-sm">delete_forever</span> Xóa tài khoản
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-2.5 border-t border-border-light/20 dark:border-border-dark/20 text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50">
            Hiển thị {filteredUsers.length} / {users.length} người dùng
          </div>
        </div>
      )}

      {/* ──── Content ──── */}
      {activeTab === 'content' && (
        <div className="space-y-2.5">
          {[
            { title: 'Dữ liệu sao Tử Vi',    count: '115 sao',      icon: 'star',        desc: 'Chính tinh, phụ tinh, sao vòng Tràng Sinh' },
            { title: 'Cách Cục Tử Vi',        count: '40+ cách',     icon: 'pattern',     desc: 'Các cách cục trong Tử Vi Đẩu Số' },
            { title: 'Dữ liệu hành tinh',     count: '10 hành tinh', icon: 'blur_circular',desc: 'Mặt Trời, Mặt Trăng, và 8 hành tinh' },
            { title: 'Góc chiếu Chiêm Tinh',  count: '326+ mục',     icon: 'link',        desc: 'Aspect interpretations giữa các hành tinh' },
            { title: 'Ngọc Hạp Thông Thư',    count: '64 quẻ',       icon: 'book',        desc: 'Cơ sở dữ liệu Ngọc Hạp cho Dụng Sự' },
            { title: 'Mai Hoa Dịch Số',        count: '64 quẻ',       icon: 'casino',      desc: 'Hệ thống giải quẻ Mai Hoa' },
          ].map((item) => (
            <div key={item.title} className="glass-card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-subtle-light dark:bg-white/5 flex items-center justify-center shrink-0">
                  <span className="material-icons-round text-sm text-gold dark:text-gold-dark">{item.icon}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold">{item.title}</p>
                  <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">{item.desc}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gold dark:text-gold-dark shrink-0">{item.count}</span>
            </div>
          ))}
        </div>
      )}

      {/* ──── Features ──── */}
      {activeTab === 'features' && (
        <div className="glass-card overflow-hidden">
          <div className="px-5 py-3 border-b border-border-light/20 dark:border-border-dark/20">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">toggle_on</span>
              Feature Flags
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border-light/20 dark:border-border-dark/20 text-text-secondary-light dark:text-text-secondary-dark">
                  <th className="text-left px-5 py-2.5 font-semibold">Tính năng</th>
                  <th className="text-center px-4 py-2.5 font-semibold hidden sm:table-cell">Module</th>
                  <th className="text-center px-4 py-2.5 font-semibold">Bật</th>
                  <th className="text-center px-4 py-2.5 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature) => (
                  <tr key={feature.id} className="border-b border-border-light/10 dark:border-border-dark/10 hover:bg-gray-50/50 dark:hover:bg-white/3 transition-colors">
                    <td className="px-5 py-2.5">
                      <p className="font-medium">{feature.name}</p>
                      <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{feature.description}</p>
                    </td>
                    <td className="px-4 py-2.5 text-center hidden sm:table-cell">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-subtle-light dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark">
                        {feature.module}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <AdminToggle checked={feature.enabled} onChange={() => handleToggleEnabled(feature.id)} />
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <button
                        onClick={() => handleTogglePremium(feature.id)}
                        className={`p-1 rounded-lg transition-all duration-200 ${feature.premium
                          ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/15'
                          : 'text-gray-300 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500'
                        }`}
                        title={feature.premium ? 'Premium — Nhấn để bỏ' : 'Nhấn để đánh dấu Premium'}
                      >
                        <span className="material-icons-round text-base">workspace_premium</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-2.5 border-t border-border-light/20 dark:border-border-dark/20 bg-surface-subtle-light/50 dark:bg-surface-subtle-dark/50">
            <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 flex items-center gap-1">
              <span className="material-icons-round text-xs">save</span>
              Thay đổi được lưu tự động vào localStorage.
            </p>
          </div>
        </div>
      )}

      {/* ──── Analytics ──── */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">pie_chart</span>
              Phân bổ sử dụng
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2.5">
                {MODULE_USAGE.map((m) => (
                  <div key={m.name} className="flex items-center gap-2.5">
                    <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${m.color} shrink-0`} />
                    <span className="text-xs flex-1">{m.name}</span>
                    <span className="text-xs font-bold">{m.percentage}%</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-[6px] border-gold/15 dark:border-gold-dark/10 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xl font-bold">3.5K</p>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">lượt / ngày</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">schedule</span>
              Giờ cao điểm
            </h3>
            <div className="flex items-end gap-0.5 h-28">
              {[8,15,25,40,55,70,85,95,80,65,50,35,45,60,75,88,92,78,55,40,30,20,15,10].map((h, i) => (
                <div key={i} className="flex-1 bg-gold/15 dark:bg-gold-dark/10 rounded-t hover:bg-gold/30 dark:hover:bg-gold-dark/20 transition-colors group relative" style={{ height: `${h}%` }} title={`${i}:00 — ${h}%`}>
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] text-text-secondary-light dark:text-text-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{i}h</div>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-text-secondary-light/50 dark:text-text-secondary-dark/40 mt-1">
              <span>0:00</span><span>6:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
            </div>
          </div>
        </div>
      )}

      {/* ──── System Settings ──── */}
      {activeTab === 'settings' && (
        <div className="space-y-3">
          {/* System Health Metrics */}
          {(() => {
            const totalBytes = Object.keys(localStorage).reduce((acc, k) => {
              return acc + (localStorage.getItem(k)?.length ?? 0) * 2; // UTF-16 chars
            }, 0);
            const maxBytes = 5 * 1024 * 1024; // 5MB
            const usedPct = Math.min((totalBytes / maxBytes) * 100, 100);
            const AUTH_KEYS = new Set(['auth_user', 'auth_users_db', 'promo_redemptions', 'admin_user_roles', 'admin_user_statuses', 'admin_audit_log', 'admin_feature_flags']);
            const cleanableKeys = Object.keys(localStorage).filter((k) => !AUTH_KEYS.has(k));
            return (
              <div className="glass-card p-5">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="material-icons-round text-base text-gold dark:text-gold-dark">monitor_heart</span>
                  Sức khỏe Hệ thống
                </h3>
                <div className="space-y-3">
                  {/* Storage bar */}
                  <div>
                    <div className="flex justify-between text-[10px] text-text-secondary-light dark:text-text-secondary-dark mb-1">
                      <span>localStorage</span>
                      <span>{(totalBytes / 1024).toFixed(1)} KB / 5 MB</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          usedPct > 80 ? 'bg-red-500' : usedPct > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${usedPct}%` }}
                      />
                    </div>
                  </div>
                  {/* Stat grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Khóa localStorage', value: `${Object.keys(localStorage).length}` },
                      { label: 'Người dùng đăng ký', value: `${users.length}` },
                      { label: 'Nhật ký quản trị', value: `${auditLog.length} mục` },
                      { label: 'Có thể dọn', value: `${cleanableKeys.length} khóa` },
                    ].map((item) => (
                      <div key={item.label} className="bg-surface-subtle-light dark:bg-white/3 rounded-lg px-3 py-2">
                        <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50">{item.label}</p>
                        <p className="text-xs font-bold">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Cache clear button */}
                  <button
                    onClick={() => {
                      cleanableKeys.forEach((k) => localStorage.removeItem(k));
                      appendAuditEntry('cache_clear', `Dọn ${cleanableKeys.length} khóa localStorage`, { count: cleanableKeys.length });
                      refreshAuditLog();
                    }}
                    disabled={cleanableKeys.length === 0}
                    className="w-full text-xs py-2 px-3 rounded-lg border border-dashed border-border-light/40 dark:border-border-dark/40 text-text-secondary-light dark:text-text-secondary-dark hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                  >
                    <span className="material-icons-round text-sm">cleaning_services</span>
                    Dọn {cleanableKeys.length} khóa cache không cần thiết
                  </button>
                </div>
              </div>
            );
          })()}
          {/* System Config */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">build</span>
              Cấu hình hệ thống
            </h3>
            <div className="flex items-center justify-between py-3 border-b border-border-light/20 dark:border-border-dark/20">
              <div>
                <p className="text-xs font-medium">Chế độ bảo trì</p>
                <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Tạm dừng truy cập người dùng</p>
              </div>
              <AdminToggle checked={maintenanceMode} onChange={handleMaintenanceToggle} variant="danger" />
            </div>
          </div>

          {/* App Info */}
          <div className="glass-card p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <span className="material-icons-round text-base text-gold dark:text-gold-dark">info</span>
              Thông tin ứng dụng
            </h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {[
                { label: 'Phiên bản', value: 'v2.2.0' },
                { label: 'License',  value: 'MIT' },
                { label: 'Build',    value: import.meta.env.MODE === 'development' ? 'Development' : 'Production' },
                { label: 'Người dùng', value: `${users.length} tài khoản` },
              ].map((item) => (
                <div key={item.label} className="py-2 border-b border-border-light/10 dark:border-border-dark/10">
                  <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50">{item.label}</p>
                  <p className="text-xs font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Promo Code Manager */}
          <div className="glass-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border-light/20 dark:border-border-dark/20">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="material-icons-round text-base text-gold dark:text-gold-dark">confirmation_number</span>
                Quản lý Mã Khuyến Mãi
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark">{promoRedemptions.length} lượt dùng</span>
              </h3>
            </div>
            <div className="divide-y divide-border-light/10 dark:divide-border-dark/10">
              {promoByCode.map((promo) => (
                <div key={promo.code} className="px-5 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-bold font-mono text-gold dark:text-gold-dark">{promo.code}</p>
                      <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">{promo.label}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      promo.redemptions.length > 0
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-gray-200/60 dark:bg-white/5 text-text-secondary-light dark:text-text-secondary-dark'
                    }`}>{promo.redemptions.length} lượt</span>
                  </div>
                  {promo.redemptions.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {promo.redemptions.map((r, globalIdx) => {
                        const absIdx = promoRedemptions.findIndex((p, i) => p.code === r.code && i >= 0 && JSON.stringify(p) === JSON.stringify(r));
                        return (
                          <div key={globalIdx} className="flex items-center justify-between py-1 px-2 rounded-lg bg-surface-subtle-light dark:bg-white/3 gap-2">
                            <div>
                              <p className="text-[10px] font-medium">{r.label}</p>
                              <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50">
                                {new Date(r.redeemedAt).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                              </p>
                            </div>
                            {confirmRevokePromo?.code === r.code && confirmRevokePromo.idx === absIdx ? (
                              <div className="flex items-center gap-1.5 shrink-0">
                                <button onClick={() => handleRevokePromo(absIdx)} className="text-[10px] font-bold text-red-600 dark:text-red-400 px-2 py-0.5 rounded hover:bg-red-50 dark:hover:bg-red-900/15 transition-colors">Xác nhận</button>
                                <button onClick={() => setConfirmRevokePromo(null)} className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark px-2 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-white/5">Hủy</button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmRevokePromo({ code: r.code, idx: absIdx })}
                                className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 hover:text-red-500 dark:hover:text-red-400 transition-colors px-2 py-0.5 rounded hover:bg-red-50 dark:hover:bg-red-900/10 shrink-0"
                              >
                                <span className="material-icons-round text-[10px]">block</span> Thu hồi
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div className="glass-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border-light/20 dark:border-border-dark/20">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="material-icons-round text-base text-gold dark:text-gold-dark">receipt_long</span>
                Nhật ký Quản trị
                {auditLog.length > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-gold/10 dark:bg-gold-dark/10 text-gold dark:text-gold-dark">
                    {auditLog.length}
                  </span>
                )}
              </h3>
              {auditLog.length > 0 && (
                confirmClearAudit ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Xác nhận xóa?</span>
                    <button onClick={() => { clearAuditLog(); setAuditLog([]); setConfirmClearAudit(false); }} className="text-[10px] font-bold text-red-600 dark:text-red-400 px-2 py-0.5 rounded hover:bg-red-50 dark:hover:bg-red-900/15">Xóa</button>
                    <button onClick={() => setConfirmClearAudit(false)} className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark px-2 py-0.5 rounded hover:bg-gray-100 dark:hover:bg-white/5">Hủy</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmClearAudit(true)} className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 hover:text-red-500 dark:hover:text-red-400 transition-colors flex items-center gap-0.5">
                    <span className="material-icons-round text-xs">delete_sweep</span> Xóa
                  </button>
                )
              )}
            </div>
            <div className="max-h-72 overflow-y-auto">
              {auditLog.length === 0 ? (
                <p className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/50 text-center py-8">
                  Chưa có hành động nào được ghi lại.
                </p>
              ) : auditLog.map((entry, i) => (
                <div key={i} className="flex items-start gap-3 px-5 py-2.5 border-b border-border-light/10 dark:border-border-dark/10 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/3">
                  <div className="w-6 h-6 rounded-lg bg-surface-subtle-light dark:bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-icons-round text-[10px] text-text-secondary-light dark:text-text-secondary-dark">
                      {entry.action.includes('feature') ? 'toggle_on' : entry.action.includes('user') ? 'person' : 'settings'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium">{entry.description}</p>
                    <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50">
                      {new Date(entry.timestamp).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="h-6" />
        </div> {/* end right content */}
      </div> {/* end 2-column flex */}
    </div>
  );
}
