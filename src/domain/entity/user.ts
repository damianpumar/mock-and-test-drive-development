export class User {
  public readonly id: number;
  public readonly name: string;

  constructor(name: string);
  constructor(id: number, name: string);

  constructor(idOrName: number | string, name?: string) {
    if (typeof idOrName === 'string') {
      this.id = -1;
      this.name = idOrName;
    } else {
      this.id = idOrName;
      this.name = name!;
    }
  }
}
