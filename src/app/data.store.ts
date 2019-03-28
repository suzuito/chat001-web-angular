export class DataStore<T> {
  private datas: Map<string, T>;

  constructor() {
    this.datas = new Map<string, T>();
  }

  public get(id: string): T {
    return this.datas.get(id);
  }

  public has(id: string): boolean {
    return this.datas.has(id);
  }

  public find(callback: (d: T) => boolean): T[] {
    const ret: any[] = [];
    this.datas.forEach((value: T, _: string) => {
      if (callback(value)) {
        ret.push(value);
      }
    });
    return ret;
  }

  public set(id: string, d: T): void {
    this.datas.set(id, d);
  }

  public delete(id: string): boolean {
    if (this.datas.has(id)) {
      this.datas.delete(id);
      return true;
    }
    return false;
  }

  public clear(): void {
    this.datas = new Map<string, T>();
  }
}

export class DataStores<T> {
  private datas: Map<string, DataStore<T>>;

  constructor() {
    this.datas = new Map<string, DataStore<T>>();
  }

  public get(pid: string, id: string): T {
    if (this.datas.has(pid)) {
      return this.datas.get(pid).get(id);
    }
    return null;
  }

  public has(pid: string, id: string): boolean {
    if (this.datas.has(pid)) {
      return this.datas.get(pid).has(id);
    }
    return false;
  }

  public getParent(id: string): T[] {
    if (this.datas.has(id)) {
      return this.datas.get(id).find((d: T): boolean => true);
    }
    return [];
  }

  public set(pid: string, id: string, d: T): void {
    let ds: DataStore<T> = null;
    if (!this.datas.has(pid)) {
      this.datas.set(pid, new DataStore());
    }
    ds = this.datas.get(pid);
    ds.set(id, d);
  }

  public delete(pid: string, id: string): boolean {
    if (this.datas.has(pid)) {
      return this.datas.get(pid).delete(id);
    }
    return false;
  }
}

export class SortedArray<T> {
  public data: T[];
  public compareFunction: (a: T, b: T) => number;

  constructor(
    compareFunction: (a: T, b: T) => number,
  ) {
    this.data = [];
    this.compareFunction = compareFunction;
  }

  public push(...elements: T[]): void {
    this.data.push(...elements);
    this.data.sort(this.compareFunction);
  }
}
