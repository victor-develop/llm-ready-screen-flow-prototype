
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Search, ChevronDown, Check, Maximize2, ExternalLink, Copy, CheckCheck } from 'lucide-react';
import { UX_COMPONENTS, UX_COMPONENT_KEYS } from './ux/registry';
import { CapabilityUpdateComponentType } from '../capabilities/index';
import UXModal from './UXModal';

// Autocomplete Component for UX nodes
const ComponentAutocomplete = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const options = UX_COMPONENT_KEYS;
  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-40 group pointer-events-auto">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between bg-slate-900/90 backdrop-blur-md text-white px-2 py-1.5 rounded-lg shadow-lg cursor-pointer transition-all border border-slate-700 hover:border-blue-500"
      >
        <span className="text-[9px] font-bold uppercase tracking-wider truncate mr-1">
          {value || 'Select Component'}
        </span>
        <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 w-full bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="p-2 border-b border-slate-800 flex items-center bg-slate-950/50">
            <Search size={10} className="text-slate-500 mr-2" />
            <input 
              autoFocus
              className="bg-transparent border-none outline-none text-[10px] text-slate-200 w-full placeholder-slate-600"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-40 overflow-y-auto p-1 custom-scrollbar">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div 
                  key={opt}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(opt);
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className={`flex items-center justify-between px-2 py-1.5 rounded-lg text-[9px] font-medium cursor-pointer transition-colors ${
                    value === opt 
                      ? 'bg-blue-600/20 text-blue-400' 
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{opt}</span>
                  {value === opt && <Check size={8} />}
                </div>
              ))
            ) : (
              <div className="px-2 py-3 text-[9px] text-slate-600 italic text-center">
                No results
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const UXNode = ({ id, data, selected }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [scale, setScale] = useState(0.2); 
  const componentRef = useRef<HTMLDivElement>(null);
  
  // Extract a short ID (last 8 characters)
  const shortId = id.length > 8 ? id.slice(-8) : id;

  const handleCopyId = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  const Component = UX_COMPONENTS[data.componentType];

  const previewWidth = 260;
  const previewHeight = 320;
  const paddingBuffer = 40;

  const updateScale = useCallback(() => {
    if (componentRef.current) {
      const { scrollWidth, scrollHeight } = componentRef.current;
      if (scrollWidth > 1 && scrollHeight > 1) {
        const scaleW = (previewWidth - paddingBuffer) / scrollWidth;
        const scaleH = (previewHeight - paddingBuffer) / scrollHeight;
        const newScale = Math.min(scaleW, scaleH);
        setScale(newScale);
      }
    }
  }, [previewWidth, previewHeight, paddingBuffer]);

  useEffect(() => {
    if (!componentRef.current) return;
    const observer = new ResizeObserver(() => requestAnimationFrame(updateScale));
    observer.observe(componentRef.current);
    updateScale();
    return () => observer.disconnect();
  }, [updateScale, data.componentType, data.componentProps]);

  const handleTypeChange = (newType: string) => {
    if (data.executeAction) {
      data.executeAction(CapabilityUpdateComponentType.id, { id, componentType: newType });
    }
  };

  const nodeColor = data.color || '#6366f1';

  return (
    <div className={`relative group transition-all duration-300 ${selected ? 'ring-4 ring-blue-500/50 rounded-2xl' : ''}`}>
      
      {/* Top UI Overlay */}
      <div className="absolute -top-10 left-0 flex items-center justify-between w-full px-0">
        <ComponentAutocomplete 
          value={data.componentType}
          onChange={handleTypeChange}
        />
        <div className="flex space-x-1.5 pointer-events-auto">
           <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-1.5 rounded-lg text-slate-400 hover:text-white hover:border-blue-500 transition-all shadow-xl"
            title="Expand Preview"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>
      
      <Handle type="target" position={Position.Left} className="!bg-blue-500 !w-3 !h-3 !border-slate-900 !-left-1.5" />
      
      <div 
        className="relative bg-slate-100 rounded-xl overflow-hidden border border-slate-800 shadow-2xl transition-all group-hover:border-slate-600 flex items-center justify-center"
        style={{ width: previewWidth, height: previewHeight }}
      >
        <div 
          className="transition-transform duration-500 ease-out origin-center flex items-center justify-center" 
          style={{ transform: `scale(${scale})` }}
        >
          <div ref={componentRef} className="inline-block">
            {Component ? (
               <div className="pointer-events-none flex items-center justify-center">
                  <Component {...data.componentProps} />
               </div>
            ) : (
              <div className="p-12 text-slate-400 italic text-[10px] text-center uppercase tracking-[0.3em] font-black w-[300px]">
                Architecting View...
              </div>
            )}
          </div>
        </div>
        
        <div className="absolute inset-0 bg-transparent z-10" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
            className="pointer-events-auto bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-full shadow-2xl font-bold text-[9px] uppercase tracking-widest flex items-center space-x-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all"
          >
            <ExternalLink size={10} />
            <span>Interactive Scale</span>
          </button>
        </div>
      </div>
      
      <Handle type="source" position={Position.Right} className="!bg-blue-500 !w-3 !h-3 !border-slate-900 !-right-1.5" />
      
      {/* Handle for track connection */}
      <Handle 
        type="source" 
        id="track-connector"
        position={Position.Top} 
        className="!bg-white !w-2.5 !h-2.5 !border-none !shadow-[0_0_15px_white]" 
        style={{ top: -5 }}
      />

      <div className="mt-2 flex items-center justify-between px-1.5 py-1 bg-slate-900/30 rounded-lg border border-slate-800/50">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter truncate max-w-[120px]">{data.label}</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[7px] font-mono text-slate-600">ID: {shortId}</span>
            <button 
              onClick={handleCopyId}
              className={`p-1 rounded transition-all ${copied ? 'text-emerald-500 bg-emerald-500/10' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
              title="Copy Full ID"
            >
              {copied ? <CheckCheck size={8} /> : <Copy size={8} />}
            </button>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[7px] font-mono text-slate-700 uppercase">{data.componentType}</span>
        </div>
      </div>

      <UXModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        componentType={data.componentType} 
        id={id} 
        componentProps={data.componentProps} 
      />

      <style>{`
        @keyframes beam-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-beam-pulse {
          animation: beam-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UXNode;
