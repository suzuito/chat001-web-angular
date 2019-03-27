

export enum LineType {
  Spans = 1,
}

export enum SpanType {
  Text = 1,
  URL = 2,
  Agent = 3,
  RoomEntrance = 4,
  LineBreak = 5,
  RequestApprove = 6,
}

export interface Span {
  readonly type: SpanType;
  readonly data: any;
}

export interface Line {
  readonly type: LineType;
  readonly data: any;
}

export interface AgentMessage {
  readonly id: string;
  readonly lines: Line[];
  readonly createdAt: number;
  readonly read: boolean;
  readonly type: number;
}

export interface AgentMessages {
  readonly nextCursor: string;
  readonly messages: AgentMessage[];
}
