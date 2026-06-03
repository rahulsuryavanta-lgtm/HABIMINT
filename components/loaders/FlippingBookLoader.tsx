import React from 'react'

const FlippingBookLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full bg-[#fdfbf7]">
            <div className="relative w-16 h-16 text-amber-800">
                <svg
                    className="animate-spin duration-1000"
                    xmlns="http://w3.org"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    {/* Custom paths shaping a turning page leaf */}
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                {/* Book Icon Anchor */}
                <span className="absolute inset-0 flex items-center justify-center text-2xl">
                    📖
                </span>
            </div>
            <p className="mt-6 text-sm font-serif text-stone-500 italic tracking-wider">
                Preparing your canvas...
            </p>
        </div>

    )
}

export default FlippingBookLoader