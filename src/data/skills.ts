/**
 * Skills are shown as "technology + where I actually used it", never as
 * percentage bars — a bar claiming "PHP 80%" tells a reviewer nothing, while
 * one concrete sentence of context tells them everything.
 *
 * `name` is language-independent (framework names are not translated).
 * `key` resolves to `skills.context.<key>` in the locale files.
 */
export interface Skill {
  key: string
  name: string
}

export interface SkillCategory {
  /** Resolves to `skills.categories.<id>`. */
  id: 'backend' | 'frontend' | 'database' | 'tools'
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    skills: [
      { key: 'php', name: 'PHP' },
      { key: 'laravel', name: 'Laravel' },
      { key: 'restApi', name: 'REST APIs' },
      { key: 'livewire', name: 'Livewire' },
    ],
  },
  {
    id: 'frontend',
    skills: [
      { key: 'vue', name: 'Vue 3' },
      { key: 'typescript', name: 'TypeScript / JavaScript' },
      { key: 'tailwind', name: 'Tailwind CSS' },
      { key: 'bootstrap', name: 'Bootstrap' },
    ],
  },
  {
    id: 'database',
    skills: [
      { key: 'mysql', name: 'MySQL' },
      { key: 'schemaDesign', name: 'Schema Design' },
      { key: 'eloquent', name: 'Eloquent ORM' },
    ],
  },
  {
    id: 'tools',
    skills: [
      { key: 'docker', name: 'Docker' },
      { key: 'git', name: 'Git' },
      { key: 'linux', name: 'Linux' },
      { key: 'python', name: 'Python' },
      { key: 'flutter', name: 'Flutter' },
    ],
  },
]
