
export abstract class CursorManager {

  private cursors: Map<string, string>;

  constructor(
  ) {
    this.cursors = new Map<string, string>();
  }

  protected get(id: string): string {
    if (!this.cursors.has(id)) {
      this.cursors.set(id, '');
    }
    return this.cursors.get(id);
  }

  protected set(id: string, cursor: string): void {
    this.cursors.set(id, cursor);
  }

  public delete(id: string): void {
    if (this.cursors.has(id)) {
      this.cursors.delete(id);
    }
  }

  public async initialize(id: string): Promise<void> {
    if (!this.cursors.has(id)) {
      this.fetch(id);
    }
  }

  public abstract async fetch(id: string): Promise<void>;

}
