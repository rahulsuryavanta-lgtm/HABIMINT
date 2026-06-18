import React, { useState, useEffect } from 'react';

const CircleLoader: React.FC<{
    showRandomTxt?: boolean;
    showLoadingTxt?: boolean;
}> = ({ showLoadingTxt, showRandomTxt }) => {

    const loadingTexts = [
        "Uncapping the perfect pens...",
        "Sharpening our digital pencils...",
        "Gathering fresh sheets of inspiration...",
        "Binding your premium experience...",
        "Setting the ink, almost ready..."
    ];

    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        if (!showRandomTxt) return;

        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % loadingTexts.length);
        }, 2200); // Cycles every 2.2 seconds

        return () => clearInterval(interval);
    }, [showRandomTxt]);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#fafaf996] backdrop-blur-sm">
            <div className="text-center">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-habimint-primary mx-auto mb-4"></div>

                {/* Dynamic Stationery Phrases */}
                {showRandomTxt ? (
                    <p className="text-habimint-text-light font-medium min-h-[24px] animate-pulse">
                        {loadingTexts[currentTextIndex]}
                    </p>
                ) : (
                    showLoadingTxt && <p className="text-habimint-text-light">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default CircleLoader;
