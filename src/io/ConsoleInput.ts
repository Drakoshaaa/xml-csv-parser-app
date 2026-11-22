import { createInterface } from "readline";
import { IUserInput } from "./IUserInput";

/** Ввод с консоли на основе readline. */
export class ConsoleInput implements IUserInput {
  private readonly rl = createInterface({ input: process.stdin, output: process.stdout });

  ask(prompt: string): Promise<string | null> {
    return new Promise((resolve) => {
      // Если ввод закроют (Ctrl+D / Ctrl+C), пока мы ждём ответ, возвращаем null
      const onClose = () => resolve(null);
      this.rl.once("close", onClose);

      this.rl.question(prompt, (answer) => {
        this.rl.off("close", onClose);
        resolve(answer);
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}