
import React, { useRef, useState } from 'react';
import { Camera, Search, ArrowRight } from 'lucide-react';

interface HomeViewProps {
  onAnalyze: (text: string | null, image: string | null) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onAnalyze }) => {
  const [searchText, setSearchText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onAnalyze(null, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      onAnalyze(searchText, null);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-lg mx-auto w-full px-6 py-12 space-y-16 fade-in relative">
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] -z-10" />
      
      <div className="text-center space-y-6">
        <div className="inline-block w-12 h-1 bg-black mb-4"></div>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-black leading-none">
          PillSearch.
        </h2>
        <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-xs mx-auto">
          Scan or search to know your medicine instantly.
        </p>
      </div>

      <div className="w-full space-y-10">
        
        {/* Camera/Upload Button */}
        <div className="group relative w-full">
            <input
                type="file"
                accept="image/*"
                capture="environment" // Prefers rear camera on mobile
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                onClick={triggerCamera}
                className="w-full h-40 bg-white border border-zinc-200 rounded-none relative overflow-hidden flex flex-col items-center justify-center gap-4 hover:border-black transition-all cursor-pointer shadow-sm group-hover:shadow-md"
            >
                {/* Corner lines */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-300 group-hover:border-black transition-colors"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-300 group-hover:border-black transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-300 group-hover:border-black transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-300 group-hover:border-black transition-colors"></div>

                <div className="p-4 bg-black text-white rounded-full transition-transform group-hover:scale-110">
                    <Camera size={24} />
                </div>
                <span className="font-medium text-zinc-900 tracking-wide uppercase text-xs">Scan Medicine Label</span>
            </button>
        </div>

        <div className="relative flex items-center justify-center">
             <div className="w-full h-px bg-zinc-200 absolute"></div>
             <span className="relative bg-white px-4 text-xs font-mono text-zinc-400">OR SEARCH</span>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-full group">
          <input
            type="text"
            placeholder="e.g. Paracetamol side effects..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full p-5 pr-14 text-lg bg-zinc-50 border-b-2 border-zinc-200 focus:border-black focus:outline-none transition-all placeholder:text-zinc-300 font-light"
          />
          <button 
            type="submit"
            disabled={!searchText.trim()}
            className="absolute right-2 top-3 h-10 w-10 flex items-center justify-center rounded-full bg-transparent text-black hover:bg-zinc-200 disabled:text-zinc-300 transition-colors"
          >
            {searchText.trim() ? <ArrowRight size={24} /> : <Search size={24} />}
          </button>
        </form>

      </div>
    </div>
  );
};

export default HomeView;