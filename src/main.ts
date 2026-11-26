import { Application } from "./app/Application";
import { FileProcessor } from "./app/FileProcessor";
import { ConsoleInput } from "./io/ConsoleInput";
import { ConsoleReportPrinter } from "./io/ConsoleReportPrinter";
import { ParserFactory } from "./parsers/ParserFactory";

/* Точка входа. */
async function main(): Promise<void> {
  const processor = new FileProcessor(new ParserFactory());
  const app = new Application(new ConsoleInput(), processor, new ConsoleReportPrinter());

  await app.run();
}

main().catch((error) => {
  console.error("Критическая ошибка при запуске:", error);
  process.exit(1);
});
