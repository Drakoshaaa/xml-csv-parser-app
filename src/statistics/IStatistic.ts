import { AddressRecord } from "../models/AddressRecord";

/* Контракт накопительной статистики. */
export interface IStatistic<TResult> {
  accept(record: AddressRecord): void;
  getResult(): TResult;
}
