
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityAddTrack: AppCapability = {
  id: 'addTrack',
  name: 'Add Architectural Track',
  description: 'Add a horizontal architectural track that can host UX components.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      label: { type: Type.STRING, description: 'Label for the track (e.g., Main App Flow)' },
      x: { type: Type.NUMBER, description: 'Starting X coordinate' },
      y: { type: Type.NUMBER, description: 'Y coordinate' },
      width: { type: Type.NUMBER, description: 'Width of the track line', default: 2000 },
      color: { type: Type.STRING, description: 'Theme color for the track' }
    },
    required: ['label']
  }
};
