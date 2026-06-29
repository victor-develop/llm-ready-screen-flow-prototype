
import { Type } from "@google/genai";
import { AppCapability } from "../types";
import { UX_COMPONENT_KEYS } from "../components/ux/registry";

export const CapabilityUpdateComponentType: AppCapability = {
  id: 'updateComponentType',
  name: 'Update Component Type',
  description: 'Changes the underlying UX component rendered by a specific UX node.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.STRING, description: 'ID of the node to update' },
      componentType: { 
        type: Type.STRING, 
        enum: UX_COMPONENT_KEYS, 
        description: 'The new UX component type to render' 
      }
    },
    required: ['id', 'componentType']
  }
};
