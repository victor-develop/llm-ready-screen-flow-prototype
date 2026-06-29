
export interface AppCapability {
  id: string;
  name: string;
  description: string;
  isExposedToLLM: boolean;
  parameters: any;
}

export interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'process' | 'decision' | 'start' | 'end' | 'ux' | 'track';
  componentType?: string;
  componentProps?: any;
  color?: string;
  trackId?: string;
  slot?: number;
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isThought?: boolean;
}
