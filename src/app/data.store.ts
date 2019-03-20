export interface DataWrapper<T> {
  data: T;
  updatedAt: number;
}

export class DataStore<T> {
  private datas: Map<string, DataWrapper<T>>;

  constructor() {
    this.datas = new Map<string, DataWrapper<T>>();
  }

  public get(id: string): DataWrapper<T> {
    return this.datas.get(id);
  }

  public has(id: string): boolean {
    return this.datas.has(id);
  }

  public find(callback: (d: DataWrapper<T>) => boolean): DataWrapper<T>[] {
    const ret: any[] = [];
    this.datas.forEach((value: DataWrapper<T>, _: string) => {
      if (callback(value)) {
        ret.push(value);
      }
    });
    return ret;
  }

  public findRaw(callback: (d: DataWrapper<T>) => boolean): T[] {
    return this.find(callback).map((v: DataWrapper<T>) => v.data);
  }

  public set(id: string, d: any): void {
    const dataWrapper: DataWrapper<T> = {
      updatedAt: Date.now() / 1000,
      data: d,
    };
    this.datas.set(id, dataWrapper);
  }

  public delete(id: string): boolean {
    if (this.datas.has(id)) {
      this.datas.delete(id);
      return true;
    }
    return false;
  }
}

export class DataStores<T> {
  private datas: Map<string, DataStore<T>>;

  constructor() {
    this.datas = new Map<string, DataStore<T>>();
  }

  public get(pid: string, id: string): DataWrapper<T> {
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

  public getParent(id: string): DataWrapper<T>[] {
    if (this.datas.has(id)) {
      return this.datas.get(id).find((d: DataWrapper<T>): boolean => true);
    }
    return [];
  }

  public set(pid: string, id: string, d: any): void {
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
