import { AgentRoleInRoom, Room } from './room';

export interface Agent extends EasyAgent {
  readonly id: string;
  readonly maxOwnedRoom: number;
}

export interface TemporaryAgent extends EasyAgent {
  readonly id: string;
}

export interface EasyAgent {
  readonly name: string;
  readonly color: string;
  readonly description: string;
  readonly updatedAt: number;
  readonly urlImage: string;
}

export interface RoomAgentIn {
  readonly room: Room;
  readonly externalId: string;
  readonly role: AgentRoleInRoom;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface RoomsAgentIn {
  readonly nextCursor: string;
  readonly rooms: RoomAgentIn[];
}
