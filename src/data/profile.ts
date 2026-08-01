/**
 * Single source of truth for every identity/contact detail on the site.
 * Changing an email or handle here updates the hero, contact section, footer,
 * structured data and sitemap at once.
 */
export const profile = {
  name: 'Ashton Li',
  legalName: 'Yucheng (Ashton) Li',
  role: 'Full Stack Developer',
  location: 'Kaohsiung, Taiwan',
  email: 'icedent9404@gmail.com',
  github: 'https://github.com/Ashton9404',
  githubHandle: 'Ashton9404',
  linkedin: 'https://www.linkedin.com/in/yucheng-li-4a8b93419',
  linkedinHandle: 'yucheng-li-4a8b93419',
  resumePath: '/resume/Ashton_Li_Resume.pdf',
  repositoryUrl: 'https://github.com/Ashton9404/Portfolio',

  /** Canonical origin. Update once the custom domain is attached in Vercel. */
  siteUrl: 'https://ashton9404.vercel.app',
} as const

export const mailtoLink = `mailto:${profile.email}`
