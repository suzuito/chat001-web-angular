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
