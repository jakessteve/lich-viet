import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore, type UserGoal } from '../../stores/appStore';
import '../../styles/onboarding.css';

const QUIZ_OPTIONS = [
  {
    id: 'calendar' as UserGoal,
    title: 'Tra cứu Lịch & Ngày tốt xấu',
    description: 'Tìm ngày đẹp Cưới hỏi, Động thổ, Xuất hành. Xem Dụng sự, sao tốt xấu.',
    icon: 'calendar_month',
    route: '/app/am-lich'
  },
  {
    id: 'self_discovery' as UserGoal,
    title: 'Khám phá Bản thân',
    description: 'Giải mã lá số Tử Vi, Tứ Trụ Bát Tự và bản đồ Thần Số Học chi tiết.',
    icon: 'auto_awesome',
    route: '/app/tu-vi'
  },
  {
    id: 'feng_shui' as UserGoal,
    title: 'Phong Thủy & Khai Vận',
    description: 'Huyền Không Phi Tinh, Gieo Quẻ Mai Hoa và Tam Thức chuyên sâu.',
    icon: 'explore',
    route: '/app/gieo-que'
  }
];

export default function OnboardingQuiz() {
  const navigate = useNavigate();
  const setUserGoal = useAppStore(state => state.setUserGoal);
  const userGoal = useAppStore(state => state.userGoal);

  // If goal is already set, this component should unmount (handled by parent typically, but check here just in case)
  if (userGoal) return null;

  const handleSelectGoal = (goal: UserGoal, route: string) => {
    // Save to store (which also persists to localStorage)
    setUserGoal(goal);
    // Navigate to the best starting route for their goal
    navigate(route);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md animate-fade-in p-4 sm:p-6 overflow-y-auto">
      <div className="max-w-3xl w-full bg-white dark:bg-card-dark rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden border border-gray-100 dark:border-gray-800">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="relative z-10 text-center space-y-4 mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary dark:bg-primary/20 mb-4">
            <span className="material-icons-round text-3xl">psychology</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent pb-1">
            Mục tiêu chính của bạn?
          </h1>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-xl mx-auto">
            Lịch Việt v2 cung cấp 11 công cụ tính toán chuyên sâu. Hãy chọn mục tiêu ưu tiên để chúng tôi cá nhân hóa trải nghiệm cho bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUIZ_OPTIONS.map((option) => (
            <button
              key={option.id!}
              onClick={() => handleSelectGoal(option.id, option.route)}
              className="group flex flex-col items-center text-center p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-card-dark hover:border-primary dark:hover:border-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-primary/20"
            >
              <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <span className="material-icons-round text-2xl text-text-secondary-light dark:text-text-secondary-dark group-hover:text-white transition-colors">
                  {option.icon}
                </span>
              </div>
              <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-2 group-hover:text-primary transition-colors">
                {option.title}
              </h3>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                {option.description}
              </p>
              
              <div className="mt-6 flex items-center justify-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">
                Lựa chọn <span className="material-icons-round text-sm ml-1">arrow_forward</span>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
