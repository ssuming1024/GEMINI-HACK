
import React, { useEffect, useRef } from 'react';

interface TerminalOutputProps {
  output: string;
  isHacking: boolean;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ output, isHacking }) => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-hacker-dark/70 backdrop-blur-sm border border-hacker-green/30 rounded-lg shadow-lg shadow-hacker-green/10 flex-grow max-w-4xl w-full mx-auto p-4 overflow-hidden flex flex-col">
        <div className="flex items-center pb-2 mb-2 border-b border-hacker-green/30">
            <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <p className="text-center flex-grow text-sm text-hacker-green/70">/bin/bash - GHT_Terminal</p>
        </div>
        <div ref={terminalRef} className="overflow-y-auto h-full pr-2 text-sm whitespace-pre-wrap">
            <span>{output}</span>
            {isHacking && <span className="inline-block w-2 h-4 bg-hacker-green animate-pulse ml-1"></span>}
        </div>
    </div>
  );
};
