import { EasyAgent, RoomAgentIn } from './agent';
import { Message } from './room_message';
import { AgentInRoom } from './room';

// WSMessage ...
export interface WSMessage {
  type: string;
  id: string;
  data: any;
}

// WSRoomMessage ...
export interface WSRoomMessage {
  readonly roomAgentIds: string[];
  readonly message: Message;
  readonly agent: AgentInRoom;
  readonly room: RoomAgentIn;
}
