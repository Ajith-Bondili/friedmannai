export enum MessageType {
  USER = "user",
  AI = "ai",
  AI_FOLLOWUP = "ai_followup",
}

export interface ChatMessage {
  id: string
  content: string
  type: MessageType
  timestamp: string
}

