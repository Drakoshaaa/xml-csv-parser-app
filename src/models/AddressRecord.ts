/* Одна запись справочника: город, улица, дом, этаж. */
export class AddressRecord {
  constructor(
    private readonly _city: string,
    private readonly _street: string,
    private readonly _house: string,
    private readonly _floor: number,
  ) {}

  get city(): string {
    return this._city;
  }

  get street(): string {
    return this._street;
  }

  get house(): string {
    return this._house;
  }

  get floor(): number {
    return this._floor;
  }

  /* Ключ записи: две записи считаются дубликатами, если у них совпадает ключ. */
  getKey(): string {
    return `${this._city}|${this._street}|${this._house}|${this._floor}`;
  }

  /* Человекочитаемое представление для вывода в консоль. */
  toString(): string {
    return `${this._city}, ${this._street}, д. ${this._house}, этажей: ${this._floor}`;
  }
}
