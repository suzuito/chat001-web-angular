import { Line, LineType } from './line';
import { AgentMessage } from './agent_message';
import { SpanType, parseSpanMention } from './span';

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
  readonly lines: Line[];
  readonly agentExternalId: string;
  readonly type: MessageType;
  readonly createdAt: number;
  readonly extra: any;
}

export function isYourMention(msg: Message, yourName: string): boolean {
  if (msg.type !== MessageType.Message) {
    return false;
  }
  const result = msg.lines.find(l => {
    if (l.type !== LineType.Spans) {
      return false;
    }
    const spans: any[] = l.obj;
    const result2 = spans.find(s => {
      if (s.type !== SpanType.Mention) {
        return false;
      }
      const name = parseSpanMention(s);
      if (name !== 'all' && name !== yourName) {
        return false;
      }
      return true;
    });
    if (result2) { return true; }
    return false;
  });
  if (result) {
    return true;
  }
  return false;
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

export function attachObjectToAgentMessage(...msgs: AgentMessage[]): void {
  msgs.forEach((msg: AgentMessage) => {
    msg.lines.forEach((line: Line) => {
      line.obj = JSON.parse(line.data);
    });
  });
}
