export interface MessageVersion {
  content: string;
  timestamp: number;
  model?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  model?: string;
  imageUrl?: string;
  fileData?: {
    name: string;
    url: string;
    type: string;
  };
  isEdited?: boolean;
  editedAt?: number;
  versions?: MessageVersion[];
  currentVersionIndex?: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  lastUpdated: number;
}

export type AIModel = 
// Daily-Dose
  | 'GPT-4.1'
  | 'GPT 4o'
  | 'GPT-5 mini'
  | 'Grok Code Fast 1'

// Power-Ball
  | 'Claude Opus 4(x10)'
  | 'Claude Opus 4.1(x10)'
  | 'Claude Sonnet 3.5(x1)'
  | 'Claude Sonnet 3.7(x1)'
  | 'Claude Sonnet 3.7 Thinking(x1.25)'
  | 'Claude Sonnet 4(x1)'
  | 'Gemini 2.0 Flash(x0.25)'
  | 'Gemini 2.5 Pro(x1)'
  | 'GPT-5(x1)'
  | 'o3(x1)';

export interface ChatState {
  currentChatId: string | null;
  selectedModel: AIModel;
  isLoading: boolean;
}