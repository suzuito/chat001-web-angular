import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Init, RoomMessageImageLink } from './model/other';
import { Rooms, Room, EnterRoom, ExitRoom, AgentInRoom, CreateRoom, AgentsInRoom } from './model/room';
import { RoomAgentIn, EasyAgent, Agent } from './model/agent';
import { RoomMessage, Messages, attachObjectToMessage, attachObjectToAgentMessage } from './model/room_message';
import { AgentMessages } from './model/agent_message';

class OptBuilder {
  private o: any;
  constructor() {
    this.o = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
      withCredentials: true,
    };
  }
  public header(k: string, v: string): OptBuilder {
    this.o.headers = this.o.headers.set(k, v);
    return this;
  }
  public nextCursor(v: string): OptBuilder {
    if (!v) { return this; }
    this.header('X-Next-Cursor', v);
    return this;
  }
  public atoken(v: string): OptBuilder {
    this.header('Chat001-Agent', v);
    return this;
  }
  public auth(v: string): OptBuilder {
    this.header('X-App-Auth', v);
    return this;
  }
  public param(k: string, v: string): OptBuilder {
    this.o.params = this.o.params.set(k, v);
    return this;
  }
  public limits(l: number): OptBuilder {
    if (l > 0) {
      this.o.params = this.o.params.set('limits', l);
    }
    return this;
  }
  public jsonResponseBody(): OptBuilder {
    this.o.responseType = 'json';
    return this;
  }
  public textResponseBody(): OptBuilder {
    this.o.responseType = 'text';
    return this;
  }
  public fullResponse(): OptBuilder {
    this.o.observe = 'response';
    return this;
  }
  public gen(): any {
    return this.o;
  }
}

function url(
  path: string,
): string {
  return `${environment.api.protocol}://${environment.api.hostname}:${environment.api.port}${path}`;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) { }

  public async getInit(atoken: string): Promise<Init> {
    return this.http.get<Init>(
      url(`/init`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getEasyAgent(atoken: string, externalId: string): Promise<EasyAgent> {
    return this.http.get<EasyAgent>(
      url(`/api/agents/externals/${externalId}`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getRooms(atoken: string, nextCursor: string = '', limits: number = -1, order: string = '1'): Promise<Rooms> {
    return this.http.get<Rooms>(
      url('/api/rooms'),
      new OptBuilder().atoken(atoken).jsonResponseBody().nextCursor(nextCursor).limits(limits).param('order', order).gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getRoomByID(atoken: string, roomId: string): Promise<Room> {
    return this.http.get<Room>(
      url(`/api/rooms/${roomId}`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getAgentRoomByID(atoken: string, roomId: string): Promise<RoomAgentIn> {
    return this.http.get<RoomAgentIn>(
      url(`/api/agents/rooms/${roomId}`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async putEnterRoom(atoken: string, roomId: string, password: string = ''): Promise<EnterRoom> {
    return this.http.put<EnterRoom>(
      url(`/api/rooms/${roomId}/enter`),
      { password },
      new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async putExitRoom(atoken: string, roomId: string): Promise<ExitRoom> {
    return this.http.put<ExitRoom>(
      url(`/api/rooms/${roomId}/exit`), null, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async putRoomsMessages(atoken: string, roomId: string, body: string): Promise<RoomMessage> {
    return this.http.put<RoomMessage>(
      url(`/api/rooms/${roomId}/messages`), body, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getRoomMember(atoken: string, roomId: string, externalId: string): Promise<AgentInRoom> {
    return this.http.get<AgentInRoom>(
      url(`/api/rooms/${roomId}/members/${externalId}`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getRoomMembers(atoken: string, roomId: string, nextCursor: string = '', limits: number = -1): Promise<AgentsInRoom> {
    return this.http.get<AgentsInRoom>(
      url(`/api/rooms/${roomId}/members`),
      new OptBuilder().atoken(atoken).jsonResponseBody().nextCursor(nextCursor).limits(limits).gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getRoomMessages(atoken: string, roomId: string, nextCursor: string = '', limits: number = -1): Promise<Messages> {
    return this.http.get<Messages>(
      url(`/api/rooms/${roomId}/messages`), new OptBuilder().atoken(atoken).jsonResponseBody().nextCursor(nextCursor).limits(limits).gen(),
    ).toPromise().then((res: any) => {
      attachObjectToMessage(...res.messages);
      return res;
    });
  }

  public async putAgents(atoken: string, name: string, description: string, isPublic: boolean): Promise<Agent> {
    return this.http.put<Agent>(
      url(`/api/agents`), JSON.stringify({
        name, description, isPublic,
      }), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async postRooms(
    atoken: string,
    name: string,
    description: string,
    maxAgents: number,
    isPublic: boolean,
    passwordRaw: string,
  ): Promise<CreateRoom> {
    return this.http.post<CreateRoom>(
      url(`/api/rooms`),
      {
        name,
        description,
        maxAgents,
        isPublic,
        password: passwordRaw,
      },
      new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async postRoomByIDIntroduction(atoken: string, roomId: string, externalIds: string[]): Promise<void> {
    return this.http.post<void>(
      url(`/api/rooms/${roomId}/introduction`),
      {
        roomId,
        agents: externalIds,
      },
      new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getAgentsMessages(atoken: string, nextCursor: string = '', limits: number = -1): Promise<AgentMessages> {
    return this.http.get<AgentMessages>(
      url(`/api/agents/messages`), new OptBuilder().atoken(atoken).jsonResponseBody().nextCursor(nextCursor).limits(limits).gen(),
    ).toPromise().then((res: any) => {
      attachObjectToAgentMessage(...res.messages);
      return res;
    });
  }

  public async putAgentsAvatar(atoken: string, f: File): Promise<Agent> {
    return this.http.put<Agent>(
      url(`/api/agents/avatar`), f, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async postRequests(atoken: string, externalId: string, body: string): Promise<void> {
    return this.http.post<void>(
      url(`/api/requests`), JSON.stringify({
        externalId, body,
      }), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async postRequestsApprove(atoken: string, reqId: string): Promise<void> {
    return this.http.post<void>(
      url(`/api/requests/${reqId}/approve`),
      null,
      new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async postRoomsMessagesImage(atoken: string, roomId: string, f: File): Promise<RoomMessageImageLink> {
    return this.http.post<RoomMessageImageLink>(
      url(`/api/rooms/${roomId}/messages/image`), f, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

}
