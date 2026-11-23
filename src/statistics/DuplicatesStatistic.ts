import { AddressRecord } from "../models/AddressRecord";
import { IStatistic } from "./IStatistic";

/* Дублирующаяся запись и сколько раз она встретилась. */
export interface DuplicateEntry {
  description: string;
  count: number;
}

/* Находит дубликаты: считает повторения каждой записи. */
export class DuplicatesStatistic implements IStatistic<DuplicateEntry[]> {
  private readonly counts = new Map<string, number>();

  accept(record: AddressRecord): void {
    const key = record.getKey();
    this.counts.set(key, (this.counts.get(key) ?? 0) + 1);
  }

  /* Возвращает только записи, встретившиеся более одного раза, по убыванию числа повторов. */
  getResult(): DuplicateEntry[] {
    const duplicates: DuplicateEntry[] = [];

    for (const [key, count] of this.counts) {
      if (count > 1) {
        duplicates.push({ description: key.split("|").join(", "), count });
      }
    }

    return duplicates.sort((a, b) => b.count - a.count);
  }
}
