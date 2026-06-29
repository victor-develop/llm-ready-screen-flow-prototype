
import { CapabilityAddNode } from './addNode';
import { CapabilityUpdateNode } from './updateNode';
import { CapabilityUpdateComponentType } from './updateComponentType';
import { CapabilityDeleteNode } from './deleteNode';
import { CapabilityConnectNodes } from './connectNodes';
import { CapabilityClearCanvas } from './clearCanvas';
import { CapabilityGetCanvasState } from './getCanvasState';
import { CapabilityAddTrack } from './addTrack';
import { CapabilitySetActiveTrack } from './setActiveTrack';
import { CapabilityUpdateTrack } from './updateTrack';
import { CapabilityMoveTrack } from './moveTrack';

export * from './addNode';
export * from './updateNode';
export * from './updateComponentType';
export * from './deleteNode';
export * from './connectNodes';
export * from './clearCanvas';
export * from './getCanvasState';
export * from './addTrack';
export * from './setActiveTrack';
export * from './updateTrack';
export * from './moveTrack';

export const ALL_CAPABILITIES = [
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
];

export const getLLMTools = () => ALL_CAPABILITIES
  .filter(c => c.isExposedToLLM)
  .map(c => ({
    name: c.id,
    description: c.description,
    parameters: c.parameters
  }));
