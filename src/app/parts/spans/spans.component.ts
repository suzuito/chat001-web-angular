import { Component, OnInit, Input } from '@angular/core';
import { Span, SpanText, SpanURL } from 'src/app/model/span';

@Component({
  selector: 'app-spans',
  templateUrl: './spans.component.html',
  styleUrls: ['./spans.component.scss']
})
export class SpansComponent implements OnInit {

  @Input()
  public spans: Span[];

  constructor() { }

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

}
