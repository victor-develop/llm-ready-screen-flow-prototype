
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { useNodesState, useEdgesState, addEdge, MarkerType, Connection } from '@xyflow/react';
import { 
  Send, 
  Maximize2, 
  Minimize2, 
  Download, 
  Upload,
  Brain,
  Layers,
  Plus,
  Layout,
  Zap
} from 'lucide-react';
import { 
  Message
} from './types';
import { 
  CapabilityAddNode, 
  CapabilityUpdateNode, 
  CapabilityUpdateComponentType,
  CapabilityDeleteNode, 
  CapabilityConnectNodes, 
  CapabilityClearCanvas, 
  CapabilityGetCanvasState,
  CapabilityAddTrack,
  CapabilitySetActiveTrack,
  CapabilityUpdateTrack,
  CapabilityMoveTrack
} from './capabilities';
import { SYSTEM_INSTRUCTION, TOOLS } from './constants';
import Canvas from './components/Canvas';

const App: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  const nodesRef = useRef(nodes);
  const edgesRef = useRef(edges);
  useEffect(() => { nodesRef.current = nodes; }, [nodes]);
  useEffect(() => { edgesRef.current = edges; }, [edges]);

  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "System initialized. I'm ready to architect your UI. Shall we start with a track?" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentThought, setCurrentThought] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const getHexColor = (color: string = 'blue') => {
    const palette: Record<string, string> = {
      blue: '#3b82f6',
      green: '#10b981',
      amber: '#f59e0b',
      rose: '#f43f5e',
      purple: '#a855f7',
      slate: '#64748b',
      indigo: '#6366f1'
    };
    return palette[color] || palette.blue;
  };

  const executeAction = useCallback((actionId: string, args: any, isManual: boolean = false) => {
    let result: any;
    
    switch (actionId) {
      case CapabilitySetActiveTrack.id: {
        const exists = nodesRef.current.some(n => n.id === args.trackId && n.type === 'track');
        if (exists) {
          setActiveTrackId(args.trackId);
          result = { status: 'success', activeTrackId: args.trackId };
        } else {
          result = { error: 'Track not found' };
        }
        break;
      }

      case CapabilityUpdateTrack.id: {
        setNodes((nds) => {
          const updated = nds.map((node) => {
            if (node.id === args.id) {
              return {
                ...node,
                data: { 
                  ...node.data, 
                  label: args.label ?? node.data.label,
                  color: args.color ? getHexColor(args.color) : node.data.color,
                  width: args.width ?? node.data.width
                }
              };
            }
            return node;
          });
          nodesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id: args.id };
        break;
      }

      case CapabilityAddTrack.id: {
        const id = `track-${Date.now()}`;
        
        // Calculate auto-positioning if not provided
        let finalX = args.x ?? 0;
        let finalY = args.y;
        
        if (finalY === undefined) {
          const allNodes = nodesRef.current;
          if (allNodes.length === 0) {
            finalY = 0;
          } else {
            // Calculate the absolute bottom of all content
            const absoluteBottoms = allNodes.map(node => {
              let y = node.position.y;
              // If it's a child node, add parent's y
              if (node.parentId) {
                const parent = allNodes.find(n => n.id === node.parentId);
                if (parent) y += parent.position.y;
              }
              
              // Estimate height: Track is thin, UX nodes are very tall with overlays
              const height = node.type === 'track' ? 100 : 1000; 
              return y + height;
            });
            
            const currentBottom = Math.max(...absoluteBottoms);
            finalY = currentBottom + 500; // Increased buffer to 500px
          }
        }

        const newNode = {
          id,
          type: 'track',
          draggable: false,
          position: { x: finalX, y: finalY },
          data: { 
            label: args.label || 'System Track',
            width: args.width || 2000,
            color: getHexColor(args.color || 'indigo'),
            executeAction: (id: string, args: any) => executeAction(id, args, true)
          },
        };
        setNodes((nds) => {
          const updated = nds.concat(newNode);
          nodesRef.current = updated;
          return updated;
        });
        setActiveTrackId(id);
        result = { status: 'success', id };
        break;
      }

      case CapabilityAddNode.id: {
        const id = `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        let finalX = args.x ?? 100;
        let finalY = args.y ?? 100;
        let onTrack = false;
        let targetTrackId = args.trackId || activeTrackId;
        let parentId = undefined;
        
        // Handle Track Positioning
        if (targetTrackId) {
          const trackNode = nodesRef.current.find(n => n.id === targetTrackId);
          if (trackNode) {
            // Calculate slot if not provided
            let slot = args.slot;
            if (slot === undefined) {
              const edgesToTrack = edgesRef.current.filter(e => e.target === targetTrackId);
              slot = edgesToTrack.length;
            }

            const slotWidth = 450; 
            finalX = (slot * slotWidth) + 95; 
            finalY = 100; // Move node to be below the track
            onTrack = true;
            parentId = targetTrackId;

            // Create the edge connection
            const edgeId = `edge-track-${id}`;
            const newEdge = {
              id: edgeId,
              source: id,
              target: targetTrackId,
              sourceHandle: 'track-connector',
              targetHandle: `slot-${slot}`,
              type: 'straight',
              animated: true,
              style: { 
                stroke: getHexColor(args.color), 
                strokeWidth: 2,
                filter: `drop-shadow(0 0 8px ${getHexColor(args.color)})`
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: getHexColor(args.color),
                width: 10,
                height: 10
              }
            };
            setEdges((eds) => [...eds, newEdge]);
          }
        }

        const newNode = {
          id,
          parentId,
          type: 'ux',
          position: { x: finalX, y: finalY },
          data: { 
            label: args.label || 'New View',
            color: getHexColor(args.color),
            componentType: args.componentType,
            onTrack,
            trackId: targetTrackId,
            executeAction: (id: string, args: any) => executeAction(id, args, true)
          },
        };
        setNodes((nds) => {
          const updated = nds.concat(newNode);
          nodesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id };
        break;
      }

      case CapabilityMoveTrack.id: {
        setNodes((nds) => {
          const target = nds.find(n => n.id === args.id);
          if (!target) return nds;

          const tracks = nds.filter(n => n.type === 'track').sort((a, b) => a.position.y - b.position.y);
          const currentIndex = tracks.findIndex(t => t.id === args.id);
          
          let delta = 0;
          const BUFFER = 300;
          const EST_NODE_HEIGHT = 900; // Safe estimate for UX nodes

          const getClusterHeight = (trackId: string) => {
            const children = nds.filter(n => n.parentId === trackId);
            if (children.length === 0) return 100;
            const bottoms = children.map(c => c.position.y + (c.type === 'ux' ? EST_NODE_HEIGHT : 100));
            return Math.max(100, ...bottoms);
          };

          if (args.direction === 'up') {
            if (currentIndex > 0) {
              const neighbor = tracks[currentIndex - 1];
              const myHeight = getClusterHeight(target.id);
              // Target new Y = neighbor.y - myHeight - BUFFER
              delta = (neighbor.position.y - myHeight - BUFFER) - target.position.y;
            } else {
              delta = -(getClusterHeight(target.id) + BUFFER);
            }
          } else {
            if (currentIndex < tracks.length - 1) {
              const neighbor = tracks[currentIndex + 1];
              const neighborHeight = getClusterHeight(neighbor.id);
              // Target new Y = neighbor.y + neighborHeight + BUFFER
              delta = (neighbor.position.y + neighborHeight + BUFFER) - target.position.y;
            } else {
              delta = (getClusterHeight(target.id) + BUFFER);
            }
          }

          const updated = nds.map((node) => {
            if (node.id === args.id) {
              return {
                ...node,
                position: { ...node.position, y: node.position.y + delta }
              };
            }
            return node;
          });
          nodesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id: args.id };
        break;
      }

      case CapabilityUpdateNode.id: {
        setNodes((nds) => {
          const updated = nds.map((node) => {
            if (node.id === args.id) {
              return {
                ...node,
                position: args.x !== undefined || args.y !== undefined 
                  ? { x: args.x ?? node.position.x, y: args.y ?? node.position.y }
                  : node.position,
                data: { 
                  ...node.data, 
                  label: args.label ?? node.data.label,
                  color: args.color ? getHexColor(args.color) : node.data.color
                }
              };
            }
            return node;
          });
          nodesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id: args.id };
        break;
      }

      case CapabilityUpdateComponentType.id: {
        setNodes((nds) => {
          const updated = nds.map((node) => {
            if (node.id === args.id) {
              return {
                ...node,
                data: { 
                  ...node.data, 
                  componentType: args.componentType
                }
              };
            }
            return node;
          });
          nodesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id: args.id };
        break;
      }

      case CapabilityDeleteNode.id: {
        setNodes((nds) => {
          const updated = nds.filter((n) => n.id !== args.id);
          nodesRef.current = updated;
          return updated;
        });
        setEdges((eds) => {
          const updated = eds.filter((e) => e.source !== args.id && e.target !== args.id);
          edgesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id: args.id };
        break;
      }

      case CapabilityConnectNodes.id: {
        const edgeId = `edge-${args.sourceId}-${args.targetId}`;
        const newEdge = {
          id: edgeId,
          source: args.sourceId,
          target: args.targetId,
          label: args.label,
          animated: true,
          style: { stroke: '#6366f1', strokeWidth: 2 },
          markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
        };
        setEdges((eds) => {
          const updated = addEdge(newEdge, eds);
          edgesRef.current = updated;
          return updated;
        });
        result = { status: 'success', id: edgeId };
        break;
      }

      case CapabilityClearCanvas.id: {
        setNodes([]);
        setEdges([]);
        setActiveTrackId(null);
        nodesRef.current = [];
        edgesRef.current = [];
        result = { status: 'success' };
        break;
      }

      case CapabilityGetCanvasState.id: {
        result = { nodes: nodesRef.current, edges: edgesRef.current, activeTrackId };
        break;
      }

      default:
        throw new Error(`Capability Exception: Unknown Action ID "${actionId}"`);
    }

    if (isManual) {
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: `Audit: ${actionId} executed.` 
      }]);
    }

    return result;
  }, [setNodes, setEdges, activeTrackId]);

  useEffect(() => {
    setNodes((nds) => nds.map(n => ({
      ...n,
      data: { ...n.data, executeAction }
    })));
  }, [executeAction]);

  const onConnect = useCallback((params: Connection) => {
    executeAction(CapabilityConnectNodes.id, {
      sourceId: params.source,
      targetId: params.target
    }, true);
  }, [executeAction]);

  const sendMessage = async () => {
    if (!userInput.trim() || isProcessing) return;

    const currentInput = userInput;
    setUserInput('');
    setMessages(prev => [...prev, { role: 'user', content: currentInput }]);
    setIsProcessing(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const currentHistory = [...history, { role: 'user', parts: [{ text: currentInput }] }];

    try {
      let loopCount = 0;
      const MAX_LOOPS = 6;

      while (loopCount < MAX_LOOPS) {
        setCurrentThought('Architecting Journey...');
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: currentHistory,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            tools: [{ functionDeclarations: TOOLS as any }],
          },
        });

        const candidate = response.candidates?.[0];
        if (!candidate) break;

        const parts = candidate.content.parts;
        currentHistory.push({ role: 'model', parts });

        const textOutput = response.text;
        const functionCalls = response.functionCalls || [];

        if (textOutput) {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: textOutput, 
            isThought: functionCalls.length > 0 
          }]);
        }

        if (functionCalls.length === 0) break;

        const toolResponses = [];
        for (const call of functionCalls) {
          setCurrentThought(`System Call: ${call.name}...`);
          
          let result;
          try {
            result = executeAction(call.name, call.args);
          } catch (err: any) {
            result = { error: err.message };
          }
          
          toolResponses.push({
            functionResponse: {
              name: call.name,
              id: call.id,
              response: result
            }
          });
        }

        currentHistory.push({ role: 'user', parts: toolResponses });
        loopCount++;
      }
      setHistory(currentHistory);
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsProcessing(false);
      setCurrentThought(null);
    }
  };

  const handleExport = () => {
    const data = JSON.stringify({ nodes, edges, activeTrackId }, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ux-arch-${new Date().getTime()}.json`;
    a.click();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (f) => {
      try {
        const data = JSON.parse(f.target?.result as string);
        if (data.nodes) setNodes(data.nodes);
        if (data.edges) setEdges(data.edges);
        if (data.activeTrackId) setActiveTrackId(data.activeTrackId);
      } catch (e) { alert("Import failed"); }
    };
    reader.readAsText(file);
  };

  const handleManualAddUX = () => {
    executeAction(CapabilityAddNode.id, {
      label: 'New View',
      componentType: 'login-form',
      color: 'indigo'
    }, true);
  };

  const handleManualAddTrack = () => {
    executeAction(CapabilityAddTrack.id, {
      label: 'New Track',
      width: 3000,
      color: 'indigo'
    }, true);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, currentThought]);

  return (
    <div className="flex h-screen w-full bg-slate-950 overflow-hidden font-sans text-slate-200">
      <main className="relative flex-grow h-full overflow-hidden">
        <Canvas 
          nodes={nodes} 
          edges={edges} 
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
        />

        <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
          <div className="flex items-center space-x-4 pointer-events-auto">
            <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-2 rounded-2xl flex space-x-1 shadow-2xl">
              <button 
                onClick={handleManualAddTrack} 
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest border border-white/5"
              >
                <Plus size={14} />
                <span>Track</span>
              </button>
              
              <button 
                onClick={handleManualAddUX} 
                disabled={!activeTrackId}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-900/40 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus size={14} />
                <span>View</span>
              </button>
              
              <div className="w-px h-8 bg-slate-800 mx-1 self-center" />
              
              <button onClick={handleExport} className="p-2.5 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white">
                <Download size={18} />
              </button>
              <label className="p-2.5 hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-white cursor-pointer">
                <Upload size={18} />
                <input type="file" className="hidden" onChange={handleImport} accept=".json" />
              </label>
            </div>

            {activeTrackId && (
              <div className="bg-indigo-600/10 backdrop-blur-xl border border-indigo-500/20 px-4 py-2 rounded-2xl flex items-center space-x-3 shadow-2xl">
                <Zap size={14} className="text-indigo-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                  Active Track: {nodes.find(n => n.id === activeTrackId)?.data.label}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      <aside className={`transition-all duration-500 bg-slate-900 border-l border-slate-800 flex flex-col relative z-50 ${isExpanded ? 'fixed inset-0 w-full' : 'w-[400px]'}`}>
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-900/20">
              <Brain size={22} className="text-white" />
            </div>
            <h2 className="font-black text-sm uppercase tracking-[0.2em] text-slate-100">Architect</h2>
          </div>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-5 space-y-4 scroll-smooth custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[90%] rounded-2xl p-4 text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : msg.role === 'system'
                    ? 'bg-slate-950/50 text-slate-500 text-[9px] font-mono border border-slate-800'
                    : 'bg-slate-800 text-slate-200 border border-slate-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {currentThought && (
            <div className="flex justify-start">
              <div className="bg-slate-950/50 text-indigo-400 text-[10px] p-3 rounded-xl border border-indigo-900/30 animate-pulse font-bold uppercase tracking-widest">
                {currentThought}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-5 border-t border-slate-800 bg-slate-950/50">
          <div className="relative">
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Design intent..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all text-sm text-slate-200 placeholder-slate-600 resize-none min-h-[80px]"
            />
            <button
              onClick={sendMessage}
              disabled={isProcessing || !userInput.trim()}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default App;
