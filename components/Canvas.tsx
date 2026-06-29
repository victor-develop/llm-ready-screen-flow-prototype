
import React, { useMemo } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  BackgroundVariant,
  Panel,
  OnConnect
} from '@xyflow/react';
import { UXNode } from './UXNode';
import { TrackNode } from './TrackNode';

interface CanvasProps {
  nodes: any[];
  edges: any[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: OnConnect;
}

const Canvas: React.FC<CanvasProps> = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect }) => {
  const nodeTypes = useMemo(() => ({
    ux: UXNode,
    track: TrackNode,
  }), []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        fitView
        colorMode="dark"
        minZoom={0.1}
        maxZoom={4}
      >
        <Background 
            variant={BackgroundVariant.Dots} 
            gap={20} 
            size={1} 
            color="#334155" 
            style={{ backgroundColor: '#020617' }} 
        />
        <Controls />
        <MiniMap 
            nodeColor={(n: any) => n.data?.color || '#3b82f6'} 
            maskColor="rgba(2, 6, 23, 0.7)" 
            style={{ bottom: 20, right: 20 }}
        />
        <Panel position="top-right" className="bg-slate-900/50 backdrop-blur-md p-2 rounded-lg border border-slate-800 text-[10px] text-slate-500 font-mono pointer-events-none">
          ARCHITECT ENGINE: v3.1-CAPABILITY-UI
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default Canvas;
