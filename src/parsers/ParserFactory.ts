import { extname } from "path";
import { UnsupportedFormatError } from "../errors/UnsupportedFormatError";
import { CsvAddressParser } from "./CsvAddressParser";
import { IAddressParser } from "./IAddressParser";
import { XmlAddressParser } from "./XmlAddressParser";

/**
 * Фабрика: по расширению файла выбирает подходящий парсер.
 * Чтобы добавить новый формат (например, JSON), достаточно зарегистрировать его здесь,
 * остальной код менять не нужно (принцип открытости/закрытости).
 */
export class ParserFactory {
  private readonly creators = new Map<string, () => IAddressParser>([
    [".csv", () => new CsvAddressParser()],
    [".xml", () => new XmlAddressParser()],
  ]);

  create(filePath: string): IAddressParser {
    const extension = extname(filePath).toLowerCase();
    const creator = this.creators.get(extension);

    if (!creator) {
      throw new UnsupportedFormatError(extension, [...this.creators.keys()]);
    }
    return creator();
  }
}
