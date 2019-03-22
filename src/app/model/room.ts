import { EasyAgent, RoomAgentIn, Agent } from './agent';
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

export interface AgentInRoom extends AgentInRoomProperties {
  readonly agent: EasyAgent;
}

export interface AgentInRoomOnlyID extends AgentInRoomProperties {
  readonly externalID: string;
}

export interface AgentInRoomProperties {
  readonly role: AgentRoleInRoom;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
}

export function newAgentInRoomOnlyID(agent: AgentInRoom): AgentInRoomOnlyID {
  return {
    role: agent.role,
    createdAt: agent.createdAt,
    updatedAt: agent.updatedAt,
    deletedAt: agent.deletedAt,
    externalID: agent.agent.externalId,
  };
}

export function newAgentInRoom(agent: AgentInRoomOnlyID, agt: EasyAgent): AgentInRoom {
  return {
    role: agent.role,
    createdAt: agent.createdAt,
    updatedAt: agent.updatedAt,
    deletedAt: agent.deletedAt,
    agent: agt,
  };
}

export interface AgentsInRoom {
  readonly nextCursor: string;
  readonly agents: AgentInRoom[];
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

export interface CreateRoom {
  room: Room;
  agentInRoom: AgentInRoom;
  roomAgentIn: RoomAgentIn;
}
