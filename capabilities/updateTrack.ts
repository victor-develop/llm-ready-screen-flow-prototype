
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityUpdateTrack: AppCapability = {
  id: 'updateTrack',
  name: 'Update Track',
  description: 'Update properties of an existing track (e.g., rename it).',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'ID of the track to update' },
      label: { type: Type.STRING, description: 'New label for the track' },
      color: { type: Type.STRING, description: 'New theme color for the track' },
      width: { type: Type.NUMBER, description: 'New width for the track' }
    },
    required: ['id']
  }
};
