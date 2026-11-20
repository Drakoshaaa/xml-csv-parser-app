import { AppError } from "./AppError";

/* Для расширения файла нет подходящего парсера. */
export class UnsupportedFormatError extends AppError {
  constructor(extension: string, supported: string[]) {
    super(
      `Неподдерживаемый формат файла "${extension || "(без расширения)"}". ` +
        `Поддерживаются: ${supported.join(", ")}`,
    );
  }
}
