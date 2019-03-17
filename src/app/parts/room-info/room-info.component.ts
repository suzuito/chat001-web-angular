import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Room, emptyRoom } from 'src/app/model/room';
import { randomRoomName, randomRoomDescription } from 'src/app/util';

export interface RoomInfo {
  name: string;
  description: string;
  password: boolean;
  passwordRaw: string;
  maxAgents: number;
  public: boolean;
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

  public info: RoomInfo;
  public maxMaxAgents: number;
  public readonly recomendMaxAgents: number[];
  public readonly allMaxAgents: number[];
  public selectedMaxAgents: number;

  private initialized: boolean;

  constructor() {
    this.maxMaxAgents = 100;
    this.done = new EventEmitter<RoomInfo>();
    this.textDoneButton = '保存する';
    this.info = {
      name: '',
      description: '',
      passwordRaw: '',
      password: false,
      maxAgents: 10,
      public: true,
    };
    this.initialized = false;
    this.changable = false;
    this.recomendMaxAgents = [
      2, 3, 4,
    ];
    this.allMaxAgents = [];
    for (let i = 5; i < this.maxMaxAgents + 1; i++) {
      this.allMaxAgents.push(i);
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.room) {
      const isRoomNull = !changes.room.currentValue;
      let room: Room = changes.room.currentValue;
      if (isRoomNull) {
        room = emptyRoom(
          '',
          '',
          '',
          2,
        );
      }
      if (!this.initialized) {
        this.room = room;
        this.info.name = this.room.name;
        this.info.description = this.room.description;
        this.info.password = this.room.password;
        this.info.maxAgents = this.room.maxAgents;
        this.info.passwordRaw = '';
        this.info.public = this.room.public;
        this.initialized = true;
        this.selectedMaxAgents = this.info.maxAgents;
      }
      if (isRoomNull) {
        this.info.name = randomRoomName();
        this.info.description = randomRoomDescription();
      }
    }
  }

  public lengthName(): number {
    return this.info.name.length;
  }

  public lengthDescription(): number {
    return this.info.description.length;
  }

  public renameAtRandom(): void {
    this.info.name = randomRoomName();
  }

  public redescriptionAtRandom(): void {
    this.info.description = randomRoomDescription();
  }

  public changeMaxAgentsSelector(): void {
    this.info.maxAgents = this.selectedMaxAgents;
  }

  public isChanged(): boolean {
    return this.info.name !== this.room.name
      || this.info.description !== this.room.description
      || this.info.password !== this.room.password
      || this.info.passwordRaw !== ''
      || this.info.public !== this.room.public
      || this.info.maxAgents !== this.room.maxAgents
      ;
  }

  public save(): void {
    this.done.emit(this.info);
  }

}
