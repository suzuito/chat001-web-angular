import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Croppie, { CroppieOptions, ResultOptions } from 'croppie';
import { blobToFile, fileToSrcURL } from '../util/image';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss']
})
export class ExamplesComponent implements AfterViewInit {

  @ViewChild('box')
  private box: ElementRef;

  public c: Croppie;

  public srcResult: string | ArrayBuffer;

  constructor() { }

  ngAfterViewInit() {
    this.c = new Croppie(this.box.nativeElement, {
      viewport: { width: 100, height: 100, type: 'square' },
      enableZoom: true,
      enableResize: false,
      mouseWheelZoom: false,
    });
    this.c.bind({ url: 'assets/example.jpg', points: [0, 0, 200, 200] });
  }

  public async crop() {
    const result = await this.c.result({
      type: 'blob',
      format: 'jpeg',
    });
    this.srcResult = await fileToSrcURL(blobToFile(result, 'a'));
  }

}
