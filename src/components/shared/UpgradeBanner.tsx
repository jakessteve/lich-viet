// ══════════════════════════════════════════════════════════
// UpgradeBanner — Soft upsell for free + countdown for trial users
// ══════════════════════════════════════════════════════════

import { Link } from 'react-router-dom';
import { useUserTier } from '../../hooks/useUserTier';
import { analytics } from '../../services/analyticsService';

export function UpgradeBanner() {
    const { isTier, daysRemaining } = useUserTier();

    const handleCtaClick = () => {
        analytics.trackEvent({
            name: 'button_click',
            properties: { action: 'upgrade_banner_clicked', category: 'engagement' }
        });
    };

    // Soft upsell for free users
    if (isTier('free')) {
        return (
            <div className="upgrade-banner">
                <div className="upgrade-banner__content">
                    <span className="upgrade-banner__icon">✨</span>
                    <span className="upgrade-banner__text">
                        Mở khóa luận giải chuyên sâu và tải PDF báo cáo chi tiết
                    </span>
                    <Link to="/app/nang-cap" className="upgrade-banner__cta" onClick={handleCtaClick}>
                        Xem gói Premium →
                    </Link>
                </div>
            </div>
        );
    }

    // Countdown for partial-premium users
    if (isTier('premium') && daysRemaining !== undefined) {
        const isUrgent = daysRemaining <= 3;

        return (
            <div className={`upgrade-banner ${isUrgent ? 'upgrade-banner--urgent' : ''}`}>
                <div className="upgrade-banner__content">
                    <span className="upgrade-banner__icon">{isUrgent ? '⚠️' : '⏰'}</span>
                    <span className="upgrade-banner__text">
                        Quyền truy cập Premium của bạn còn <strong>{daysRemaining} ngày</strong>
                    </span>
                    <Link to="/app/nang-cap" className="upgrade-banner__cta" onClick={handleCtaClick}>
                        Nâng cấp vĩnh viễn →
                    </Link>
                </div>
            </div>
        );
    }

    return null;
}
