import { AppError } from "../errors/AppError";
import { IReportPrinter } from "../io/IReportPrinter";
import { IUserInput } from "../io/IUserInput";
import { FileProcessor } from "./FileProcessor";

/* Главный цикл программы */
export class Application {
  private static readonly EXIT_COMMANDS = ["exit", "quit", "выход"];

  constructor(
    private readonly input: IUserInput,
    private readonly processor: FileProcessor,
    private readonly printer: IReportPrinter,
  ) {}

  async run(): Promise<void> {
    this.printer.printMessage(
      "Введите путь до файла-справочника (.csv или .xml).\n" +
        'Для выхода введите "exit" или нажмите Ctrl+D / Ctrl+C.',
    );

    while (true) {
      const answer = await this.input.ask("\n> ");

      if (answer === null) break;

      const command = this.normalizePath(answer);
      if (command === "") continue;
      if (Application.EXIT_COMMANDS.includes(command.toLowerCase())) break;

      await this.handleFile(command);
    }

    this.input.close();
    this.printer.printMessage("Работа завершена.");
  }

  private async handleFile(filePath: string): Promise<void> {
    try {
      const report = await this.processor.process(filePath);
      this.printer.print(report);
    } catch (error) {
      if (error instanceof AppError) {
        this.printer.printError(error.message);
      } else {
        const message = error instanceof Error ? error.message : String(error);
        this.printer.printError(`непредвиденная ошибка: ${message}`);
      }
    }
  }

  /* Убирает пробелы и кавычки */
  private normalizePath(raw: string): string {
    return raw.trim().replace(/^["']+|["']+$/g, "");
  }
}
