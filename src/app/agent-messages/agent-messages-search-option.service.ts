import { Injectable } from '@angular/core';

export interface AgentMessagesSearchOption {
  txtWord: string;
  chkUnread: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AgentMessagesSearchOptionService implements AgentMessagesSearchOption {

  public txtWord: string;
  public chkUnread: boolean;

  constructor() {
    this.txtWord = '';
    this.chkUnread = true;

    // setInterval(() => { console.log(this); }, 1000); // debug
  }
}
