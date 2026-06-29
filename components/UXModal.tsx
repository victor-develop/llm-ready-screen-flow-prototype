
import React from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink } from 'lucide-react';
import { UX_COMPONENTS } from './ux/registry';

interface UXModalProps {
  isOpen: boolean;
  onClose: () => void;
  componentType: string;
  id: string;
  componentProps?: any;
}

const UXModal: React.FC<UXModalProps> = ({ isOpen, onClose, componentType, id, componentProps }) => {
  if (!isOpen) return null;

  const Component = UX_COMPONENTS[componentType];

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        
        {/* Modal Header - Streamlined for focus */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center space-x-4">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">{componentType.replace('-', ' ')}</h3>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[9px] font-bold uppercase tracking-widest border border-indigo-500/20">Active View</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono tracking-wider opacity-60">{id}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-4 italic">
              <ExternalLink size={12} />
              <span>Resize browser to test responsiveness</span>
            </div>
            <button 
              onClick={onClose}
              className="group relative p-2.5 bg-white/5 hover:bg-rose-500/20 rounded-xl transition-all duration-300 text-slate-400 hover:text-rose-500 border border-white/5 hover:border-rose-500/30"
              aria-label="Close Preview"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Content - Area with centering and safe margin padding */}
        <div className="flex-grow bg-slate-950 flex flex-col items-center justify-center overflow-auto relative">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#6366f1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Component Wrapper with small padding margin (p-4) to prevent touching screen edges */}
          <div className="w-full h-full relative z-10 flex items-center justify-center p-4 sm:p-8 md:p-12">
            {Component ? (
              <div className="w-full h-full flex items-center justify-center max-w-7xl mx-auto">
                <Component {...componentProps} />
              </div>
            ) : (
              <div className="flex-grow flex items-center justify-center p-20">
                <div className="text-slate-500 italic font-medium text-center space-y-4">
                  <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-indigo-500 animate-spin mx-auto mb-4" />
                  <p className="uppercase tracking-[0.3em] text-xs font-black">Initialising UX Architecture...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UXModal;
