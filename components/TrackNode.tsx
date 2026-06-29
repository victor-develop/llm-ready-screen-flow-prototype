
import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Edit2, Check, X, ChevronUp, ChevronDown } from 'lucide-react';

export const TrackNode = ({ id, data }: any) => {
  const width = data.width || 2000;
  const color = data.color || '#6366f1';
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data.label);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate handles at fixed intervals (every 450px to match slot width)
  const handleCount = Math.floor(width / 450);
  const handles = Array.from({ length: handleCount }, (_, i) => i);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditValue(data.label);
    setIsEditing(true);
  };

  const handleSave = (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (editValue.trim() && editValue !== data.label) {
      data.executeAction('updateTrack', { id, label: editValue.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleMove = (e: React.MouseEvent, direction: 'up' | 'down') => {
    e.stopPropagation();
    data.executeAction('moveTrack', { id, direction });
  };

  return (
    <div className="relative group/track" style={{ width }}>
      {/* Handles for connections */}
      {handles.map((i) => (
        <Handle
          key={`handle-${i}`}
          id={`slot-${i}`}
          type="target"
          position={Position.Bottom}
          style={{ 
            left: `${(i * 450) + 225}px`, 
            background: color,
            width: '6px',
            height: '6px',
            border: '1px solid #020617',
            opacity: 0.3, 
            pointerEvents: 'auto',
            bottom: '-3px'
          }}
          className="hover:opacity-100 transition-opacity"
        />
      ))}

      {/* The Main Glowing Line */}
      <div 
        className="h-[2px] w-full relative pointer-events-none"
        style={{ 
          background: `linear-gradient(90deg, transparent, ${color}, ${color}, transparent)`,
          boxShadow: `0 0 15px ${color}, 0 0 5px ${color}`
        }}
      >
        {/* Subtle animated light flow */}
        <div 
          className="absolute inset-0 w-full h-full opacity-50 overflow-hidden"
        >
          <div className="w-[200px] h-full bg-white/40 blur-md animate-track-flow" />
        </div>
      </div>

      {/* Label for the track */}
      <div className="absolute -top-10 left-0 flex items-center pointer-events-auto space-x-3">
        {isEditing ? (
          <form onSubmit={handleSave} className="flex items-center space-x-2 bg-slate-900 border border-slate-700 rounded-lg p-1 shadow-2xl">
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setIsEditing(false)}
              className="bg-transparent border-none text-[10px] font-black text-slate-100 uppercase tracking-[0.2em] focus:outline-none w-40"
            />
            <button type="submit" onClick={handleSave} className="p-1 hover:bg-emerald-500/20 text-emerald-500 rounded transition-colors">
              <Check size={12} />
            </button>
            <button type="button" onClick={handleCancel} className="p-1 hover:bg-rose-500/20 text-rose-500 rounded transition-colors">
              <X size={12} />
            </button>
          </form>
        ) : (
          <div className="flex items-center space-x-3">
            <div 
              className="flex items-center space-x-2 cursor-pointer group/label"
              onClick={handleStartEdit}
            >
              <div className="w-1.5 h-1.5 rounded-full transition-transform group-hover/label:scale-150" style={{ backgroundColor: color }} />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover/label:text-slate-300 transition-colors">
                {data.label}
              </span>
              <Edit2 size={10} className="text-slate-600 opacity-0 group-hover/track:opacity-100 transition-opacity" />
            </div>

            {/* Move Controls */}
            <div className="flex items-center bg-slate-900/50 border border-slate-800 rounded-md overflow-hidden opacity-0 group-hover/track:opacity-100 transition-opacity">
              <button 
                onClick={(e) => handleMove(e, 'up')}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors border-r border-slate-800"
                title="Move Up"
              >
                <ChevronUp size={12} />
              </button>
              <button 
                onClick={(e) => handleMove(e, 'down')}
                className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                title="Move Down"
              >
                <ChevronDown size={12} />
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes track-flow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(1000%); }
        }
        .animate-track-flow {
          animation: track-flow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default TrackNode;
