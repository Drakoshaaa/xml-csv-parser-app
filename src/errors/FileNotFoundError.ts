import { AppError } from "./AppError";

/* Файл по указанному пути не существует или это не файл. */
export class FileNotFoundError extends AppError {
  constructor(filePath: string) {
    super(`Файл не найден: ${filePath}`);
  }
}
