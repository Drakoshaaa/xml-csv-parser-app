import { AddressRecord } from "../models/AddressRecord";

/* Обработчик, который вызывается для каждой успешно прочитанной записи. */
export type RecordHandler = (record: AddressRecord) => void;

/* Итог разбора файла. */
export interface ParseSummary {
  parsed: number;
  skipped: number;
}

/* Общий контракт парсеров справочников. */
export interface IAddressParser {
  parse(filePath: string, onRecord: RecordHandler): Promise<ParseSummary>;
}
