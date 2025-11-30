
import React, { useState } from 'react';
import { Pill, Menu, X, Info, Mail, Home } from 'lucide-react';
import { AppState } from '../types';

interface HeaderProps {
  onNavigate: (state: AppState) => void;
  currentState: AppState;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentState }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNav = (state: AppState) => {
    onNavigate(state);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="w-full py-5 px-6 flex items-center justify-between border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div 
          onClick={() => handleNav(AppState.IDLE)}
          className="flex items-center gap-3 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-lg shadow-sm">
            <Pill size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">PillSearch</h1>
        </div>

        <button 
          onClick={() => setIsMenuOpen(true)}
          className="p-2 hover:bg-zinc-100 rounded-md transition-colors"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Slide-over Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="relative w-full max-w-sm h-full bg-white p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-bold tracking-tight">Menu</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex-grow space-y-2">
              <button 
                onClick={() => handleNav(AppState.IDLE)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${currentState === AppState.IDLE ? 'bg-black text-white shadow-md' : 'hover:bg-zinc-50 text-zinc-600'}`}
              >
                <Home size={20} />
                <span className="font-medium text-lg">Home</span>
              </button>

              <button 
                onClick={() => handleNav(AppState.ABOUT)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${currentState === AppState.ABOUT ? 'bg-black text-white shadow-md' : 'hover:bg-zinc-50 text-zinc-600'}`}
              >
                <Info size={20} />
                <span className="font-medium text-lg">About Us</span>
              </button>

              <button 
                onClick={() => handleNav(AppState.CONTACT)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${currentState === AppState.CONTACT ? 'bg-black text-white shadow-md' : 'hover:bg-zinc-50 text-zinc-600'}`}
              >
                <Mail size={20} />
                <span className="font-medium text-lg">Contact</span>
              </button>
            </nav>
            
            <div className="mt-auto space-y-6">
               <div className="w-full h-px bg-zinc-100" />
               <div className="text-xs text-zinc-400 font-mono">
                  PillSearch v1.0.0
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;