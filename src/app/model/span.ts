export enum SpanType {
  Text = 1,
  URL = 2,
}

export interface Link {
  readonly title: string;
  readonly url: string;
}

export interface Span {
  readonly type: SpanType;
}

export interface SpanText {
  readonly data: string;
}

export interface SpanURL {
  readonly data: Link;
}

export interface SpanMention {
  readonly data: string;
}

export function parseSpanMention(m: SpanMention) {
  return m.data.substring(1);
}

export interface SpanMentionRoom {
  readonly data: string;
}

export function parseSpanMentionRoom(m: SpanMentionRoom) {
  return m.data.substring(2);
}
