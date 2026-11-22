/* Контракт ввода от пользователя. */
export interface IUserInput {
  ask(prompt: string): Promise<string | null>;
  close(): void;
}
