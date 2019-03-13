import { EasyAgent } from './agent';

export enum RoomStatus {
  Deactivate = 1,
  Active = 2,
  ReadOnly = 3,
}

export interface Room {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly maxAgents: number;
  readonly status: RoomStatus;
  readonly public: boolean;
  readonly fixed: boolean;
  readonly agents: number;
  readonly password: boolean;
  readonly createdAt: number;
}

export interface AgentInRoom {
  readonly agent: EasyAgent;
  readonly externalId: string;
  readonly role: number;
  readonly createdAt: number;
  readonly updatedAt: number;
}
