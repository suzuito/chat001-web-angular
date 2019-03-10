

export enum LineType {
  Text = 1,
  URL = 2,
}

export interface Line {
  type: LineType;
  body: any;
}

export interface AgentMessage {
  id: string;
  lines: Line[];
  createdAt: number;
  read: boolean;
}
