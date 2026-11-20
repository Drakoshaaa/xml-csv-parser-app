import { createReadStream } from "fs";
import { createInterface } from "readline";
import { ParseError } from "../errors/ParseError";
import { BaseAddressParser, RawAddress } from "./BaseAddressParser";

/* Парсер CSV: Файл читается построчно потоком, поэтому память почти не расходуется. */
export class CsvAddressParser extends BaseAddressParser {
  private static readonly DELIMITER = ";";
  private static readonly REQUIRED_COLUMNS = ["city", "street", "house", "floor"];

  protected async readRaw(
    filePath: string,
    onRaw: (raw: RawAddress) => void,
  ): Promise<void> {
    const stream = createReadStream(filePath, { encoding: "utf8" });
    const lines = createInterface({ input: stream, crlfDelay: Infinity });

    let columns: Record<string, number> | null = null;

    try {
      for await (const line of lines) {
        if (columns === null) {
          columns = this.parseHeader(line);
          continue;
        }
        if (line.length === 0) continue;

        const cells = this.splitLine(line);
        onRaw({
          city: cells[columns.city],
          street: cells[columns.street],
          house: cells[columns.house],
          floor: cells[columns.floor],
        });
      }
    } finally {
      lines.close();
      stream.destroy();
    }

    if (columns === null) {
      throw new ParseError("CSV файл пустой");
    }
  }

  /* Определяет, в какой колонке лежит каждое поле (порядок колонок не важен). */
  private parseHeader(headerLine: string): Record<string, number> {
    const clean = headerLine.charCodeAt(0) === 0xfeff ? headerLine.slice(1) : headerLine;
    const names = this.splitLine(clean).map((name) => name.trim().toLowerCase());

    const columns: Record<string, number> = {};
    for (const required of CsvAddressParser.REQUIRED_COLUMNS) {
      const index = names.indexOf(required);
      if (index === -1) {
        throw new ParseError(`в CSV нет колонки "${required}"`);
      }
      columns[required] = index;
    }
    return columns;
  }

  /* Разбивает строку по ";" с учётом кавычек. */
  private splitLine(line: string): string[] {
    const cells: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];

      if (inQuotes) {
        if (ch === '"') {
          if (line[i + 1] === '"') {
            current += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          current += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === CsvAddressParser.DELIMITER) {
        cells.push(current);
        current = "";
      } else {
        current += ch;
      }
    }

    cells.push(current);
    return cells;
  }
}
