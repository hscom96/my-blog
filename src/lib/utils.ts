import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

export function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), 'yyyy년 MM월 dd일', { locale: ko })
  } catch {
    return dateStr
  }
}
