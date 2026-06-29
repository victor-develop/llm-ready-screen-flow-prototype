
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityDeleteNode: AppCapability = {
  id: 'deleteNode',
  name: 'Delete Node',
  description: 'Removes a specific node and its associated connections.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'ID of the node to delete' }
    },
    required: ['id']
  }
};
