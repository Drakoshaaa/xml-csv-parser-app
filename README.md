# xml-csv-parser-app

A console application that calculates statistics for city address directories (OOP lab project, TypeScript).

## What it does

1. Reads a path to a `.csv` or `.xml` file from the console.
2. Reads the file as a stream, so even files of 150 MB+ are processed without loading them into memory.
3. Calculates statistics on the fly:
   - duplicate records and how many times each one is repeated;
   - the number of 1-, 2-, 3-, 4- and 5-storey buildings in each city;
   - file processing time.
4. Prints the report and waits for the next file. Type `exit` (or press Ctrl+D / Ctrl+C) to quit.

Errors (file not found, unsupported format, malformed file, invalid rows) are handled without crashing.
The code is split into classes and interfaces: parsers (with a factory), statistics, input, output, an application loop and an error hierarchy.

## Input format

Each record has four fields: `city`, `street`, `house`, `floor`.

- CSV: `;` delimiter, values may be quoted, the first line is a header (see `data/address.csv`).
- XML: one `<item city="..." street="..." house="..." floor="..." />` element per record (see `data/address.xml`).

## Requirements

- Node.js 20 or newer
- pnpm (or npm)
- Runtime dependency: `saxes`, `csv-parse`. Dev dependencies: `typescript`, `tsx`, `@types/node`

## Running

If pnpm is not installed, enable it via corepack (bundled with Node.js) or install it with npm:

```bash
npm install -g pnpm
```

Install and run:

```bash
git clone <repository-url>
cd xml-csv-parser-app
pnpm install
pnpm run dev
```

Then enter a path to a file, absolute or relative to the project folder, for example `data/address.csv`.

The `Ignored build scripts: esbuild` warning during installation can be ignored.


```bash
pnpm build      # compile to dist/
pnpm start      # run dist/main.js
```

With npm the same commands are: `npm install`, `npm start`, `npm run build`, `npm run start:prod`.
