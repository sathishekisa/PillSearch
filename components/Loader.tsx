import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 space-y-6 animate-pulse">
      <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      <p className="text-zinc-500 font-medium tracking-wide text-sm uppercase">Analyzing Medicine...</p>
    </div>
  );
};

export default Loader;
