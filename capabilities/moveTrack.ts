
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityMoveTrack: AppCapability = {
  id: 'moveTrack',
  name: 'Move Track',
  description: 'Move a track up or down by one row level.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'The ID of the track to move' },
      direction: { type: Type.STRING, enum: ['up', 'down'], description: 'Direction to move the track' }
    },
    required: ['id', 'direction']
  }
};
