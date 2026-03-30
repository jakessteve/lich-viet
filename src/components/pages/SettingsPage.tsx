import React, { useState, useRef, useEffect, useCallback } from 'react';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../stores/appStore';
import { useAuthStore } from '../../stores/authStore';
import TwoFactorSetup from '../auth/TwoFactorSetup';
import PromotionCodeInput from '../auth/PromotionCodeInput';
import { useUserTier } from '@/hooks/useUserTier';
import { CreditRefreshBanner } from '../shared/CreditRefreshBanner';
import LocationPicker, { type SelectedLocation } from '../ChiemTinh/LocationPicker';
// ══════════════════════════════════════════════════════════
// Toggle Switch — Modern pill toggle
// ══════════════════════════════════════════════════════════

function Toggle({ checked, onChange, id }: { checked: boolean; onChange: (v: boolean) => void; id: string }) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-14 h-8 rounded-full transition-all duration-300 ${checked
          ? 'bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 shadow-sm shadow-gold/20 dark:shadow-gold-dark/25'
          : 'bg-gray-200 dark:bg-gray-600'
        }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-7 h-7 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${checked ? 'translate-x-6' : 'translate-x-0'
          }`}
      />
    </button>
  );
}

// ══════════════════════════════════════════════════════════
// Setting Row — Consistent layout
// ══════════════════════════════════════════════════════════

function SettingRow({ icon, label, description, children }: {
  icon: string;
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5 border-b border-border-light/20 dark:border-border-dark/20 last:border-0">
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <span className="material-icons-round text-lg text-text-secondary-light/60 dark:text-text-secondary-dark/60 mt-0.5 shrink-0">{icon}</span>
        <div className="min-w-0">
          <p className="text-sm font-medium">{label}</p>
          {description && (
            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5 leading-relaxed">{description}</p>
          )}
        </div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// Select Component — Modern dropdown
// ══════════════════════════════════════════════════════════

function Select({ value, onChange, options, id }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  id: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs px-3 py-1.5 rounded-lg bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/40 dark:border-border-dark/40 text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-gold/30 dark:focus:ring-gold-dark/30 outline-none transition-all"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}

// ══════════════════════════════════════════════════════════
// Section Card — Flat, modern, always-open
// ══════════════════════════════════════════════════════════

function SectionCard({ icon, title, children }: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card">
      <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border-light/20 dark:border-border-dark/15">
        <span className="material-icons-round text-base text-gold dark:text-gold-dark">{icon}</span>
        <span className="text-base font-semibold tracking-tight">{title}</span>
      </div>
      <div className="px-5 py-1">{children}</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
// Settings Page — Modern flat design
// ══════════════════════════════════════════════════════════

export default function SettingsPage() {
  usePageTitle('Cài đặt');
  const navigate = useNavigate();
  const isDark = useAppStore((s) => s.isDark);
  const toggleDarkMode = useAppStore((s) => s.toggleDarkMode);
  const fontSize = useAppStore((s) => s.fontSize);
  const setFontSizeLevel = useAppStore((s) => s.setFontSizeLevel);
  const { user, isAuthenticated, logout, updateProfile, changePassword } = useAuthStore();
  const tierInfo = useUserTier();
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Active section (sidebar navigation)
  const [activeSection, setActiveSection] = useState('appearance');

  // Sections definition
  const SECTIONS = [
    { id: 'appearance',    icon: 'palette',          label: 'Giao diện' },
    { id: 'language',      icon: 'translate',         label: 'Ngôn ngữ' },
    { id: 'calendar',      icon: 'calendar_month',    label: 'Âm Lịch' },
    { id: 'notifications', icon: 'notifications',     label: 'Thông báo' },
    { id: 'astrology',     icon: 'auto_awesome',      label: 'Tử Vi & Chiêm Tinh' },
    { id: 'data',          icon: 'security',          label: 'Dữ liệu' },
    { id: 'subscription',  icon: 'workspace_premium', label: 'Gói Dịch Vụ' },
    ...(isAuthenticated ? [
      { id: 'profile',     icon: 'manage_accounts',   label: 'Hồ Sơ' },
      { id: 'security',    icon: 'shield',            label: 'Bảo mật' },
      { id: 'promo',       icon: 'card_giftcard',     label: 'Khuyến mãi' },
    ] : []),
    { id: 'account',       icon: 'person',            label: 'Tài khoản' },
  ];

  // Profile editing state
  const [profileMode, setProfileMode] = useState<'view' | 'edit' | 'password'>('view');
  const [editName, setEditName] = useState('');
  const [editDay, setEditDay] = useState('');
  const [editMonth, setEditMonth] = useState('');
  const [editYear, setEditYear] = useState('');
  const [editBirthHour, setEditBirthHour] = useState('');
  const [editBirthMinute, setEditBirthMinute] = useState('');
  const [editLat, setEditLat] = useState('');
  const [editLng, setEditLng] = useState('');
  const [editLocationName, setEditLocationName] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Password change state
  const [pwCurrent, setPwCurrent] = useState('');
  const [pwNew, setPwNew] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const startEdit = () => {
    setEditName(user?.displayName ?? '');

    let d = '', m = '', y = '';
    if (user?.birthday) {
        const parts = user.birthday.split('-');
        if (parts.length === 3) {
            y = parts[0]; m = parts[1]; d = parts[2];
        }
    }
    setEditDay(d);
    setEditMonth(m);
    setEditYear(y);

    setEditBirthHour(user?.profile?.birthHour !== undefined ? String(user.profile.birthHour) : '');
    setEditBirthMinute(user?.profile?.birthMinute !== undefined ? String(user.profile.birthMinute) : '');

    setEditLat(user?.extendedProfile?.birthLocation?.lat != null ? String(user.extendedProfile.birthLocation.lat) : '');
    setEditLng(user?.extendedProfile?.birthLocation?.lng != null ? String(user.extendedProfile.birthLocation.lng) : '');
    setEditLocationName(user?.extendedProfile?.birthLocation?.city || '');

    setEditAvatar(user?.avatarUrl ?? '');
    setProfileMsg(null);
    setProfileMode('edit');
  };

  const cancelEdit = () => {
    setProfileMode('view');
    setProfileMsg(null);
  };

  const handleLocationSelect = useCallback((loc: SelectedLocation) => {
    setEditLat(loc.lat.toString());
    setEditLng(loc.lng.toString());
    setEditLocationName(loc.locationName);
  }, []);

  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileMsg(null);

    let birthdayStr = undefined;
    if (editYear && editMonth && editDay) {
        birthdayStr = `${editYear}-${String(editMonth).padStart(2, '0')}-${String(editDay).padStart(2, '0')}`;
    }

    let birthLocation = undefined;
    if (editLat && editLng) {
        birthLocation = { lat: Number(editLat), lng: Number(editLng), city: editLocationName };
    }

    const result = await updateProfile({
      displayName: editName || undefined,
      birthday: birthdayStr,
      avatarUrl: editAvatar || undefined,
      birthHour: editBirthHour === '' ? null : Number(editBirthHour),
      birthMinute: editBirthMinute === '' ? null : Number(editBirthMinute),
      birthLocation,
    });
    setProfileSaving(false);
    if (result.success) {
      setProfileMsg({ type: 'ok', text: 'Hồ sơ đã được lưu.' });
      setProfileMode('view');
    } else {
      setProfileMsg({ type: 'err', text: result.error ?? 'Lỗi không xác định.' });
    }
  };

  const handleAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500 * 1024) {
      setProfileMsg({ type: 'err', text: 'ảnh quá lớn. Vui lòng chọn ảnh dưới 500 KB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => setEditAvatar(ev.target?.result as string ?? '');
    reader.readAsDataURL(file);
  };

  const handleChangePassword = async () => {
    setPwMsg(null);
    if (pwNew !== pwConfirm) { setPwMsg({ type: 'err', text: 'Mật khẩu xác nhận không khớp.' }); return; }
    if (pwNew.length < 8) { setPwMsg({ type: 'err', text: 'Mật khẩu mới phải ít nhất 8 ký tự.' }); return; }
    setPwSaving(true);
    const result = await changePassword(pwCurrent, pwNew);
    setPwSaving(false);
    if (result.success) {
      setPwMsg({ type: 'ok', text: 'Đổi mật khẩu thành công.' });
      setPwCurrent(''); setPwNew(''); setPwConfirm('');
      setTimeout(() => setProfileMode('view'), 1500);
    } else {
      setPwMsg({ type: 'err', text: result.error ?? 'Lỗi không xác định.' });
    }
  };

  // Local settings state (persisted to localStorage)
  const [language, setLanguage] = useState(() => localStorage.getItem('lang') || 'vi');
  const [dateFormat, setDateFormat] = useState(() => localStorage.getItem('dateFormat') || 'dd/mm/yyyy');
  const [defaultView, setDefaultView] = useState(() => localStorage.getItem('defaultView') || 'month');
  const [showLunarDetails, setShowLunarDetails] = useState(() => localStorage.getItem('showLunarDetails') !== 'false');
  const [holidayCountry, setHolidayCountry] = useState(() => localStorage.getItem('holidayCountry') || 'VN');
  const [dailyHoroscope, setDailyHoroscope] = useState(() => localStorage.getItem('dailyHoroscope') === 'true');
  const [auspiciousReminder, setAuspiciousReminder] = useState(() => localStorage.getItem('auspiciousReminder') === 'true');
  const [lunarEvents, setLunarEvents] = useState(() => localStorage.getItem('lunarEvents') !== 'false');
  const [analysisDepth, setAnalysisDepth] = useState(() => localStorage.getItem('analysisDepth') || 'detailed');
  const [autoSave, setAutoSave] = useState(() => localStorage.getItem('autoSave') !== 'false');
  const [importMsg, setImportMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  const save = (key: string, value: string) => localStorage.setItem(key, value);

  // D4: Apply stored lang attribute on mount and keep in sync
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="mx-auto max-w-5xl animate-fade-in-up">
      {/* Page Header */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors"
          aria-label="Quay lại"
        >
          <span className="material-icons-round text-xl">arrow_back</span>
        </button>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Cài đặt</h1>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Tùy chỉnh trải nghiệm</p>
        </div>
      </div>

      {/* Mobile: horizontal tab strip */}
      <div className="md:hidden mb-4">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                activeSection === s.id
                  ? 'bg-gradient-to-r from-gold/15 to-amber-500/10 dark:from-gold-dark/12 dark:to-amber-400/8 text-gold dark:text-gold-dark shadow-sm'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <span className="material-icons-round text-sm">{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: 2-column layout */}
      <div className="flex gap-5 items-start">

        {/* ── LEFT SIDEBAR ── */}
        <nav className="hidden md:flex flex-col gap-0.5 w-[190px] shrink-0 sticky top-4 glass-card p-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium w-full text-left transition-all duration-200 ${
                activeSection === s.id
                  ? 'bg-gradient-to-r from-gold/15 to-amber-500/10 dark:from-gold-dark/15 dark:to-amber-400/8 text-gold dark:text-gold-dark'
                  : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100/80 dark:hover:bg-white/5'
              }`}
            >
              <span className={`material-icons-round text-[18px] ${
                activeSection === s.id ? 'text-gold dark:text-gold-dark' : 'text-text-secondary-light/50 dark:text-text-secondary-dark/40'
              }`}>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </nav>

        {/* ── RIGHT CONTENT ── */}
        <div className="flex-1 min-w-0 space-y-3">

      {/* Appearance */}
      {activeSection === 'appearance' && (
      <SectionCard icon="palette" title="Giao diện">
        <SettingRow icon="dark_mode" label="Chế độ tối" description="Giảm mỏi mắt khi dùng ban đêm">
          <Toggle id="toggle-dark-mode" checked={isDark} onChange={toggleDarkMode} />
        </SettingRow>
        <SettingRow icon="format_size" label="Cỡ chữ">
          <div className="flex items-center gap-0.5">
            {(['small', 'normal', 'large'] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFontSizeLevel(level)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 ${fontSize === level
                    ? 'bg-gold/12 dark:bg-gold-dark/12 text-gold dark:text-gold-dark'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }`}
              >
                {level === 'small' ? 'Nhỏ' : level === 'normal' ? 'Vừa' : 'Lớn'}
              </button>
            ))}
          </div>
        </SettingRow>
      </SectionCard>
      )}

      {/* Language & Region */}
      {activeSection === 'language' && (
      <SectionCard icon="translate" title="Ngôn ngữ & Vùng miền">
        <SettingRow icon="language" label="Ngôn ngữ">
          <Select
            id="select-language"
            value={language}
            onChange={(v) => { setLanguage(v); save('lang', v); }}
            options={[
              { value: 'vi', label: 'Tiếng Việt' },
              { value: 'en', label: 'English' },
            ]}
          />
        </SettingRow>
        <SettingRow icon="date_range" label="Định dạng ngày">
          <Select
            id="select-date-format"
            value={dateFormat}
            onChange={(v) => { setDateFormat(v); save('dateFormat', v); }}
            options={[
              { value: 'dd/mm/yyyy', label: 'DD/MM/YYYY' },
              { value: 'mm/dd/yyyy', label: 'MM/DD/YYYY' },
              { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' },
            ]}
          />
        </SettingRow>
        <SettingRow icon="flag" label="Quốc gia ngày lễ">
          <Select
            id="select-holiday-country"
            value={holidayCountry}
            onChange={(v) => { setHolidayCountry(v); save('holidayCountry', v); }}
            options={[
              { value: 'VN', label: '🇻🇳 Việt Nam' },
              { value: 'US', label: '🇺🇸 Mỹ' },
              { value: 'JP', label: '🇯🇵 Nhật Bản' },
              { value: 'KR', label: '🇰🇷 Hàn Quốc' },
              { value: 'CN', label: '🇨🇳 Trung Quốc' },
            ]}
          />
        </SettingRow>
      </SectionCard>
      )}

      {/* Calendar */}
      {activeSection === 'calendar' && (
      <SectionCard icon="calendar_month" title="Âm Lịch">
        <SettingRow icon="view_module" label="Giao diện mặc định">
          <Select
            id="select-default-view"
            value={defaultView}
            onChange={(v) => { setDefaultView(v); save('defaultView', v); }}
            options={[
              { value: 'month', label: 'Theo tháng' },
              { value: 'week', label: 'Theo tuần' },
            ]}
          />
        </SettingRow>
        <SettingRow icon="info" label="Chi tiết âm lịch" description="Can chi, tiết khí trên ô lịch">
          <Toggle id="toggle-lunar-details" checked={showLunarDetails} onChange={(v) => { setShowLunarDetails(v); save('showLunarDetails', String(v)); }} />
        </SettingRow>
      </SectionCard>
      )}

      {/* Notifications */}
      {activeSection === 'notifications' && (
      <SectionCard icon="notifications" title="Thông báo">
        <SettingRow icon="wb_sunny" label="Lá số hàng ngày" description="Phân tích ngày mới mỗi sáng">
          <Toggle id="toggle-daily-horoscope" checked={dailyHoroscope} onChange={(v) => { setDailyHoroscope(v); save('dailyHoroscope', String(v)); }} />
        </SettingRow>
        <SettingRow icon="event_available" label="Nhắc ngày tốt" description="Thông báo ngày hoàng đạo sắp tới">
          <Toggle id="toggle-auspicious" checked={auspiciousReminder} onChange={(v) => { setAuspiciousReminder(v); save('auspiciousReminder', String(v)); }} />
        </SettingRow>
        <SettingRow icon="nights_stay" label="Sự kiện âm lịch" description="Rằm, mùng 1, tiết khí">
          <Toggle id="toggle-lunar-events" checked={lunarEvents} onChange={(v) => { setLunarEvents(v); save('lunarEvents', String(v)); }} />
        </SettingRow>
      </SectionCard>
      )}

      {/* Astrology */}
      {activeSection === 'astrology' && (
      <SectionCard icon="auto_awesome" title="Tử Vi & Chiêm Tinh">
        <SettingRow icon="tune" label="Độ sâu phân tích">
          <Select
            id="select-analysis-depth"
            value={analysisDepth}
            onChange={(v) => { setAnalysisDepth(v); save('analysisDepth', v); }}
            options={[
              { value: 'summary', label: 'Tóm tắt' },
              { value: 'detailed', label: 'Chi tiết' },
              { value: 'academic', label: 'Học thuật' },
            ]}
          />
        </SettingRow>
      </SectionCard>
      )}

      {/* Data & Privacy */}
      {activeSection === 'data' && (
      <SectionCard icon="security" title="Dữ liệu & Quyền riêng tư">
        <SettingRow icon="save" label="Tự động lưu" description="Lưu cài đặt và lịch sử tra cứu">
          <Toggle id="toggle-auto-save" checked={autoSave} onChange={(v) => { setAutoSave(v); save('autoSave', String(v)); }} />
        </SettingRow>
        <SettingRow icon="download" label="Xuất dữ liệu">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const EXPORTABLE_KEYS = [
                  'fontSize', 'lang', 'dateFormat', 'defaultView', 'theme',
                  'showLunarDetails', 'holidayCountry', 'dailyHoroscope',
                  'auspiciousReminder', 'lunarEvents', 'analysisDepth', 'autoSave',
                ];
                const data = Object.fromEntries(
                  EXPORTABLE_KEYS.map(k => [k, localStorage.getItem(k)]).filter(([, v]) => v != null)
                );
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'lich-viet-data.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gold/8 dark:bg-gold-dark/6 text-gold dark:text-gold-dark hover:bg-gold/15 dark:hover:bg-gold-dark/12 transition-colors"
            >
              Xuất JSON
            </button>
            {/* Import */}
            <input ref={importInputRef} type="file" accept=".json" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                try {
                  const IMPORTABLE_KEYS = ['fontSize', 'lang', 'dateFormat', 'defaultView', 'showLunarDetails', 'holidayCountry', 'dailyHoroscope', 'auspiciousReminder', 'lunarEvents', 'analysisDepth', 'autoSave'];
                  const parsed = JSON.parse(ev.target?.result as string);
                  let count = 0;
                  IMPORTABLE_KEYS.forEach(k => {
                    if (typeof parsed[k] === 'string') { localStorage.setItem(k, parsed[k]); count++; }
                  });
                  setImportMsg({ type: 'ok', text: `Đã nhập ${count} cài đặt. Tải lại để áp dụng.` });
                  setTimeout(() => setImportMsg(null), 4000);
                } catch { setImportMsg({ type: 'err', text: 'File JSON không hợp lệ.' }); setTimeout(() => setImportMsg(null), 3000); }
              };
              reader.readAsText(file);
              e.target.value = '';
            }} />
            <button
              onClick={() => importInputRef.current?.click()}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 hover:bg-gray-100 dark:hover:bg-white/8 transition-colors"
            >
              Nhập JSON
            </button>
          </div>
        </SettingRow>
        {importMsg && (
          <div className={`mx-0 mb-1 px-3 py-2 rounded-lg text-xs font-medium ${importMsg.type === 'ok' ? 'bg-emerald-50 dark:bg-emerald-900/15 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400'}`}>
            {importMsg.text}
          </div>
        )}
        <SettingRow icon="restart_alt" label="Khôi phục mặc định" description="Đặt lại tất cả cài đặt về ban đầu">
          <button
            onClick={() => {
              if (confirm('Khôi phục tất cả cài đặt về mặc định?')) {
                const SETTING_KEYS = ['fontSize', 'lang', 'dateFormat', 'defaultView', 'showLunarDetails', 'holidayCountry', 'dailyHoroscope', 'auspiciousReminder', 'lunarEvents', 'analysisDepth', 'autoSave'];
                SETTING_KEYS.forEach(k => localStorage.removeItem(k));
                window.location.reload();
              }
            }}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/6 text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            Khôi phục
          </button>
        </SettingRow>
        <SettingRow icon="delete_sweep" label="Xóa bộ nhớ đệm" description="Xóa tất cả dữ liệu lưu trữ">
          <button
            onClick={() => {
              if (confirm('Bạn có chắc muốn xóa tất cả dữ liệu?')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/25 transition-colors"
          >
            Xóa dữ liệu
          </button>
        </SettingRow>
      </SectionCard>
      )}

      {/* Security — 2FA */}
      {activeSection === 'security' && isAuthenticated && (
      <SectionCard icon="shield" title="Bảo mật">
          <SettingRow
            icon="verified_user"
            label="Xác thực 2 bước (2FA)"
            description="Thêm lớp bảo vệ khi đăng nhập"
          >
            <TwoFactorSetup />
          </SettingRow>
        </SectionCard>
      )}

      {/* Promotions */}
      {activeSection === 'promo' && isAuthenticated && (
      <SectionCard icon="card_giftcard" title="Khuyến mãi">
        <div className="py-3">
          <PromotionCodeInput />
        </div>
      </SectionCard>
      )}

      {/* Subscription Tier */}
      {activeSection === 'subscription' && (
      <SectionCard icon="workspace_premium" title="Gói Dịch Vụ">
        <div className="py-4 space-y-3">
          {/* Current tier badge */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${tierInfo.tier === 'elite' ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/20' :
                  tierInfo.tier === 'premium' ? 'bg-gradient-to-br from-blue-400 to-indigo-500 text-white shadow-lg shadow-blue-500/20' :
                    tierInfo.tier === 'free' ? 'bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-lg shadow-emerald-500/20' :
                      'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }`}>
                {tierInfo.tier === 'elite' ? '★' : tierInfo.tier === 'premium' ? '✦' : tierInfo.tier === 'free' ? '✓' : 'Δ'}
              </div>
              <div>
                <p className="text-sm font-bold text-text-primary-light dark:text-text-primary-dark">
                  {tierInfo.tier === 'elite' ? 'Đầy đủ' : tierInfo.tier === 'premium' ? 'Dùng thử' : tierInfo.tier === 'free' ? 'Miễn phí' : 'Khách'}
                </p>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                  {tierInfo.tier === 'elite' ? 'Truy cập toàn bộ nội dung' :
                    tierInfo.tier === 'premium' ? `Còn ${tierInfo.daysRemaining ?? 0} ngày dùng thử` :
                      tierInfo.tier === 'free' ? 'Nội dung cơ bản' : 'Chưa đăng nhập'}
                </p>
              </div>
            </div>
            {tierInfo.tier !== 'elite' && (
              <button
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 hover:brightness-110 shadow-md shadow-gold/20 transition-all"
                onClick={() => navigate('/app/nang-cap')}
              >
                ★ Nâng cấp
              </button>
            )}
          </div>

          {/* Tier comparison (compact) */}
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: 'Free', features: 'Âm Lịch + Tổng quan', active: tierInfo.tier === 'free' || tierInfo.tier === 'guest' },
              { label: 'Dùng thử', features: 'Phân tích cơ bản', active: tierInfo.tier === 'premium' },
              { label: 'Premium', features: 'Toàn bộ + PDF', active: tierInfo.tier === 'elite' },
            ].map((t, i) => (
              <div key={i} className={`p-2.5 rounded-xl border transition-all ${t.active ? 'border-gold/40 dark:border-gold-dark/40 bg-gold/5 dark:bg-gold-dark/5' :
                  'border-border-light/20 dark:border-border-dark/15'
                }`}>
                <p className={`text-xs font-bold ${t.active ? 'text-gold dark:text-gold-dark' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>{t.label}</p>
                <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 mt-0.5">{t.features}</p>
              </div>
            ))}
          </div>

          {tierInfo.tier === 'elite' && (
            <div className="pt-2 border-t border-border-light/20 dark:border-border-dark/15 mt-4">
              <CreditRefreshBanner />
            </div>
          )}
        </div>
      </SectionCard>
      )}

      {/* Profile Editing */}
      {activeSection === 'profile' && isAuthenticated && user && (
      <SectionCard icon="manage_accounts" title="Hồ Sơ Cá Nhân">
          <div className="py-3 space-y-3">
            {profileMode === 'view' && (
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-mystery-purple/20 to-mystery-blue/20 flex items-center justify-center">
                    {user.avatarUrl
                      ? <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                      : <span className="text-lg font-bold text-mystery-purple dark:text-mystery-purple-light">{user.displayName.charAt(0).toUpperCase()}</span>}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.displayName}</p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{user.email}</p>
                    {(user.birthday || user.profile?.birthHour !== undefined) && (
                      <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 mt-0.5">
                        🎂 {user.birthday ? user.birthday.split('-').reverse().join('/') : 'Chưa có ngày sinh'} 
                        {user.profile?.birthHour !== undefined && ` · ${String(user.profile.birthHour).padStart(2, '0')}:${user.profile?.birthMinute !== undefined ? String(user.profile.birthMinute).padStart(2, '0') : '00'}`}
                      </p>
                    )}
                    {user.extendedProfile?.birthLocation && (
                      <p className="text-[10px] text-text-secondary-light/60 dark:text-text-secondary-dark/50 mt-0.5 flex items-center gap-1">
                        <span className="material-icons-round text-[10px]">location_on</span> {user.extendedProfile.birthLocation.city}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 shrink-0">
                  <button onClick={startEdit} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gold/8 dark:bg-gold-dark/6 text-gold dark:text-gold-dark hover:bg-gold/15 transition-colors flex items-center gap-1">
                    <span className="material-icons-round text-sm">edit</span> Sửa
                  </button>
                  {user.provider === 'email' && (
                    <button onClick={() => { setProfileMode('password'); setPwMsg(null); }} className="text-xs font-medium px-3 py-1.5 rounded-lg bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 hover:bg-gray-100 dark:hover:bg-white/8 transition-colors flex items-center gap-1">
                      <span className="material-icons-round text-sm">lock</span> Đổi mật khẩu
                    </button>
                  )}
                </div>
              </div>
            )}

            {profileMode === 'edit' && (
              <div className="space-y-3 animate-fade-in-up">
                {/* Avatar upload */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-14 h-14 rounded-full shrink-0 overflow-hidden bg-gradient-to-br from-mystery-purple/20 to-mystery-blue/20 flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity relative group"
                    onClick={() => avatarInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && avatarInputRef.current?.click()}
                  >
                    {editAvatar
                      ? <img src={editAvatar} alt="avatar preview" className="w-full h-full object-cover" />
                      : <span className="text-xl font-bold text-mystery-purple dark:text-mystery-purple-light">{(editName || user.displayName).charAt(0).toUpperCase()}</span>}
                    <div className="absolute inset-0 rounded-full bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-icons-round text-white text-base">photo_camera</span>
                    </div>
                  </div>
                  <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
                  <div>
                    <p className="text-xs font-medium">Tải ảnh đại diện</p>
                    <p className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark">Nhấp vào khung ảnh để chọn (tối đa 500 KB)</p>
                    {editAvatar && <button onClick={() => setEditAvatar('')} className="text-[10px] text-red-500 dark:text-red-400 mt-0.5">Xóa ảnh</button>}
                  </div>
                </div>

                {/* Display name */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Tên hiển thị</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-3 py-2 rounded-lg text-sm bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 focus:ring-2 focus:ring-gold/25 dark:focus:ring-gold-dark/25 outline-none transition-all"
                  />
                </div>

                {/* Birthday & Time */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Ngày giờ sinh (Dương lịch) <span className="text-text-secondary-light/50 dark:text-text-secondary-dark/50 font-normal">(dùng cho Tử Vi / Thần Số Học)</span>
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    <input type="number" value={editDay} onChange={e => setEditDay(e.target.value)} placeholder="Ngày" min="1" max="31"
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all" />
                    <input type="number" value={editMonth} onChange={e => setEditMonth(e.target.value)} placeholder="Tháng" min="1" max="12"
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all" />
                    <input type="number" value={editYear} onChange={e => setEditYear(e.target.value)} placeholder="Năm" min="1900" max="2100"
                        className="px-3 py-2.5 rounded-lg border border-border-light dark:border-border-dark bg-surface-subtle-light dark:bg-surface-subtle-dark text-sm text-center focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all" />
                    
                    <select
                      value={editBirthHour}
                      onChange={(e) => setEditBirthHour(e.target.value)}
                      className="px-3 py-2.5 rounded-lg text-sm bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 focus:ring-2 focus:ring-gold/25 dark:focus:ring-gold-dark/25 outline-none transition-all"
                    >
                      <option value="">Giờ</option>
                      {Array.from({ length: 24 }).map((_, i) => (
                        <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
                      ))}
                    </select>

                    <select
                      value={editBirthMinute}
                      onChange={(e) => setEditBirthMinute(e.target.value)}
                      className="px-3 py-2.5 rounded-lg text-sm bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 focus:ring-2 focus:ring-gold/25 dark:focus:ring-gold-dark/25 outline-none transition-all"
                    >
                      <option value="">Phút</option>
                      {Array.from({ length: 60 }).map((_, i) => (
                        <option key={i} value={i}>{String(i).padStart(2, '0')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Birth Place */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Nơi sinh</label>
                  <LocationPicker 
                      onSelect={handleLocationSelect}
                      initialLat={parseFloat(editLat) || undefined}
                      initialLng={parseFloat(editLng) || undefined}
                      initialLocationName={editLocationName || undefined}
                  />
                </div>

                {profileMsg && (
                  <p className={`text-xs font-medium ${profileMsg.type === 'ok' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {profileMsg.text}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={profileSaving}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 hover:brightness-110 shadow-sm shadow-gold/15 disabled:opacity-50 transition-all"
                  >
                    {profileSaving ? 'Đang lưu...' : 'Lưu'}
                  </button>
                  <button onClick={cancelEdit} className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-white/6 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                    Hủy
                  </button>
                </div>
              </div>
            )}

            {profileMode === 'password' && (
              <div className="space-y-3 animate-fade-in-up">
                <p className="text-xs font-semibold flex items-center gap-1.5">
                  <span className="material-icons-round text-sm text-gold dark:text-gold-dark">lock</span>
                  Đổi mật khẩu
                </p>
                {[{ label: 'Mật khẩu hiện tại', val: pwCurrent, set: setPwCurrent, ph: '••••••••' },
                  { label: 'Mật khẩu mới (tối thiểu 8 ký tự)', val: pwNew, set: setPwNew, ph: '••••••••' },
                  { label: 'Xác nhận mật khẩu mới', val: pwConfirm, set: setPwConfirm, ph: '••••••••' },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">{f.label}</label>
                    <input type="password" value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph}
                      className="w-full px-3 py-2 rounded-lg text-sm bg-surface-subtle-light dark:bg-surface-subtle-dark border border-border-light/30 dark:border-border-dark/25 focus:ring-2 focus:ring-gold/25 dark:focus:ring-gold-dark/25 outline-none transition-all" />
                  </div>
                ))}
                {pwMsg && (
                  <p className={`text-xs font-medium ${pwMsg.type === 'ok' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {pwMsg.text}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleChangePassword}
                    disabled={pwSaving || !pwCurrent || !pwNew || !pwConfirm}
                    className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-gold to-amber-600 dark:from-gold-dark dark:to-amber-500 hover:brightness-110 shadow-sm shadow-gold/15 disabled:opacity-50 transition-all"
                  >
                    {pwSaving ? 'Đang lưu...' : 'Đổi mật khẩu'}
                  </button>
                  <button onClick={() => { setProfileMode('view'); setPwMsg(null); }} className="px-4 py-2 rounded-xl text-xs font-medium bg-gray-100 dark:bg-white/6 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                    Hủy
                  </button>
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {/* Account */}
      {activeSection === 'account' && (
      <SectionCard icon="person" title="Tài khoản">
        <div className="py-5 text-center">
          {isAuthenticated && user ? (
            <>
              <div className="w-12 h-12 mx-auto mb-2.5 rounded-full overflow-hidden bg-gradient-to-br from-mystery-purple/20 to-mystery-blue/20 dark:from-mystery-purple/25 dark:to-mystery-blue/15 flex items-center justify-center">
                {user.avatarUrl
                  ? <img src={user.avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-lg font-bold text-mystery-purple dark:text-mystery-purple-light">{user.displayName.charAt(0).toUpperCase()}</span>}
              </div>
              <p className="text-sm font-semibold mb-0.5">{user.displayName}</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{user.email}</p>
              {user.provider !== 'email' && (
                <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-mystery-purple/8 dark:bg-mystery-purple/12 text-mystery-purple dark:text-mystery-purple-light">
                  {user.provider === 'google' ? '🔵 Google' : '🔵 Facebook'}
                </span>
              )}
              {user.twoFactorEnabled && (
                <span className="inline-flex items-center gap-1 mt-2 ml-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-good/8 dark:bg-good-dark/8 text-good dark:text-good-dark">
                  🔒 2FA
                </span>
              )}
              <div className="mt-4">
                <button
                  onClick={() => { if (confirm('Bạn có chắc muốn đăng xuất?')) logout(); }}
                  className="px-4 py-1.5 rounded-xl text-xs font-medium bg-red-50 dark:bg-red-900/15 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/25 transition-colors"
                >
                  <span className="material-icons-round text-sm mr-1 align-middle">logout</span>
                  Đăng xuất
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="w-12 h-12 mx-auto mb-2.5 rounded-full bg-gray-100 dark:bg-white/6 flex items-center justify-center">
                <span className="material-icons-round text-xl text-gray-400 dark:text-gray-500">person</span>
              </div>
              <p className="text-sm font-semibold mb-0.5">Khách</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-4">Đăng nhập để đồng bộ dữ liệu</p>
              <div className="flex items-center justify-center gap-2.5">
                <button
                  onClick={() => navigate('/app/dang-nhap')}
                  className="px-4 py-1.5 rounded-xl text-xs font-medium bg-gold/10 dark:bg-gold-dark/8 text-gold dark:text-gold-dark hover:bg-gold/18 dark:hover:bg-gold-dark/15 transition-colors"
                >
                  <span className="material-icons-round text-sm mr-1 align-middle">login</span>
                  Đăng nhập
                </button>
                <button
                  onClick={() => navigate('/app/dang-ky')}
                  className="px-4 py-1.5 rounded-xl text-xs font-medium border border-border-light/50 dark:border-mystery-purple/15 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="material-icons-round text-sm mr-1 align-middle">person_add</span>
                  Đăng ký
                </button>
              </div>
            </>
          )}
        </div>
      </SectionCard>
      )}

      {/* About footer */}
      <div className="flex items-center justify-between px-4 py-3">
        <p className="text-xs text-text-secondary-light/60 dark:text-text-secondary-dark/50">
          Lịch Việt v2.2.0 · MIT
        </p>
        <button
          onClick={() => navigate('/')}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
          aria-label="Trang chủ"
        >
          <span className="material-icons-round text-base text-text-secondary-light/50 dark:text-text-secondary-dark/40">home</span>
        </button>
      </div>

        </div> {/* end right content */}
      </div> {/* end 2-column flex */}

      <div className="h-6" />
    </div>
  );
}
