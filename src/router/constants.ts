
export type ActiveTab = 'am-lich' | 'gieo-que' | 'tu-vi' | 'chiem-tinh' | 'than-so-hoc' | 'hop-la';

/** Maps route paths to tab IDs */
export const ROUTE_TO_TAB: Record<string, ActiveTab> = {
  '/app': 'am-lich',
  '/app/am-lich': 'am-lich',
  '/app/lich-dung-su': 'am-lich',
  '/app/phong-thuy': 'am-lich',
  '/app/acs': 'am-lich',
  '/app/hop-la': 'hop-la',
  '/app/gieo-que': 'gieo-que',
  '/app/tu-vi': 'tu-vi',
  '/app/bat-tu': 'tu-vi',
  '/app/chiem-tinh': 'chiem-tinh',
  '/app/than-so-hoc': 'than-so-hoc',
};

/** Maps tab IDs to route paths */
export const TAB_TO_ROUTE: Record<ActiveTab, string> = {
  'am-lich': '/app/am-lich',
  'gieo-que': '/app/gieo-que',
  'tu-vi': '/app/tu-vi',
  'chiem-tinh': '/app/chiem-tinh',
  'than-so-hoc': '/app/than-so-hoc',
  'hop-la': '/app/hop-la',
};

export interface NavLink {
  id: ActiveTab;
  label: string;
  icon: string;
  desc: string;
  enabled: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'am-lich', label: 'Âm lịch', icon: 'calendar_month', desc: 'Âm lịch · Dụng sự', enabled: true },
  { id: 'gieo-que', label: 'Gieo quẻ', icon: 'casino', desc: 'Mai Hoa & Tam Thức', enabled: true },
  { id: 'tu-vi', label: 'Tử vi', icon: 'auto_awesome', desc: 'Tử Vi · Bát Tự', enabled: true },
  { id: 'chiem-tinh', label: 'Chiêm tinh', icon: 'public', desc: 'Bản đồ sao phương Tây', enabled: true },
  { id: 'than-so-hoc', label: 'Thần số học', icon: 'calculate', desc: 'Numerology bản đồ số', enabled: true },
  { id: 'hop-la', label: 'Hợp Lá', icon: 'favorite', desc: 'Đánh giá tương hợp', enabled: true },
];
