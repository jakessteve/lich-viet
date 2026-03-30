import React, { useState, useEffect } from 'react';

/** Fixed reading progress bar at the top of the viewport. */
const ReadingProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (docHeight > 0) {
                setProgress(Math.min(100, (scrollTop / docHeight) * 100));
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="reading-progress">
            <div className="reading-progress-bar" style={{ width: `${progress}%` }} />
        </div>
    );
};

export default ReadingProgress;
