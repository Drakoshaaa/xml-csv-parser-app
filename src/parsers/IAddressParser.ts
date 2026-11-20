import { AddressRecord } from "../models/AddressRecord";

/** Обработчик, который вызывается для каждой успешно прочитанной записи. */
export type RecordHandler = (record: AddressRecord) => void;

/** Итог разбора файла. */
export interface ParseSummary {
  /** Сколько записей прочитано и передано обработчику. */
  parsed: number;
  /** Сколько строк/элементов пропущено из-за некорректных данных. */
  skipped: number;
}

/**
 * Общий контракт парсеров справочников.
 * Остальной код работает только с этим интерфейсом и не знает про CSV или XML,
 * поэтому формат можно заменить без переписывания остальной логики.
 *
 * Записи отдаются по одной через onRecord (потоковая обработка):
 * файл целиком в память не загружается.
 */
export interface IAddressParser {
  parse(filePath: string, onRecord: RecordHandler): Promise<ParseSummary>;
}
