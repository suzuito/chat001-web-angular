import {
  Component,
  OnInit, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges
} from '@angular/core';
import * as Croppie from 'croppie';
import { ProfileImageSize, getProfileImageSizePx } from '../parts/profile-img/profile-img.component';
import { MatSliderChange } from '@angular/material';
import { fileToSrcURL, blobToFile } from '../util/image';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-image-cripper',
  templateUrl: './image-cripper.component.html',
  styleUrls: ['./image-cripper.component.scss']
})
export class ImageCripperComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('cripper')
  private cripper: ElementRef;

  @Input()
  public width: string;

  @Input()
  public height: string;

  @Input()
  public src: string;

  @Output()
  public result: EventEmitter<Blob>;

  public zoom: number;

  public c: Croppie;

  constructor(
  ) {
    this.width = '300px';
    this.height = '300px';
    this.zoom = 0.5;
    this.result = new EventEmitter<Blob>();
    this.src = 'assets/example.jpg';
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  ngAfterViewInit() {
    const len = getProfileImageSizePx(ProfileImageSize.Medium);
    this.c = new Croppie(this.cripper.nativeElement, {
      viewport: { width: len, height: len, type: 'square' },
      enableZoom: true,
      showZoomer: false,
      // enableResize: false,
      mouseWheelZoom: false,
    });
    this.refresh();
  }

  public setSrc(src: string): void {
    this.src = src;
    this.zoom = 0.5;
    this.refresh();
  }

  private refresh(): void {
    this.c.bind({ url: this.src, points: [0, 0, 200, 200] });
    this.c.setZoom(this.zoom);
  }

  public changeSlider(change: MatSliderChange): void {
    this.c.setZoom(change.value);
  }

  public async ok(): Promise<void> {
    const result = await this.c.result({
      type: 'blob',
      format: 'jpeg',
    });
    this.result.emit(result);
  }

}
