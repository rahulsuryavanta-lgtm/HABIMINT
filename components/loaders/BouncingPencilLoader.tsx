import React from 'react'

const BouncingPencilLoader = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-[60vh] w-full bg-stone-50">
                <div className="relative w-24 h-24 flex flex-col justify-between p-2">
                    {/* Notebook Lines */}
                    <div className="h-1 bg-stone-300 w-full rounded animate-pulse" />
                    <div className="h-1 bg-stone-300 w-5/6 rounded animate-pulse delay-75" />
                    <div className="h-1 bg-stone-300 w-full rounded animate-pulse delay-150" />

                    {/* Bouncing/Writing Pencil Icon */}
                    <div className="absolute -top-2 left-4 animate-bounce text-4xl">
                        ✏️
                    </div>
                </div>

                {/* Branding Text */}
                <p className="mt-4 text-stone-600 font-medium tracking-wide animate-pulse">
                    Opening your journal...
                </p>
            </div>
        </div>
    )
}

export default BouncingPencilLoader