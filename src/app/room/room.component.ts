import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../data.service';
import { Room } from '../model/room';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @Input()
  public room: Room;

  @ViewChild('rowLeft')
  public domLeft: ElementRef;

  @ViewChild('rowCenter')
  public domCenter: ElementRef;

  @ViewChild('rowRight')
  public domRight: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
  ) { }

  ngOnInit(
  ) {
    this.route.params.subscribe((params: Params) => {
      this.room = this.dataService.getRoomRaw(params.roomId);
    });
  }

  public switchToLeft(): void {
    this.domLeft.nativeElement.style.left = '0%';
    this.domCenter.nativeElement.style.left = '100%';
    this.domRight.nativeElement.style.left = '200%';
  }

  public switchToCenter(): void {
    this.domLeft.nativeElement.style.left = '-100%';
    this.domCenter.nativeElement.style.left = '0%';
    this.domRight.nativeElement.style.left = '100%';
  }

  public switchToRight(): void {
    this.domLeft.nativeElement.style.left = '-200%';
    this.domCenter.nativeElement.style.left = '-100%';
    this.domRight.nativeElement.style.left = '0%';
  }

}
