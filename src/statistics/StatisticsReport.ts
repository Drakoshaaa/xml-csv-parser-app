import { DuplicateEntry } from "./DuplicatesStatistic";
import { CityFloorStats } from "./FloorsByCityStatistic";

/* Итоговый отчёт по одному обработанному файлу. */
export class StatisticsReport {
  constructor(
    readonly filePath: string,
    readonly totalRecords: number,
    readonly skippedRecords: number,
    readonly duplicates: DuplicateEntry[],
    readonly floorsByCity: CityFloorStats[],
    readonly elapsedMs: number,
  ) {}
}
