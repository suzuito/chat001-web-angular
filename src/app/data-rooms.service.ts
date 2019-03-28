import { Injectable } from '@angular/core';
import { DataStore } from './data.store';
import { Room } from './model/room';
import { RoomsSearchOption, OrderId } from './rooms/rooms-search-option/rooms-search-option.service';

@Injectable({
  providedIn: 'root'
})
export class DataRoomsService extends DataStore<Room> {

  constructor() {
    super();
  }

  public setRoom(...rooms: Room[]): void {
    rooms.forEach((v) => this.set(v.id, v));
  }

  public filter(opt: RoomsSearchOption, includePrivate: boolean): Room[] {
    return this.find((room: Room): boolean => {
      if (!includePrivate) {
        if (!room.public) {
          return false;
        }
      }
      if (opt.txtWord) {
        if (new RegExp(opt.txtWord).test(room.name) === false) {
          return false;
        }
      }
      if (opt.chkCanEnter) {
        if (room.agents >= room.maxAgents) {
          return false;
        }
      }
      if (opt.chkUnlocked) {
        if (room.password) {
          return false;
        }
      }
      if (opt.chkMembers) {
        if (room.agents < opt.members) {
          return false;
        }
      }
      return true;
    }).sort((a: Room, b: Room): number => {
      switch (opt.selectedOrderId) {
        case OrderId.Newed:
          return b.createdAt - a.createdAt;
        // case RoomOrderId.Entrant:
        //   return b.agents - a.agents;
        case OrderId.Boost:
          return b.agents - a.agents;
      }
      return b.createdAt - a.createdAt;
    });
  }

}
