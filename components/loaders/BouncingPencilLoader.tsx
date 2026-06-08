import React from "react";

const BouncingPencilLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-stone-50/90 backdrop-blur-sm">
            <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex flex-col justify-between p-2">
                    {/* Notebook Lines */}
                    <div className="h-1 bg-stone-300 w-full rounded animate-pulse" />
                    <div className="h-1 bg-stone-300 w-5/6 rounded animate-pulse delay-75" />
                    <div className="h-1 bg-stone-300 w-full rounded animate-pulse delay-150" />

                    {/* Pencil */}
                    <div className="absolute -top-2 left-4 text-4xl animate-bounce">
                        ✏️
                    </div>
                </div>

                <p className="mt-6 text-stone-700 font-medium tracking-wide animate-pulse">
                    {/* Opening your journal... */}
                    Fall Forward... <br />
                    Rise Unlimited
                </p>
            </div>
        </div>
    );
};

export default BouncingPencilLoader;