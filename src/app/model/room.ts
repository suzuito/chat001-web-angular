import { EasyAgent } from './agent';

export enum RoomStatus {
  Deactivate = 1,
  Active = 2,
  ReadOnly = 3,
}

export interface Room {
  id: string;
  name: string;
  description: string;
  maxAgents: number;
  status: RoomStatus;
  public: boolean;
  fixed: boolean;
  agents: number;
  password: boolean;
  createdAt: number;
}

export interface AgentInRoom {
  agent: EasyAgent;
  externalId: string;
  role: number;
  createdAt: number;
  updatedAt: number;
  postedAt: number;
  accessedAt: number;
  order: number;
}
