
import React from 'react';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';

const ContactView: React.FC = () => {
  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto px-6 py-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="text-center space-y-6 w-full">
        <h2 className="text-4xl font-bold tracking-tighter text-black">
          Get in Touch
        </h2>
        <p className="text-zinc-500 text-lg font-light">
          We'd love to hear from you.
        </p>
      </div>

      <div className="w-full space-y-6">
        
        {/* Email Card */}
        <div className="group relative w-full overflow-hidden bg-black text-white rounded-2xl p-8 transition-transform hover:-translate-y-1 duration-300">
            <div className="absolute top-0 right-0 p-6 opacity-20">
                <Mail size={80} />
            </div>
            
            <div className="relative z-10 space-y-6">
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Email Us</h3>
                    <a href="mailto:marcomtechindia@gmail.com" className="text-xl md:text-2xl font-medium border-b border-zinc-700 pb-1 hover:border-white transition-colors">
                        marcomtechindia@gmail.com
                    </a>
                </div>
                <p className="text-zinc-400 text-sm max-w-xs">
                    For feedback, business inquiries, or just to say hello. We typically respond within 24 hours.
                </p>
            </div>
        </div>

        {/* Location / Info Card */}
        <div className="grid grid-cols-1 gap-6">
            <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-8 flex items-start gap-4">
                <div className="p-3 bg-white rounded-full shadow-sm shrink-0">
                    <MapPin size={20} />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-sm uppercase tracking-wide">Marcom Tech India</h3>
                    <p className="text-sm text-zinc-600">
                        Tech Hub, India
                    </p>
                    <div className="pt-2">
                        <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                            Digital First Company <ArrowUpRight size={10} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;