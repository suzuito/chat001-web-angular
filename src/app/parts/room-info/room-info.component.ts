import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Room } from 'src/app/model/room';

export interface RoomInfo {
  name: string;
  description: string;
  password: boolean;
  passwordRaw: string;
}

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit, OnChanges {

  @Input()
  public room: Room;

  @Input()
  public maxLengthName: number;

  @Input()
  public maxLengthDescription: number;

  @Output()
  public done: EventEmitter<RoomInfo>;

  @Input()
  public textDoneButton: string;

  @Input()
  public changable: boolean;

  public name: string;
  public description: string;
  public password: boolean;
  public passwordRaw: string;
  private initialized: boolean;

  constructor() {
    this.done = new EventEmitter<RoomInfo>();
    this.textDoneButton = '保存する';
    this.name = '';
    this.description = '';
    this.passwordRaw = '';
    this.password = false;
    this.initialized = false;
    this.changable = false;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.room) {
      if (!this.initialized) {
        this.room = changes.room.currentValue as Room;
        this.name = this.room.name;
        this.description = this.room.description;
        this.password = this.room.password;
        this.passwordRaw = '';
        this.initialized = true;
      }
    }
  }

  public lengthName(): number {
    return this.name.length;
  }

  public lengthDescription(): number {
    return this.description.length;
  }

  public isChanged(): boolean {
    if (this.name !== this.room.name) {
      return true;
    }
    if (this.description !== this.room.description) {
      return true;
    }
    if (this.password !== this.room.password) {
      return true;
    }
    if (this.passwordRaw !== '') {
      return true;
    }
    return false;
  }

  public save(): void {
    this.done.emit({
      name: this.name,
      description: this.description,
      password: this.password,
      passwordRaw: this.passwordRaw,
    });
  }

}
