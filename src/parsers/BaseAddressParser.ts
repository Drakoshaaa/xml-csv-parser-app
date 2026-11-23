import { promises as fs } from "fs";
import { AddressRecord } from "../models/AddressRecord";
import { FileNotFoundError } from "../errors/FileNotFoundError";
import { IAddressParser, ParseSummary, RecordHandler } from "./IAddressParser";

/* Сырые значения, как они прочитаны из файла (ещё не проверены). */
export interface RawAddress {
  city?: string;
  street?: string;
  house?: string;
  floor?: string;
}

/* Абстрактный базовый парсер. Метод readRaw() - реализуют наследники. */
export abstract class BaseAddressParser implements IAddressParser {
  async parse(filePath: string, onRecord: RecordHandler): Promise<ParseSummary> {
    await this.ensureFileExists(filePath);

    const summary: ParseSummary = { parsed: 0, skipped: 0 };

    await this.readRaw(filePath, (raw) => {
      const record = this.toRecord(raw);
      if (record === null) {
        summary.skipped++;
        return;
      }
      summary.parsed++;
      onRecord(record);
    });

    return summary;
  }

  /* Читает файл и вызывает onRaw для каждой найденной записи. Зависит от формата. */
  protected abstract readRaw(
    filePath: string,
    onRaw: (raw: RawAddress) => void,
  ): Promise<void>;

  /* Проверяет данные и превращает их в AddressRecord. */
  private toRecord(raw: RawAddress): AddressRecord | null {
    const city = raw.city?.trim();
    const street = raw.street?.trim();
    const house = raw.house?.trim();
    const floorText = raw.floor?.trim();

    if (!city || !street || !house || !floorText) {
      return null;
    }

    const floor = Number(floorText);
    if (!Number.isInteger(floor)) {
      return null;
    }

    return new AddressRecord(city, street, house, floor);
  }

  private async ensureFileExists(filePath: string): Promise<void> {
    try {
      const stat = await fs.stat(filePath);
      if (!stat.isFile()) {
        throw new FileNotFoundError(filePath);
      }
    } catch (error) {
      if (error instanceof FileNotFoundError) throw error;
      throw new FileNotFoundError(filePath);
    }
  }
}
