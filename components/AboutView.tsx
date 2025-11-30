
import React from 'react';
import { Sparkles, BrainCircuit, HeartHandshake } from 'lucide-react';

const AboutView: React.FC = () => {
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto px-6 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black">
          Reimagining<br/>Healthcare Clarity.
        </h2>
        <div className="w-16 h-1 bg-black mx-auto rounded-full"></div>
      </div>

      {/* Mission Statement */}
      <div className="prose prose-zinc text-center">
        <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
          At <strong className="text-black font-semibold">Marcom Tech India</strong>, we believe that understanding your health shouldn't require a medical degree. We are leveraging the power of Artificial Intelligence to bridge the gap between complex pharmacology and daily life.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="flex flex-col items-center text-center space-y-3 p-6 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="p-3 bg-white rounded-full border border-zinc-200 shadow-sm">
            <BrainCircuit size={24} className="text-black" />
          </div>
          <h3 className="font-bold text-sm uppercase tracking-wide">AI Powered</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Utilizing state-of-the-art Gemini models to decode complex medical labels instantly.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3 p-6 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="p-3 bg-white rounded-full border border-zinc-200 shadow-sm">
            <HeartHandshake size={24} className="text-black" />
          </div>
          <h3 className="font-bold text-sm uppercase tracking-wide">Human Centric</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Designed for normal people. No jargon, just clear, actionable information.
          </p>
        </div>

        <div className="flex flex-col items-center text-center space-y-3 p-6 bg-zinc-50 rounded-xl border border-zinc-100">
          <div className="p-3 bg-white rounded-full border border-zinc-200 shadow-sm">
            <Sparkles size={24} className="text-black" />
          </div>
          <h3 className="font-bold text-sm uppercase tracking-wide">Better World</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Creating a safer, more informed world through accessible technology.
          </p>
        </div>
      </div>

      {/* Footer Quote */}
      <div className="text-center pt-8 border-t border-zinc-100 w-full">
        <p className="text-sm font-medium text-zinc-400 uppercase tracking-widest">
           Marcom Tech India
        </p>
        <p className="mt-2 text-zinc-500 text-sm">
          Innovating for a healthier tomorrow.
        </p>
      </div>

    </div>
  );
};

export default AboutView;