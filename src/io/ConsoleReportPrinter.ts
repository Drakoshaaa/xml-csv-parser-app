import { StatisticsReport } from "../statistics/StatisticsReport";
import { IReportPrinter } from "./IReportPrinter";

/* Выводит отчёт в консоль. */
export class ConsoleReportPrinter implements IReportPrinter {
  constructor(private readonly maxDuplicatesToShow: number = 50) {}

  print(report: StatisticsReport): void {
    /* Собираем весь вывод в массив и печатаем одним вызовом */
    const lines: string[] = [];

    lines.push("");
    lines.push(`Файл: ${report.filePath}`);
    lines.push(
      `Прочитано записей: ${report.totalRecords}` +
        (report.skippedRecords > 0 ? ` (пропущено некорректных: ${report.skippedRecords})` : ""),
    );

    lines.push("");
    lines.push("1) Дублирующиеся записи:");
    if (report.duplicates.length === 0) {
      lines.push("   дубликатов нет");
    } else {
      const shown = report.duplicates.slice(0, this.maxDuplicatesToShow);
      for (const dup of shown) {
        lines.push(`   ${dup.description} - повторов: ${dup.count}`);
      }
      const hidden = report.duplicates.length - shown.length;
      if (hidden > 0) {
        lines.push(`   ... и ещё ${hidden} дублирующихся записей (всего ${report.duplicates.length})`);
      }
    }

    lines.push("");
    lines.push("2) Количество 1-5 этажных зданий по городам:");
    lines.push(`   ${"Город".padEnd(30)} ${["1", "2", "3", "4", "5"].map((f) => f.padStart(8)).join("")}`);
    for (const stat of report.floorsByCity) {
      const counts = stat.buildings.map((n) => String(n).padStart(8)).join("");
      lines.push(`   ${stat.city.padEnd(30)} ${counts}`);
    }

    lines.push("");
    lines.push(`3) Время обработки файла: ${report.elapsedMs.toFixed(0)} мс`);
    lines.push("");

    console.log(lines.join("\n"));
  }

  printError(message: string): void {
    console.error(`Ошибка: ${message}`);
  }

  printMessage(message: string): void {
    console.log(message);
  }
}
