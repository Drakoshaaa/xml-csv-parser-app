import { AppError } from "./AppError";

/* Файл нельзя разобрать целиком (например, сломана структура XML или нет нужных колонок CSV). */
export class ParseError extends AppError {
  constructor(message: string) {
    super(`Ошибка разбора файла: ${message}`);
  }
}
