
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilitySetActiveTrack: AppCapability = {
  id: 'setActiveTrack',
  name: 'Set Active Track',
  description: 'Designate a specific track ID as the active track. New UX components will automatically attach to this track.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      trackId: { type: Type.STRING, description: 'ID of the track to activate' }
    },
    required: ['trackId']
  }
};
