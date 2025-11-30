
import React, { useState, useRef } from 'react';
import { MedicineData } from '../types';
import { ShieldAlert, FileText, CheckCircle, Activity, Sparkles, Pill, AlertTriangle, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface ResultViewProps {
  data: MedicineData;
  onReset: () => void;
  scannedImage: string | null;
}

const ResultView: React.FC<ResultViewProps> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'alternates'>('overview');
  const [isDownloading, setIsDownloading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resultRef.current) return;
    setIsDownloading(true);
    
    try {
        // Wait for a moment to ensure rendering
        await new Promise(resolve => setTimeout(resolve, 100));

        const canvas = await html2canvas(resultRef.current, {
            scale: 2, // Higher quality
            backgroundColor: '#ffffff',
            useCORS: true,
            logging: false,
            // Ensure styling is captured correctly
            onclone: (document) => {
                const element = document.getElementById('result-card');
                if (element) {
                    element.style.boxShadow = 'none'; // Remove shadow for cleaner image
                    element.style.borderRadius = '0px'; // Optional: squared corners for image
                }
            }
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `PillSearch-${data.name.replace(/\s+/g, '-')}.png`;
        link.click();
    } catch (error) {
        console.error("Download failed", error);
        alert("Could not create image. Please try again.");
    } finally {
        setIsDownloading(false);
    }
  };

  if (!data.is_medicine) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center space-y-8 fade-in">
        <div className="w-20 h-20 bg-zinc-50 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400">
          <ShieldAlert size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold">Could not identify medicine</h3>
          <p className="text-zinc-500 max-w-xs mx-auto">
            The text provided does not appear to be a recognized medicine. Please try again or check the spelling.
          </p>
        </div>
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-zinc-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-6 pb-32 space-y-8 animate-fade-in-up">
      
      {/* Top Controls */}
      <div className="flex justify-end gap-2">
         <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-medium uppercase tracking-wide rounded-full transition-colors disabled:opacity-50"
         >
            {isDownloading ? (
                <span className="animate-pulse">Saving...</span>
            ) : (
                <>
                    <Download size={14} />
                    <span>Save Image</span>
                </>
            )}
         </button>
      </div>

      {/* Main Content Area to Capture */}
      <div 
        id="result-card" 
        ref={resultRef} 
        className="bg-white p-6 md:p-10 rounded-2xl border border-zinc-100 shadow-xl shadow-zinc-100/50 relative overflow-hidden bg-[radial-gradient(#f8f8f8_1px,transparent_1px)] [background-size:20px_20px]"
      >
          {/* Card Branding Header */}
          <div className="flex justify-between items-start border-b border-zinc-100 pb-6 mb-8">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-xl shadow-sm">
                    <Pill size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight text-black leading-none">PillSearch</h1>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest mt-1">AI Medicine Search</p>
                </div>
            </div>
            <div className="text-right hidden sm:block">
                <div className="text-[10px] font-mono text-zinc-400">REPORT DATE</div>
                <div className="text-xs font-bold text-zinc-700">{new Date().toLocaleDateString()}</div>
            </div>
          </div>

          {/* Analysis Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-medium tracking-wide uppercase shadow-sm">
                <CheckCircle size={12} className="text-green-400" /> 
                <span>Analysis Complete</span>
            </div>
          </div>

          {/* Name & Summary */}
          <div className="space-y-4 text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black capitalize leading-none break-words">
            {data.name}
            </h2>
            <div className="w-12 h-1 bg-black mx-auto rounded-full"></div>
            <p className="text-lg text-zinc-600 font-light leading-relaxed max-w-lg mx-auto">
            {data.summary}
            </p>
          </div>

          {/* Navigation Tabs (Visual) */}
          <div className="flex justify-center border-b border-zinc-200 mb-8 hide-on-capture">
            <div className="flex gap-8">
                <button 
                onClick={() => setActiveTab('overview')}
                className={`pb-4 text-sm font-medium transition-all relative px-2 ${activeTab === 'overview' ? 'text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                Overview
                {activeTab === 'overview' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
                </button>
                <button 
                onClick={() => setActiveTab('alternates')}
                className={`pb-4 text-sm font-medium transition-all relative px-2 ${activeTab === 'alternates' ? 'text-black' : 'text-zinc-400 hover:text-zinc-600'}`}
                >
                Alternatives
                {activeTab === 'alternates' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black"></span>}
                </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px]">
            {activeTab === 'overview' ? (
                <div className="space-y-10 animate-fade-in">
                  
                  {/* Side Effects */}
                  <div className="relative p-6 border border-zinc-200 rounded-xl bg-white shadow-sm overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Activity size={100} />
                    </div>
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                <Activity size={20} />
                            </div>
                            <h3 className="font-bold text-lg">Side Effects</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                            {data.side_effects && data.side_effects.length > 0 ? (
                                data.side_effects.map((effect, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm rounded-md">
                                        {effect}
                                    </span>
                                ))
                            ) : (
                                <span className="text-zinc-400 text-sm">No common side effects listed.</span>
                            )}
                        </div>
                    </div>
                  </div>

                  {/* Grid: Uses & Dosage */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -ml-px border-l border-dashed border-zinc-300"></div>

                    {/* Uses */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-black font-semibold uppercase text-xs tracking-wider">
                        <FileText size={16} />
                        <h3>Uses</h3>
                      </div>
                      <ul className="space-y-3">
                        {data.uses.map((use, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-zinc-700 text-sm leading-relaxed group">
                            <span className="block w-1.5 h-1.5 mt-2 rounded-full bg-black" />
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Dosage */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-black font-semibold uppercase text-xs tracking-wider">
                        <Pill size={16} />
                        <h3>Dosage Note</h3>
                      </div>
                      <div className="p-5 bg-zinc-50 rounded-lg border border-zinc-100 text-sm text-zinc-600 leading-relaxed italic relative">
                        <span className="absolute top-2 left-2 text-3xl text-zinc-200 leading-none">“</span>
                        <span className="relative z-10">{data.dosage_note}</span>
                        <span className="absolute bottom-[-10px] right-2 text-3xl text-zinc-200 leading-none">”</span>
                      </div>
                    </div>
                  </div>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex items-center gap-2 text-black font-semibold mb-6 border-b border-zinc-100 pb-2">
                      <Sparkles size={18} />
                      <h3>Generic & Brand Alternatives</h3>
                   </div>
                   
                   {data.alternates && data.alternates.length > 0 ? (
                      <div className="space-y-3">
                        {data.alternates.map((alt, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-zinc-300 text-xs font-mono">{(idx + 1).toString().padStart(2, '0')}</span>
                                <span className="font-medium text-zinc-800">{alt}</span>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-zinc-100"></div>
                          </div>
                        ))}
                      </div>
                   ) : (
                     <div className="p-12 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-xl bg-zinc-50/50">
                        No specific alternatives found.
                     </div>
                   )}
                   <div className="flex items-start gap-2 p-3 bg-blue-50 text-blue-800 text-xs rounded-md">
                     <AlertTriangle size={14} className="mt-0.5 shrink-0" />
                     <p>Alternatives listed are common equivalents but may vary by region. Always verify with a professional.</p>
                   </div>
                </div>
            )}
          </div>

          {/* Warnings */}
          {data.warnings.length > 0 && (
              <div className="border-t border-b border-zinc-100 py-6 space-y-3 mt-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-black flex items-center gap-2">
                    <AlertTriangle size={14} /> Warnings
                </h4>
                <ul className="grid grid-cols-1 gap-2">
                  {data.warnings.map((warn, idx) => (
                     <li key={idx} className="text-sm text-zinc-600 flex items-start gap-2">
                       <span className="text-black">•</span> {warn}
                     </li>
                  ))}
                </ul>
              </div>
          )}
          
          {/* Card Branding Footer */}
          <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-50/80 -mx-6 -mb-6 md:-mx-10 md:-mb-10 p-6">
            <div className="flex flex-col items-center md:items-start gap-1">
                 <span className="text-xs font-bold text-black uppercase tracking-wide">Download PillSearch App</span>
                 <span className="text-[10px] text-zinc-500">Scan, Search & Know your medicine instantly.</span>
            </div>
            <div className="text-center md:text-right">
                 <p className="text-[10px] text-zinc-400">Developed by</p>
                 <p className="text-xs font-bold text-zinc-800">Marcom Tech India</p>
            </div>
          </div>
      </div>

      <div className="flex justify-center pt-8 pb-4">
        <button 
          onClick={onReset}
          className="px-8 py-3 rounded-full border border-black text-sm text-black hover:bg-black hover:text-white font-medium transition-all"
        >
          Identify another medicine
        </button>
      </div>

    </div>
  );
};

export default ResultView;