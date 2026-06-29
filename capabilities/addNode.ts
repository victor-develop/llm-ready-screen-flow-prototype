
import { Type } from "@google/genai";
import { AppCapability } from "../types";
import { UX_COMPONENT_KEYS } from "../components/ux/registry";

export const CapabilityAddNode: AppCapability = {
  id: 'addNode',
  name: 'Add Node',
  description: 'Add a new node or UX component to the canvas. Can be attached to a track for architectural alignment.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      label: { type: Type.STRING, description: 'The title/label for the node' },
      x: { type: Type.NUMBER, description: 'X coordinate (ignored if trackId is provided)' },
      y: { type: Type.NUMBER, description: 'Y coordinate (ignored if trackId is provided)' },
      componentType: { 
        type: Type.STRING, 
        enum: UX_COMPONENT_KEYS, 
        description: 'Specify which UX component to render' 
      },
      color: { type: Type.STRING, description: 'Theme color hint' },
      trackId: { type: Type.STRING, description: 'Optional: ID of a track to attach this node to' },
      slot: { type: Type.NUMBER, description: 'Optional: Horizontal slot index (0, 1, 2...) if attached to a track' }
    },
    required: ['label']
  }
};
