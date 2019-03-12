import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/model/room';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit {

  @Input()
  public room: Room;

  @Input()
  public maxLengthName: number;

  @Input()
  public maxLengthDescription: number;

  @Input()
  public done: EventEmitter<void>;

  @Output()
  public textDoneButton: string;

  constructor() {
    this.done = new EventEmitter<void>();
    this.textDoneButton = '保存する';
  }

  ngOnInit() {
  }

  public lengthName(): number {
    return this.room.name.length;
  }

  public lengthDescription(): number {
    return this.room.description.length;
  }

  public save(): void {
    this.done.emit();
  }

}
