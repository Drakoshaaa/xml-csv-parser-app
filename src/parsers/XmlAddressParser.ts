import { createReadStream } from "fs";
import { SaxesParser } from "saxes";
import { ParseError } from "../errors/ParseError";
import { BaseAddressParser, RawAddress } from "./BaseAddressParser";

/* Парсер XML: файл читается потоком */
export class XmlAddressParser extends BaseAddressParser {
  private static readonly ITEM_TAG = "item";

  protected async readRaw(
    filePath: string,
    onRaw: (raw: RawAddress) => void,
  ): Promise<void> {
    const parser = new SaxesParser();
    let failure: Error | null = null;

    parser.on("error", (error) => {
      failure = error;
    });

    parser.on("opentag", (tag) => {
      if (tag.name !== XmlAddressParser.ITEM_TAG) return;
      const attrs = tag.attributes as Record<string, string>;
      onRaw({
        city: attrs.city,
        street: attrs.street,
        house: attrs.house,
        floor: attrs.floor,
      });
    });

    const stream = createReadStream(filePath, { encoding: "utf8" });

    try {
      for await (const chunk of stream) {
        parser.write(chunk as string);
        if (failure) break;
      }
      if (!failure) parser.close();
    } finally {
      stream.destroy();
    }

    if (failure) {
      throw new ParseError((failure as Error).message);
    }
  }
}
