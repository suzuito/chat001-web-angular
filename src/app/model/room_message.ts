export enum MessageType {
  Message = 1,
  EnterRoom = 2,
  ExitRoom = 3,
  UpdateAgent = 4,
  URL = 5,
  Image = 100,
  Audio = 200,
  Video = 300,
  YouTube = 400,
  UpdateRole = 500,
}

export interface Message {
  readonly id: string;
  readonly body: string;
  readonly agentName: string;
  readonly agentExternalId: string;
  readonly agentColor: string;
  readonly type: MessageType;
  readonly createdAt: number;
  readonly extra: any;
}

export interface RoomMessage {
  readonly roomId: string;
  readonly message: Message;
}

export interface Messages {
  readonly nextCursor: string;
  readonly messages: Message[];
}
