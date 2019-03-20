import { EasyAgent, RoomAgentIn } from './agent';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { RoomMessage } from './room_message';

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

export function emptyRoom(
  id: string,
  name: string, description: string,
  maxAgents: number,
): Room {
  return {
    id,
    name,
    description,
    maxAgents,
    status: RoomStatus.Active,
    public: true,
    fixed: false,
    agents: 0,
    password: false,
    createdAt: 0,
  };
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

export interface Rooms {
  readonly nextCursor: string;
  readonly rooms: Room[];
}

export interface EnterRoom {
  room: Room;
  agentInRoom: AgentInRoom;
  roomAgentIn: RoomAgentIn;
  message: RoomMessage;
}

export interface ExitRoom {
  room: Room;
  agentInRoom: AgentInRoom;
  roomAgentIn: RoomAgentIn;
  message: RoomMessage;
}
