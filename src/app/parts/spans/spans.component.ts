import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Span, SpanText, SpanURL, SpanMention, parseSpanMention, SpanMentionRoom, parseSpanMentionRoom } from 'src/app/model/span';

@Component({
  selector: 'app-spans',
  templateUrl: './spans.component.html',
  styleUrls: ['./spans.component.scss']
})
export class SpansComponent implements OnInit {

  @Input()
  public spans: Span[];

  @Output()
  public clickMention: EventEmitter<string>;

  @Output()
  public clickMentionRoom: EventEmitter<string>;

  constructor(
  ) {
    this.clickMention = new EventEmitter<string>();
    this.clickMentionRoom = new EventEmitter<string>();
  }

  ngOnInit() {
  }

  public dataSpanText(span: SpanText): string {
    return span.data;
  }

  public dataSpanURLTitle(span: SpanURL): string {
    if (!span.data.title) {
      return span.data.url;
    }
    return span.data.title;
  }

  public dataSpanURLURL(span: SpanURL): string {
    return span.data.url;
  }

  public dataSpanImageSrc(span: SpanURL): string {
    return span.data.url;
  }

  public dataSpanImageWidth(): number {
    return window.innerWidth * 0.5;
  }

  public dataSpanImageURL(span: SpanURL): string {
    return span.data.url;
  }

  public dataSpanYouTubeURLWidth(span: SpanURL): string {
    return `${window.innerWidth * 0.5}px`;
  }

  public dataSpanYouTubeURLHeight(span: SpanURL): string {
    return `${window.innerWidth * 0.5}px`;
  }

  public dataSpanMention(span: SpanMention): string {
    return span.data;
  }

  public clickMentionRaw(span: SpanMention): void {
    this.clickMention.emit(parseSpanMention(span));
  }

  public dataSpanMentionRoom(span: SpanMentionRoom): string {
    return span.data;
  }

  public clickMentionRoomRaw(span: SpanMentionRoom): void {
    this.clickMentionRoom.emit(parseSpanMentionRoom(span));
  }

}
