
export interface Agent extends EasyAgent {
  id: string;
  maxOwnedRoom: number;
}

export interface EasyAgent {
  externalId: string;
  color: string;
  name: string;
  description: string;
}
