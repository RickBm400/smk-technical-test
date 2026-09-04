interface CsvRow {
  correo: string
  nombre: string
  telefono: string
  ciudad: string
  notas: string | null
}

export const buildCsv = (rows: CsvRow[]): string => {
  const headers = ['correo', 'nombre', 'telefono', 'ciudad', 'notas']
  const headerLine = headers.join(',')

  const escapeValue = (value: string | null): string => {
    if (value === null || value === undefined) return ''
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`
    }
    return value
  }

  const dataLines = rows.map((row) =>
    headers.map((header) => escapeValue(row[header as keyof CsvRow])).join(',')
  )

  return [headerLine, ...dataLines].join('\n')
}
