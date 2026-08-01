/**
 * Dates are stored as ISO year-month and formatted per locale at render time
 * (see `formatMonthRange`), so English reads "Dec 2025" and Chinese reads
 * "2025年12月" without either string being hand-written twice.
 */
export interface ExperienceEntry {
  /** Resolves to `experience.entries.<id>`. */
  id: string
  companyUrl?: string
  start: string
  /** `null` means the role is ongoing and renders as "Present". */
  end: string | null
  tech: string[]
}

export interface EducationEntry {
  /** Resolves to `experience.degrees.<id>`. */
  id: string
  start: string
  end: string
  expected?: boolean
}

export const experienceEntries: ExperienceEntry[] = [
  {
    id: 'geekers',
    start: '2025-12',
    end: '2026-06',
    tech: ['Laravel', 'PHP', 'MySQL', 'Livewire', 'Vue.js', 'Bootstrap', 'Summernote'],
  },
  {
    id: 'departmentWebAdmin',
    start: '2023-09',
    end: '2026-06',
    tech: ['WordPress', 'PHP', 'HTML', 'CSS'],
  },
]

export const educationEntries: EducationEntry[] = [
  { id: 'master', start: '2026-09', end: '2027-06', expected: true },
  { id: 'bachelor', start: '2022-09', end: '2026-06' },
]

/** "Dec 2025 – Jun 2026" in English, "2025年12月 – 2026年6月" in Chinese. */
export function formatMonthRange(
  start: string,
  end: string | null,
  locale: string,
  presentLabel: string,
): string {
  const format = (iso: string) => {
    const [year, month] = iso.split('-').map(Number)
    return new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short' }).format(
      new Date(year, month - 1),
    )
  }

  return `${format(start)} – ${end ? format(end) : presentLabel}`
}
