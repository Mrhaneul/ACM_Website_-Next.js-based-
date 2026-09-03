type CsvValue = string | number | boolean | string[] | null | undefined;
type CsvRow = Record<string, CsvValue>;

function csvEscape(value: CsvValue): string {
  const wasArray = Array.isArray(value);
  const joined = wasArray ? (value as string[]).join(';') : value;
  const str = joined === undefined || joined === null ? '' : String(joined);
  if (wasArray || /[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function buildCsv(rows: CsvRow[]): string {
  if (!rows || rows.length === 0) return '';

  const headers = Object.keys(rows[0]);
  const headerLine = headers.join(',');
  const dataLines = rows.map((row) =>
    headers.map((h) => csvEscape(row[h])).join(',')
  );

  return [headerLine, ...dataLines].join('\r\n') + '\r\n';
}

export function downloadCsv(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
