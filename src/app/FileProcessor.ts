import { performance } from "perf_hooks";
import { ParserFactory } from "../parsers/ParserFactory";
import { StatisticsReport } from "../statistics/StatisticsReport";
import { StatisticsService } from "../statistics/StatisticsService";

/* Один прогон обработки файла */
export class FileProcessor {
  constructor(private readonly parserFactory: ParserFactory) {}

  async process(filePath: string): Promise<StatisticsReport> {
    const startedAt = performance.now();

    const parser = this.parserFactory.create(filePath);
    
    const statistics = new StatisticsService();

    const summary = await parser.parse(filePath, (record) => statistics.accept(record));
    const result = statistics.getResult();

    const elapsedMs = performance.now() - startedAt;

    return new StatisticsReport(
      filePath,
      summary.parsed,
      summary.skipped,
      result.duplicates,
      result.floorsByCity,
      elapsedMs,
    );
  }
}
