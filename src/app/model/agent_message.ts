

export enum LineType {
  Text = 1,
  URL = 2,
}

export interface Line {
  readonly type: LineType;
  readonly body: any;
}

export interface AgentMessage {
  readonly id: string;
  readonly lines: Line[];
  readonly createdAt: number;
  readonly read: boolean;
}

export interface AgentMessages {
  readonly nextCursor: string;
  readonly messages: AgentMessage[];
}