import { Injectable } from '@angular/core';

export enum OrderId {
  Newed = 0,
  Boost,
}

export function orderIdToQuery(id: OrderId): string {
  switch (id) {
    case OrderId.Newed:
      return '1';
  }
}

export interface Order {
  id: OrderId;
  name: string;
}

export interface RoomsSearchOption {
  txtWord: string;
  members: number;
  chkUnlocked: boolean;
  chkCanEnter: boolean;
  chkMembers: boolean;
  selectedOrderId: OrderId;
}

export const RoomSearchOptionNull: RoomsSearchOption = {
  txtWord: '',
  members: 0,
  chkCanEnter: false,
  chkUnlocked: false,
  chkMembers: false,
  selectedOrderId: OrderId.Newed,
};

@Injectable({
  providedIn: 'root'
})
export class RoomsSearchOptionService implements RoomsSearchOption {

  public txtWord: string;
  public members: number;

  public chkUnlocked: boolean;
  public chkCanEnter: boolean;
  public chkMembers: boolean;

  public selectOrder: Order[];
  public selectedOrderId: OrderId;

  constructor() {
    this.selectOrder = [
      { id: OrderId.Newed, name: '新着順' },
      // { id: OrderId.Popular, name: '人気順' },
      // { id: OrderId.Entrant, name: '入室者順' },
    ];
    this.selectedOrderId = this.selectOrder[0].id;
    this.chkCanEnter = false;
    this.chkUnlocked = false;
    this.chkMembers = false;
    this.members = 2;

    // setInterval(() => { console.log(this); }, 1000); // debug
  }
}
