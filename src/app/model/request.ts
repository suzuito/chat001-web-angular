import { Room } from './room';
import { EasyAgent } from './agent';

export interface Request {
  readonly id: string;
  readonly srcExternalId: string;
  readonly message: string;
}

export interface RequestApproved {
  readonly room: Room;
  readonly dst: EasyAgent;
}
