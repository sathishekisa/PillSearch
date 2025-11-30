import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Disclaimer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white py-3 px-4 z-50 flex items-center justify-center gap-3 text-xs md:text-sm font-medium">
      <AlertTriangle size={16} className="text-yellow-400 shrink-0" />
      <p className="text-center opacity-90">
        Consult a doctor before use. AI generated information may be inaccurate.
      </p>
    </div>
  );
};

export default Disclaimer;
