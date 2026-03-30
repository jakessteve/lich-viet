import React, { useState, useCallback } from 'react';
import * as htmlToImage from 'html-to-image';

interface ShareButtonProps {
    /** The DOM element ID to capture (e.g., 'tuvi-chart', 'bazi-chart') */
    targetId: string;
    /** The filename for the downloaded image */
    fileName?: string;
    /** Custom label for the button */
    label?: string;
    /** Custom class name for the wrapper button */
    className?: string;
}

export default function ShareButton({ targetId, fileName = 'lich-viet-chart', label = 'Chia Sẻ & Lưu Ảnh', className = '' }: ShareButtonProps) {
    const [isSharing, setIsSharing] = useState(false);

    const handleShare = useCallback(async () => {
        const element = document.getElementById(targetId);
        if (!element) {
            alert('Không tìm thấy vùng dữ liệu để chụp ảnh.');
            return;
        }

        setIsSharing(true);
        try {
            // Add a watermark class briefly before capturing
            element.classList.add('export-watermark-active');
            
            const dataUrl = await htmlToImage.toJpeg(element, {
                quality: 0.95,
                backgroundColor: '#ffffff', // Fallback
                style: {
                    transform: 'scale(1)',
                    transformOrigin: 'top left',
                }
            });

            element.classList.remove('export-watermark-active');

            // If native share is supported (mobile, safari), use it
            if (navigator.share) {
                try {
                    // Convert base64 to blob for sharing
                    const res = await fetch(dataUrl);
                    const blob = await res.blob();
                    const file = new File([blob], `${fileName}.jpg`, { type: 'image/jpeg' });
                    
                    await navigator.share({
                        title: 'Lá Số Lịch Việt',
                        text: 'Mời bạn xem lá số của tôi được lập bởi Lịch Việt v2!',
                        files: [file]
                    });
                } catch (e) {
                    console.warn('Native share failed or cancelled', e);
                    // Fallback to download
                    triggerDownload(dataUrl, fileName);
                }
            } else {
                // Fallback to traditional download
                triggerDownload(dataUrl, fileName);
            }
        } catch (error) {
            console.error('Error generating image', error);
            alert('Có lỗi xảy ra khi tạo ảnh chia sẻ.');
        } finally {
            setIsSharing(false);
            element?.classList.remove('export-watermark-active');
        }
    }, [targetId, fileName]);

    return (
        <button
            onClick={handleShare}
            disabled={isSharing}
            className={`inline-flex items-center justify-center gap-1.5 px-1.5 sm:px-3 py-2.5 rounded-xl font-bold text-[10px] sm:text-xs lg:text-xs bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px] ${className}`}
        >
            {isSharing ? (
                <>
                    <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Đang xử lý...
                </>
            ) : (
                <>
                    <span className="material-icons-round text-[18px]">share</span>
                    {label}
                </>
            )}
        </button>
    );
}

function triggerDownload(dataUrl: string, fileName: string) {
    const link = document.createElement('a');
    link.download = `${fileName}-${Date.now()}.jpg`;
    link.href = dataUrl;
    link.click();
}
