import { AgentRoleInRoom, Room } from './room';

export interface Agent extends EasyAgent {
  readonly id: string;
  readonly maxOwnedRoom: number;
}

export interface EasyAgent {
  readonly name: string;
  readonly externalId: string;
  readonly description: string;
  readonly updatedAt: number;
  readonly urlImage: string;
}

export interface RoomAgentIn extends RoomAgentInProperties {
  readonly room: Room;
}

export interface RoomAgentInOnlyID extends RoomAgentInProperties {
  readonly roomId: string;
}


export function newRoomAgentInOnlyID(roomAgentInOnlyID: RoomAgentIn): RoomAgentInOnlyID {
  return {
    roomId: roomAgentInOnlyID.room.id,
    role: roomAgentInOnlyID.role,
    createdAt: roomAgentInOnlyID.createdAt,
    updatedAt: roomAgentInOnlyID.updatedAt,
  };
}

export function newRoomAgentIn(roomAgentInOnlyID: RoomAgentInOnlyID, room: Room): RoomAgentIn {
  return {
    room,
    role: roomAgentInOnlyID.role,
    createdAt: roomAgentInOnlyID.createdAt,
    updatedAt: roomAgentInOnlyID.updatedAt,
  };
}

export interface RoomAgentInProperties {
  readonly role: AgentRoleInRoom;
  readonly createdAt: number;
  readonly updatedAt: number;
}

export interface RoomsAgentIn {
  readonly nextCursor: string;
  readonly rooms: RoomAgentIn[];
}
