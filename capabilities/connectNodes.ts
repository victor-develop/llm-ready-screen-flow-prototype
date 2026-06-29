
import { Type } from "@google/genai";
import { AppCapability } from "../types";

export const CapabilityConnectNodes: AppCapability = {
  id: 'connectNodes',
  name: 'Connect Nodes',
  description: 'Creates a directed arrow between two existing nodes using their IDs.',
  isExposedToLLM: true,
  parameters: {
    type: Type.OBJECT,
    properties: {
      sourceId: { type: Type.STRING, description: 'Starting node ID' },
      targetId: { type: Type.STRING, description: 'Ending node ID' },
      label: { type: Type.STRING, description: 'Optional label for the edge' }
    },
    required: ['sourceId', 'targetId']
  }
};
