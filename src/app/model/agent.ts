
export interface Agent extends EasyAgent {
  readonly id: string;
  readonly maxOwnedRoom: number;
}

export interface EasyAgent {
  readonly externalId: string;
  readonly color: string;
  readonly name: string;
  readonly description: string;
  readonly updatedAt: number;
}
