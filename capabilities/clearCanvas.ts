
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityClearCanvas: AppCapability = {
  id: 'clearCanvas',
  name: 'Clear Canvas',
  description: 'Wipes the entire workspace, removing all nodes and edges.',
  isExposedToLLM: true,
  parameters: { type: Type.OBJECT, properties: {} }
};
