import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { ParseError } from "../errors/ParseError";
import { BaseAddressParser, RawAddress } from "./BaseAddressParser";

/* Парсер CSV: Файл читается потоком. */
export class CsvAddressParser extends BaseAddressParser {
  protected async readRaw(
    filePath: string,
    onRaw: (raw: RawAddress) => void,
  ): Promise<void> {
    const rows = createReadStream(filePath, { encoding: "utf8" }).pipe(
      parse({
        delimiter: ";",
        columns: (header: string[]) => header.map(h => h.trim().toLocaleLowerCase()),
        skip_empty_lines: true,
        bom: true
      })
    );

    try {
      for await (const row of rows) {
        onRaw({city: row.city, street: row.street, house: row.house, floor: row.floor})
      }
    } catch (error) {
      throw new ParseError((error as Error).message);
    }

  }
}