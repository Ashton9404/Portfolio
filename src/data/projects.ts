export type ProjectCategory = 'client' | 'academic' | 'openSource'

/**
 * Everything language-independent about a project lives here; the narrative
 * (problem / solution / outcome / features) lives in the locale files under
 * `projects.items.<i18nKey>`.
 *
 * Keeping tech stacks and URLs out of the JSON means a changed link is a
 * one-line edit rather than two edits that can silently drift apart.
 */
export interface Project {
  /** URL segment for /projects/:slug — must stay stable, it is a public URL. */
  slug: string
  /** Key under `projects.items` in the locale files. */
  i18nKey: string
  category: ProjectCategory
  /**
   * Only some projects carry a `role` string. Flagging it here avoids asking
   * i18n for a key that doesn't exist, which would render the raw key path.
   */
  hasRole?: boolean
  tech: string[]
  links: {
    live?: string
    github?: string
  }
}

export const projects: Project[] = [
  {
    slug: 'sunyad-corporate-website',
    i18nKey: 'sunyad',
    category: 'client',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    links: { live: 'https://sunyad.com.tw' },
  },
  {
    slug: 'myson-corporate-website',
    i18nKey: 'myson',
    category: 'client',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Summernote'],
    links: { live: 'https://myson.com.tw' },
  },
  {
    slug: 'stock-analysis-platform',
    i18nKey: 'stockAnalysis',
    category: 'academic',
    hasRole: true,
    tech: ['Laravel', 'PHP', 'Vue 3', 'Chart.js', 'MySQL', 'Python', 'Flutter'],
    links: {},
  },
  {
    slug: 'laravel-admin-starter',
    i18nKey: 'laravelAdminStarter',
    category: 'openSource',
    tech: ['Laravel 13', 'PHP 8.4', 'Vue 3', 'Pinia', 'TipTap', 'MySQL 8.4', 'Redis', 'Docker'],
    links: { github: 'https://github.com/Ashton9404/laravel-admin-starter' },
  },
]

/**
 * The open-source project gets its own in-depth section, so the projects grid
 * excludes it rather than showing the same card twice.
 */
export const gridProjects = projects.filter((project) => project.category !== 'openSource')

export const openSourceProject = projects.find((project) => project.category === 'openSource')!

export function findProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
