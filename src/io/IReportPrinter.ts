import { StatisticsReport } from "../statistics/StatisticsReport";

/* Контракт вывода отчёта */
export interface IReportPrinter {
  print(report: StatisticsReport): void;
  printError(message: string): void;
  printMessage(message: string): void;
}
