import { Injectable } from '@angular/core';

export enum OrderId {
  Updated = 0,
  Accessed,
}

export interface AgentsSearchOption {
  txtWord: string;
  selectedOrderId: OrderId;
}

@Injectable({
  providedIn: 'root'
})
export class AgentsSearchOptionService implements AgentsSearchOption {

  public txtWord: string;
  public selectedOrderId: OrderId;

  constructor(
  ) {
    this.txtWord = '';
    this.selectedOrderId = OrderId.Updated;
  }
}
