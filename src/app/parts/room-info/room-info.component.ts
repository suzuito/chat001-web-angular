import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Room, emptyRoom } from 'src/app/model/room';
import { randomRoomName, randomRoomDescription } from 'src/app/util';
import { ErrorStateMatcher } from '@angular/material';

export interface RoomInfo {
  name: string;
  description: string;
  password: boolean;
  passwordRaw: string;
  maxAgents: number;
  public: boolean;
}

const maxLengthName = 16;
const maxLengthDescription = 100;
const maxLengthPassword = 20;
const minLengthPassword = 4;

export function validRoomInfoName(ri: RoomInfo): Error {
  if (ri.name.length <= 0) {
    return new Error('名前を入力してください');
  }
  if (ri.name.length > maxLengthName) {
    return new Error(`名前が長すぎます(最大${maxLengthName}文字)`);
  }
  return null;
}

export function validRoomInfoDescription(ri: RoomInfo): Error {
  if (ri.description.length <= 0) {
    return new Error('説明を入力してください');
  }
  if (ri.description.length > maxLengthDescription) {
    return new Error(`説明が長すぎます(最大${maxLengthDescription}文字)`);
  }
  return null;
}

export function validRoomInfoPassword(ri: RoomInfo): Error {
  if (ri.passwordRaw.length <= 0) {
    return new Error('パスワードを入力してください');
  }
  if (ri.passwordRaw.length < minLengthPassword) {
    return new Error(`パスワードが短すぎます(最小${minLengthPassword}文字)`);
  }
  if (ri.passwordRaw.length > maxLengthPassword) {
    return new Error(`パスワードが長すぎます(最大${maxLengthDescription}文字)`);
  }
  if (new RegExp(`\\s+`).test(ri.passwordRaw)) {
    return new Error(`パスワードに空白文字を使ってはいけません`);
  }
  if (!new RegExp(`^[\x21-\x7e]+$`).test(ri.passwordRaw)) {
    return new Error(`パスワードに英数字と記号以外の文字を使ってはいけません`);
  }
  return null;
}

class ErrorStateMatcherPassword implements ErrorStateMatcher {
  constructor(private roomInfo: RoomInfo) { }
  public isErrorState(): boolean {
    return validRoomInfoPassword(this.roomInfo) !== null;
  }
}

@Component({
  selector: 'app-room-info',
  templateUrl: './room-info.component.html',
  styleUrls: ['./room-info.component.scss']
})
export class RoomInfoComponent implements OnInit, OnChanges {

  @Input()
  public room: Room;

  public get maxLengthName(): number {
    return maxLengthName;
  }

  public get maxLengthDescription(): number {
    return maxLengthDescription;
  }

  public get maxLengthPassword(): number {
    return maxLengthPassword;
  }

  public get minLengthPassword(): number {
    return minLengthPassword;
  }

  @Output()
  public done: EventEmitter<RoomInfo>;

  @Input()
  public textDoneButton: string;

  @Input()
  public changable: boolean;

  public hidePassword: boolean;

  public info: RoomInfo;
  public maxMaxAgents: number;
  public readonly recomendMaxAgents: number[];
  public readonly allMaxAgents: number[];
  public selectedMaxAgents: number;

  private initialized: boolean;
  public errorStateMatcherPassword: ErrorStateMatcherPassword;

  constructor() {
    this.maxMaxAgents = 100;
    this.hidePassword = true;
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
    this.errorStateMatcherPassword = new ErrorStateMatcherPassword(this.info);
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

  private isChanged(): boolean {
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

  public hintLabelName(): string {
    return `最大${this.maxLengthName}文字`;
  }

  public hintName(): string {
    return `${this.info.name.length} / ${this.maxLengthName}`;
  }

  public placeholderName(): string {
    const err = validRoomInfoName(this.info);
    if (!err) {
      return '名前';
    }
    return err.message;
  }

  public colorName(): string {
    const err = validRoomInfoName(this.info);
    if (!err) {
      return 'primary';
    }
    return 'warn';
  }

  public hintLabelDescription(): string {
    return `最大${this.maxLengthDescription}文字`;
  }

  public hintDescription(): string {
    return `${this.info.description.length} / ${this.maxLengthDescription}`;
  }

  public placeholderDescription(): string {
    const err = validRoomInfoDescription(this.info);
    if (!err) {
      return '部屋の説明';
    }
    return err.message;
  }

  public colorDescription(): string {
    const err = validRoomInfoDescription(this.info);
    if (!err) {
      return 'primary';
    }
    return 'warn';
  }

  public hintLabelPassword(): string {
    return `最大${this.maxLengthPassword}文字`;
  }

  public hintPassword(): string {
    return `${this.info.passwordRaw.length} / ${this.maxLengthPassword}`;
  }

  public placeholderPassword(): string {
    return 'パスワード';
  }

  public colorPassword(): string {
    const err = validRoomInfoPassword(this.info);
    if (!err) {
      return 'primary';
    }
    return 'warn';
  }

  public errorPassword(): string {
    const err = validRoomInfoPassword(this.info);
    if (!err) {
      return '不明なエラー';
    }
    return err.message;
  }

  public disableOK(): boolean {
    if (!this.isChanged) {
      return true;
    }
    if (this.info.password && validRoomInfoPassword(this.info) !== null) {
      return true;
    }
    return validRoomInfoName(this.info) !== null
      || validRoomInfoDescription(this.info) !== null;
  }

}
