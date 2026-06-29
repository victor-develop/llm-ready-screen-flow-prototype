
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityGetCanvasState: AppCapability = {
  id: 'getCanvasState',
  name: 'Get Canvas State',
  description: 'Retrieves the full current snapshot of nodes and edges, including their unique IDs.',
  isExposedToLLM: true,
  parameters: { type: Type.OBJECT, properties: {} }
};
