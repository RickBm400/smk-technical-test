import { stringify } from 'csv-stringify/sync'
import type { CsvRow } from '../types/schemas.js'

export interface DocumentCsvData {
  correo: string
  nombre: string
  telefono: string
  ciudad: string
  notas: string | null
}

export const buildCsv = (rows: DocumentCsvData[]): string => {
  return stringify(rows, {
    header: true,
    columns: ['correo', 'nombre', 'telefono', 'ciudad', 'notas']
  })
}
