import { AddressRecord } from "../models/AddressRecord";
import { IStatistic } from "./IStatistic";

/* Сколько зданий каждой этажности в одном городе. */
export interface CityFloorStats {
  city: string;
  buildings: number[];
}

/* Считает для каждого города количество 1, 2, 3, 4 и 5-этажных зданий. */
export class FloorsByCityStatistic implements IStatistic<CityFloorStats[]> {
  private static readonly MIN_FLOOR = 1;
  private static readonly MAX_FLOOR = 5;

  private readonly byCity = new Map<string, number[]>();

  accept(record: AddressRecord): void {
    const floor = record.floor;
    if (floor < FloorsByCityStatistic.MIN_FLOOR || floor > FloorsByCityStatistic.MAX_FLOOR) {
      return;
    }

    let counters = this.byCity.get(record.city);
    if (counters === undefined) {
      counters = new Array<number>(FloorsByCityStatistic.MAX_FLOOR).fill(0);
      this.byCity.set(record.city, counters);
    }
    counters[floor - FloorsByCityStatistic.MIN_FLOOR]++;
  }

  getResult(): CityFloorStats[] {
    return [...this.byCity]
      .map(([city, buildings]) => ({ city, buildings }))
      .sort((a, b) => a.city.localeCompare(b.city, "ru"));
  }
}
