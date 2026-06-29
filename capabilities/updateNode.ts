
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityUpdateNode: AppCapability = {
  id: 'updateNode',
  name: 'Update Node',
  description: 'Mutates an existing node attributes like position or label.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'ID of the node to update' },
      label: { type: Type.STRING },
      x: { type: Type.NUMBER },
      y: { type: Type.NUMBER },
      color: { type: Type.STRING }
    },
    required: ['id']
  }
};
