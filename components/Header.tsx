
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-hacker-green uppercase tracking-widest relative inline-block animate-glow">
                GEMINI HACK TERMINAL
            </h1>
            <p className="text-hacker-green/70 mt-2 text-sm">System Access & Infiltration Simulator</p>
        </header>
    );
}
