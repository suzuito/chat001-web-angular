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

export enum LineType { }

export interface Line {
  readonly type: LineType;
  readonly data: string;
  obj: any;
}

export interface Message {
  readonly id: string;
  readonly lines: Line[];
  readonly agentExternalId: string;
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

export function attachObjectToMessage(...msgs: Message[]): void {
  msgs.forEach((msg: Message) => {
    msg.lines.forEach((line: Line) => {
      line.obj = JSON.parse(line.data);
    });
  });
}
