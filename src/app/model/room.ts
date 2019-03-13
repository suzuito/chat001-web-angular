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

export enum AgentRoleInRoom {
  Lower = 1,
  Member = 50,
  Owner = 100,
}

export interface AgentInRoom {
  readonly externalId: string;
  readonly role: AgentRoleInRoom;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
  readonly agent: EasyAgent;
}
