import { Line } from './line';

export interface AgentMessage {
  readonly id: string;
  readonly lines: Line[];
  readonly createdAt: number;
  readonly read: boolean;
  readonly type: number;
}

export interface AgentMessages {
  readonly nextCursor: string;
  readonly messages: AgentMessage[];
}

export interface WSAgentMessage {
  readonly message: AgentMessage;
  readonly unreadMessages: number;
  readonly messages: number;
}
