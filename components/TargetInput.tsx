
import React from 'react';
import { TargetIcon } from './icons';

interface TargetInputProps {
    target: string;
    setTarget: (target: string) => void;
    onHack: () => void;
    isHacking: boolean;
}

export const TargetInput: React.FC<TargetInputProps> = ({ target, setTarget, onHack, isHacking }) => {
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onHack();
        }
    };
    
    return (
        <div className="max-w-4xl w-full mx-auto mb-6">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-full">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-hacker-green/50">
                        <TargetIcon />
                    </span>
                    <input
                        type="text"
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter target IP or domain..."
                        disabled={isHacking}
                        className="w-full bg-hacker-dark border-2 border-hacker-green/40 text-hacker-green focus:border-hacker-green focus:ring-hacker-green focus:ring-opacity-50 focus:outline-none rounded-md py-2 pl-10 pr-4 transition-all duration-300 disabled:opacity-50"
                    />
                </div>
                <button
                    onClick={onHack}
                    disabled={isHacking}
                    className="w-full sm:w-auto bg-hacker-green text-hacker-darker font-bold py-2 px-8 rounded-md border-2 border-hacker-green hover:bg-hacker-darker hover:text-hacker-green transition-all duration-300 disabled:bg-gray-600 disabled:text-gray-400 disabled:border-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {isHacking ? (
                        <>
                            <div className="w-4 h-4 border-2 border-dashed rounded-full animate-spin border-hacker-green"></div>
                            <span>ENGAGING...</span>
                        </>
                    ) : (
                        <span>INITIATE HACK</span>
                    )}
                </button>
            </div>
        </div>
    );
}
