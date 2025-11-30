
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Disclaimer from './components/Disclaimer';
import HomeView from './components/HomeView';
import ResultView from './components/ResultView';
import AboutView from './components/AboutView';
import ContactView from './components/ContactView';
import Loader from './components/Loader';
import { AppState, MedicineData } from './types';
import { analyzeMedicine } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [medicineData, setMedicineData] = useState<MedicineData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string | null, image: string | null) => {
    setState(AppState.ANALYZING);
    setErrorMsg(null);
    setScannedImage(image);

    try {
      const data = await analyzeMedicine(text, image);
      setMedicineData(data);
      setState(AppState.RESULTS);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setState(AppState.ERROR);
    }
  }, []);

  const handleNavigate = (newState: AppState) => {
    setState(newState);
    // If navigating away from results, clear data? Optional. 
    // Keeping data for now so user can return to result if they click "Home" and we might implement history later.
    // For now, Home simply resets to IDLE in the Header logic if needed, but here we just switch views.
    if (newState === AppState.IDLE) {
        setMedicineData(null);
        setScannedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white">
      <Header onNavigate={handleNavigate} currentState={state} />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative w-full max-w-4xl mx-auto pb-20 pt-6">
        
        {state === AppState.IDLE && (
          <HomeView onAnalyze={handleAnalyze} />
        )}

        {state === AppState.ANALYZING && (
          <Loader />
        )}

        {state === AppState.RESULTS && medicineData && (
          <ResultView 
            data={medicineData} 
            onReset={() => handleNavigate(AppState.IDLE)} 
            scannedImage={scannedImage}
          />
        )}

        {state === AppState.ABOUT && (
          <AboutView />
        )}

        {state === AppState.CONTACT && (
          <ContactView />
        )}

        {state === AppState.ERROR && (
           <div className="flex flex-col items-center justify-center flex-grow px-6 text-center space-y-4 animate-in fade-in zoom-in duration-300">
             <AlertCircle size={48} className="text-zinc-300" />
             <h2 className="text-xl font-semibold">Oops, something went wrong.</h2>
             <p className="text-zinc-500 max-w-md">{errorMsg}</p>
             <button 
               onClick={() => handleNavigate(AppState.IDLE)}
               className="mt-6 px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-zinc-800"
             >
               Go Back
             </button>
           </div>
        )}

        {/* Developer Attribution Footer - Placed at bottom of content */}
        <div className="w-full text-center py-8 mt-auto">
          <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">
            App developed by Marcom Tech India
          </p>
        </div>
      </main>

      <Disclaimer />
    </div>
  );
};

export default App;