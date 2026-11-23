import { AddressRecord } from "../models/AddressRecord";
import { DuplicatesStatistic, DuplicateEntry } from "./DuplicatesStatistic";
import { CityFloorStats, FloorsByCityStatistic } from "./FloorsByCityStatistic";
import { IStatistic } from "./IStatistic";

/* Результаты всех показателей после обработки файла. */
export interface StatisticsResult {
  duplicates: DuplicateEntry[];
  floorsByCity: CityFloorStats[];
}

/* Каждую запись рассылает всем статистикам и в конце собирает их результаты вместе. */
export class StatisticsService {
  constructor(
    private readonly duplicates: IStatistic<DuplicateEntry[]> = new DuplicatesStatistic(),
    private readonly floors: IStatistic<CityFloorStats[]> = new FloorsByCityStatistic(),
  ) {}

  accept(record: AddressRecord): void {
    this.duplicates.accept(record);
    this.floors.accept(record);
  }

  getResult(): StatisticsResult {
    return {
      duplicates: this.duplicates.getResult(),
      floorsByCity: this.floors.getResult(),
    };
  }
}
