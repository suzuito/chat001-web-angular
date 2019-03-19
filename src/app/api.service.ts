import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Init } from './model/other';
import { Rooms, Room, EnterRoom } from './model/room';
import { RoomAgentIn } from './model/agent';

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

  public async getNull(atoken: string): Promise<Init> {
    return this.http.get<Init>(
      url(`/init`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
    ).toPromise().then((res: any) => res);
  }

  public async getRooms(atoken: string, nextCursor: string = '', limits: number = -1, order: string = '1'): Promise<Rooms> {
    let p = `/api/rooms`;
    const builder = new OptBuilder();
    builder.atoken(atoken).jsonResponseBody();
    if (nextCursor !== '') {
      builder.nextCursor(nextCursor);
    }
    if (limits !== -1) {
      p += `?limits=${limits}&order=${order}`;
    }
    return this.http.get<Rooms>(
      url(p), builder.gen(),
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

  /*
      public putRequests(atoken: string, roomId: string, name: string, color: string): Promise<void> {
        const agent = { name: name, color: color } as EasyAgent;
        return this.http.put<void>(
          url(`/api/rooms/${roomId}/requests`), JSON.stringify(agent), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getRoomByID(atoken: string, roomId: string): Promise<Room> {
        return this.http.get<Room>(
          url(`/api/rooms/${roomId}`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getRoomByIDAccess(atoken: string, roomId: string): Promise<RoomAccess> {
        return this.http.get<RoomAccess>(
          url(`/api/rooms/${roomId}/access`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getRoomByIDAgentIn(atoken: string, roomId: string): Promise<RoomAgentIn> {
        return this.http.get<RoomAgentIn>(
          url(`/api/rooms/${roomId}/agentin`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public putRoomsExitByID(atoken: string): Promise<DataExitRoom> {
        return this.http.put<DataExitRoom>(
          url(`/api/exit-room`), null, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async putRoomsMessages(atoken: string, roomId: string, body: string): Promise<Message> {
        return this.http.put<Message>(
          url(`/api/rooms/${roomId}/messages`), body, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public putAgents(atoken: string, agent: EasyAgent): Promise<APIResponseNull> {
        return this.http.put<APIResponseNull>(
          url(`/api/agents`), JSON.stringify(agent), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public getRoomMessages(atoken: string, roomId: string, nextCursor: string = '', limits: number = -1): Promise<Messages> {
        let p = `/api/rooms/${roomId}/messages`;
        const builder = new OptBuilder();
        builder.atoken(atoken).jsonResponseBody();
        if (nextCursor !== '') {
          builder.nextCursor(nextCursor);
        }
        if (limits !== -1) {
          p += `?limits=${limits}`;
        }
        return this.http.get<Messages>(
          url(p), builder.gen(),
        ).toPromise().then((res: any) => res);
      }
      public getMessages(atoken: string): Promise<DataEasyRoomMessages> {
        return this.http.get<DataEasyRoomMessages>(
          url(`/api/messages`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public getMessagesArchived(atoken: string, page: number): Promise<DataEasyRoomMessages> {
        return this.http.get<DataEasyRoomMessages>(
          url(`/api/messages/archived/${page}`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public getCategories(atoken: string, auth: string = ''): Promise<Array<DataCategory>> {
        let b = new OptBuilder().atoken(atoken).jsonResponseBody();
        if (auth !== '') {
          b = b.auth(auth);
        }
        return this.http.get<Array<DataCategory>>(
          url(`/api/categories`), b.gen(),
        ).toPromise().then((res: any) => res);
      }
      public getRoomsPerCategory(atoken: string, categoryId: string): Promise<Array<EasyRoom>> {
        return this.http.get<Array<EasyRoom>>(
          url(`/api/categories/${categoryId}/rooms`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getAgents(atoken: string): Promise<Agent> {
        return this.http.get<Agent>(
          url(`/api/agents`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async postFile(atoken: string, f: File): Promise<RespPostUploadFile> {
        return this.http.post<RespPostUploadFile>(
          url(`/api/upload-file`), f, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async putEnterRoom(atoken: string, roomId: string, name: string, color: string, password: string = ''): Promise<EnterRoom> {
        return this.http.put<EnterRoom>(
          url(`/api/rooms/${roomId}/enter`),
          { name: name, color: color, password: password },
          new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async putExitRoom(atoken: string, roomId: string): Promise<ExitRoom> {
        return this.http.put<ExitRoom>(
          url(`/api/rooms/${roomId}/exit`), null, new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getRoomMembers(atoken: string, roomId: string): Promise<AgentsInRoom> {
        return this.http.get<AgentsInRoom>(
          url(`/api/rooms/${roomId}/members`), new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getRooms(atoken: string, nextCursor: string = '', limits: number = -1): Promise<Rooms> {
        let p = `/api/rooms`;
        const builder = new OptBuilder();
        builder.atoken(atoken).jsonResponseBody();
        if (nextCursor !== '') {
          builder.nextCursor(nextCursor);
        }
        if (limits !== -1) {
          p += `?limits=${limits}`;
        }
        return this.http.get<Rooms>(
          url(p), builder.gen(),
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
            name: name,
            description: description,
            maxAgents: maxAgents,
            isPublic: isPublic,
            password: passwordRaw,
          },
          new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
      public async getAgentsMessages(atoken: string, nextCursor: string = '', limits: number = -1): Promise<AgentMessages> {
        let p = `/api/agents/messages`;
        const builder = new OptBuilder();
        builder.atoken(atoken).jsonResponseBody();
        if (nextCursor !== '') {
          builder.nextCursor(nextCursor);
        }
        if (limits !== -1) {
          p += `?limits=${limits}`;
        }
        return this.http.get<AgentMessages>(
          url(p), builder.gen(),
        ).toPromise().then((res: any) => res);
      }
      public async postRoomByIDIntroduction(atoken: string, roomId: string, externalIds: string[]): Promise<void> {
        return this.http.post<void>(
          url(`/api/rooms/${roomId}/introduction`),
          {
            roomId: roomId,
            agents: externalIds,
          },
          new OptBuilder().atoken(atoken).jsonResponseBody().gen(),
        ).toPromise().then((res: any) => res);
      }
    */
}
