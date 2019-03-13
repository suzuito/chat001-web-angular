
export interface Agent extends EasyAgent {
  readonly id: string;
  readonly maxOwnedRoom: number;
}

export interface TemporaryAgent extends EasyAgent {
  readonly id: string;
}

export interface EasyAgent {
  readonly name: string;
  readonly color: string;
  readonly description: string;
  readonly updatedAt: number;
  readonly urlImage: string;
}
