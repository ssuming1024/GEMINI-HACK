
import React, { useState, useRef, useEffect } from 'react';
import { TerminalOutput } from './components/TerminalOutput';
import { Header } from './components/Header';
import { TargetInput } from './components/TargetInput';
import { simulateHacking } from './services/geminiService';
import type { GenerateContentResponse } from '@google/genai';


const App: React.FC = () => {
  const [target, setTarget] = useState<string>('192.168.1.1');
  const [output, setOutput] = useState<string>('');
  const [isHacking, setIsHacking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleHack = async () => {
    if (!target || isHacking) return;
    setIsHacking(true);
    setError(null);
    setOutput('');

    try {
      const stream = await simulateHacking(target);
      for await (const chunk of stream) {
        setOutput((prev) => prev + chunk.text);
      }
    } catch (err) {
      console.error(err);
      setError('Connection failed. The target system may be offline or firewall is blocking the connection.');
      setOutput((prev) => prev + '\n\n[CRITICAL_ERROR] :: CONNECTION TERMINATED');
    } finally {
      setIsHacking(false);
    }
  };
  
  useEffect(() => {
      setOutput(`Ready to engage. Specify target and initiate sequence.\n\n> `);
  }, []);

  return (
    <div className="relative min-h-screen bg-hacker-darker font-mono text-hacker-green p-4 sm:p-6 md:p-8 flex flex-col scanline-effect">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20"></div>
        <div className="relative z-10 flex flex-col flex-grow">
            <Header />
            
            <main className="flex-grow flex flex-col">
                <TargetInput 
                    target={target} 
                    setTarget={setTarget} 
                    onHack={handleHack} 
                    isHacking={isHacking} 
                />
                
                {error && (
                    <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-md max-w-4xl w-full mx-auto mb-4" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                
                <TerminalOutput output={output} isHacking={isHacking} />
            </main>

            <footer className="text-center text-xs text-hacker-green/50 mt-8">
                <p>Disclaimer: This is a fictional simulation. No actual hacking is performed.</p>
                <p>Powered by Gemini API.</p>
            </footer>
        </div>
    </div>
  );
};

export default App;
