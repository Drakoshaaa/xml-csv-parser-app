/** Контракт ввода от пользователя. */
export interface IUserInput {
  /**
   * Показывает приглашение и ждёт строку.
   * Возвращает null, если ввод закрыт (например, нажато Ctrl+D или Ctrl+C).
   */
  ask(prompt: string): Promise<string | null>;

  /** Освобождает ресурсы ввода. */
  close(): void;
}
