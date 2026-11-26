// Shared date helpers — used by the portfolio and the CV page.

const parseDate = (value) => {
  if (value == null || value === '') return null

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value)
  if (!match) throw new Error(`Invalid date "${value}"; expected DD-MM-YYYY`)

  const [, dayText, monthText, yearText] = match
  const day = Number(dayText)
  const month = Number(monthText)
  const year = Number(yearText)
  const date = new Date(year, month - 1, day)

  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error(`Invalid date "${value}"; expected a real calendar date`)
  }

  return date
}

// 'DD-MM-YYYY' → 'DD-MM-YYYY'; null → 'Present'
export const dateLabel = (value) => {
  const date = parseDate(value)
  if (!date) return 'Present'

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}

export const period = (start, end) => `${dateLabel(start)} – ${dateLabel(end)}`

// Completed month count between two 'DD-MM-YYYY' dates (end null = today) → '2 yrs 10 mos'
export function duration(start, end) {
  const startDate = parseDate(start)
  if (!startDate) throw new Error('A start date is required to calculate duration')

  const endDate = parseDate(end) ?? new Date()
  const monthDifference =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  const completedMonths = monthDifference - (endDate.getDate() < startDate.getDate() ? 1 : 0)
  const total = Math.max(1, completedMonths)
  const years = Math.floor(total / 12)
  const months = total % 12
  return [years && `${years} yr${years > 1 ? 's' : ''}`, months && `${months} mo${months > 1 ? 's' : ''}`]
    .filter(Boolean)
    .join(' ')
}
