import React, { useState, useCallback } from 'react';
import { useUserTier } from '../../hooks/useUserTier';

interface PdfDownloadButtonProps {
    /** Called with pdfTier to generate the actual PDF */
    onDownload: (pdfTier: 'medium' | 'full') => Promise<void>;
    label?: string;
}

/**
 * Tier-aware PDF download button.
 *
 * Behavior per tier (Dual Button Layout):
 *   Guest          → Disabled (greyed out)
 *   Free           → Clickable 'medium' (shows upgrade prompt), 'full' disabled
 *   Partial-Premium → Clickable 'medium' (downloads), 'full' disabled
 *   Paid           → Both clickable (downloads)
 */
const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({
    onDownload,
    label = 'Tải Báo Cáo PDF',
}) => {
    const { tier } = useUserTier();
    const [isLoadingMedium, setIsLoadingMedium] = useState(false);
    const [isLoadingFull, setIsLoadingFull] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const isGuest = tier === 'guest';
    const isFree = tier === 'free';
    const isPaid = tier === 'elite';

    const handleMediumClick = useCallback(async () => {
        if (isLoadingMedium || isLoadingFull) return;
        if (isGuest) return;

        if (isFree) {
            setShowUpgradeModal(true);
            return;
        }

        setIsLoadingMedium(true);
        try {
            await onDownload('medium');
        } catch (err) {
            if (import.meta.env.DEV) console.error('PDF generation failed:', err);
        } finally {
            setIsLoadingMedium(false);
        }
    }, [onDownload, isLoadingMedium, isLoadingFull, isGuest, isFree]);

    const handleFullClick = useCallback(async () => {
        if (isLoadingMedium || isLoadingFull) return;
        if (!isPaid) return;

        setIsLoadingFull(true);
        try {
            await onDownload('full');
        } catch (err) {
            if (import.meta.env.DEV) console.error('PDF generation failed:', err);
        } finally {
            setIsLoadingFull(false);
        }
    }, [onDownload, isLoadingMedium, isLoadingFull, isPaid]);

    const baseLabel = label.replace(/\s*\(PDF\)\s*$/i, '').replace(/^Tải\s+/i, '');
    const anyLoading = isLoadingMedium || isLoadingFull;

    return (
        <>
            {/* Button 1: Medium PDF (Rút gọn) */}
            <button
                className={`flex-1 min-w-[120px] flex flex-row items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[10px] sm:text-xs lg:text-xs transition-all duration-300 animate-fade-in-up animate-delay-2 ${isLoadingMedium ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-500 cursor-wait' : isGuest ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-70' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 shadow-sm'} ${anyLoading && !isLoadingMedium ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={handleMediumClick}
                disabled={anyLoading || isGuest}
                title={isGuest ? 'Đăng ký tài khoản để tải báo cáo' : undefined}
            >
                <span className="material-icons-round shrink-0" style={{ fontSize: '1rem' }}>
                    {isLoadingMedium ? 'hourglass_top' : 'picture_as_pdf'}
                </span>
                <span className="truncate leading-tight flex-1" style={{ textAlign: "center", textJustify: "none", alignItems: "center" }}>
                    {isLoadingMedium ? 'Đang tạo bản Tóm tắt...' : `${baseLabel} (Tóm tắt)`}
                </span>
                {isGuest && (
                    <span className="text-[10px] sm:text-xs ml-0.5 sm:ml-1 opacity-70 shrink-0">🔒</span>
                )}
            </button>

            {/* Button 2: Full PDF (Đầy đủ) */}
            <button
                className={`flex-1 min-w-[120px] flex flex-row items-center justify-center gap-1 sm:gap-1.5 py-2.5 px-1.5 sm:px-3 rounded-xl font-bold text-[10px] sm:text-xs lg:text-xs transition-all duration-300 animate-fade-in-up animate-delay-2 ${isLoadingFull ? 'cursor-wait opacity-80' : !isPaid ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60' : 'text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'} ${anyLoading && !isLoadingFull ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={handleFullClick}
                disabled={anyLoading || !isPaid}
                title={!isPaid ? 'Nâng cấp Premium để tải bản đầy đủ' : undefined}
                style={isPaid && !isLoadingFull ? { background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' } : (isLoadingFull ? { background: 'linear-gradient(135deg, #5b21b6, #8b5cf6)' } : undefined)}
            >
                <span className="material-icons-round text-white shrink-0" style={{ fontSize: '1rem' }}>
                    {isLoadingFull ? 'hourglass_top' : 'library_books'}
                </span>
                <span className="truncate leading-tight flex-1" style={{ textAlign: "center", textJustify: "none", alignItems: "center" }}>
                    {isLoadingFull ? 'Đang tạo bản Đầy đủ...' : `${baseLabel} (Đầy đủ)`}
                </span>
                {!isPaid && (
                    <span className="text-[10px] sm:text-xs ml-0.5 sm:ml-1 opacity-80 text-gray-500 dark:text-gray-400 drop-shadow-sm shrink-0">🔒</span>
                )}
            </button>

            {/* Upgrade Modal (Free users) */}
            {showUpgradeModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowUpgradeModal(false)}
                    onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') setShowUpgradeModal(false); }}
                    role="button"
                    tabIndex={0}
                    aria-label="Đóng modal"
                >
                    {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                    <div
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm mx-4 animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => { if (e.key === 'Escape') setShowUpgradeModal(false); }}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="upgrade-modal-title"
                    >
                        <div className="text-center mb-4">
                            <span className="text-4xl" aria-hidden="true">📄</span>
                        </div>
                        <h3 id="upgrade-modal-title" className="text-lg font-bold text-center text-text-primary-light dark:text-text-primary-dark mb-2">
                            Nâng cấp để tải PDF
                        </h3>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark text-center mb-4 leading-relaxed">
                            Tính năng tải báo cáo PDF dành cho thành viên Premium.
                            Nâng cấp để nhận bản phân tích chi tiết.
                        </p>
                        <div className="flex flex-col gap-2">
                            <a
                                href="/app/cai-dat"
                                className="w-full py-2.5 px-4 rounded-xl font-bold text-sm text-white text-center"
                                style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}
                            >
                                ⭐ Xem gói Premium
                            </a>
                            <button
                                onClick={() => setShowUpgradeModal(false)}
                                className="w-full py-2 px-4 rounded-xl text-sm text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Để sau
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PdfDownloadButton;
