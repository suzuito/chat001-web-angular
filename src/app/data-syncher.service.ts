import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { DataEasyAgentsService } from './data-easy-agents.service';
import { LocalStorageService, LocalStorageKey } from './local-storage.service';
import { EasyAgent } from './model/agent';
import { Room } from './model/room';
import { DataRoomsService } from './data-rooms.service';

enum SyncType {
  Agent = 1,
  Room,
}

interface Req {
  syncType: SyncType;
  id: string;
  fetchedAt: number;
  failed: boolean;
}

function reqId(req: Req): string {
  return `${req.id}-${req.syncType}`;
}

@Injectable({
  providedIn: 'root'
})
export class DataSyncherService {

  private reqs: Map<string, Req>;
  private requesting: boolean;

  constructor(
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private dataEasyAgentsService: DataEasyAgentsService,
    private dataRoomsService: DataRoomsService,
  ) {
    this.reqs = new Map<string, Req>();
    this.requesting = false;
    setInterval(() => {
      this.fetch();
    }, 1000);
  }

  public addAgent(externalId: string): void {
    this.add({ id: externalId, syncType: SyncType.Agent } as Req);
  }

  private add(...reqs: Req[]): void {
    reqs.forEach(req => {
      req.fetchedAt = Date.now() / 1000;
      req.failed = false;
    });
    reqs.forEach((req) => {
      if (this.reqs.has(reqId(req))) {
        return;
      }
      this.reqs.set(reqId(req), req);
    });
  }

  private fetch(): void {
    if (this.reqs.size <= 0) {
      return;
    }
    if (this.requesting) {
      return;
    }
    this.requesting = true;
    let req: Req = null;
    this.reqs.forEach((r: Req) => {
      if (r.failed) {
        return;
      }
      req = r;
    });
    if (!req) {
      return;
    }
    switch (req.syncType) {
      case SyncType.Agent:
        this.apiService.getEasyAgent(
          this.localStorageService.get(LocalStorageKey.A),
          req.id,
        ).then((agent: EasyAgent) => {
          this.dataEasyAgentsService.setAgent(agent);
          this.reqs.delete(reqId(req));
        }).catch(() => {
          req.failed = true;
          this.reqs.set(reqId(req), req);
        }).finally(() => {
          this.requesting = false;
        });
        break;
      case SyncType.Room:
        this.apiService.getRoomByID(
          this.localStorageService.get(LocalStorageKey.A),
          req.id,
        ).then((room: Room) => {
          this.dataRoomsService.setRoom(room);
          this.reqs.delete(reqId(req));
        }).catch(() => {
          req.failed = true;
          this.reqs.set(reqId(req), req);
        }).finally(() => {
          this.requesting = false;
        });
        break;
    }
  }
}
