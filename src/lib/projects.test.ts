import { projects } from '@/content/projects'
import { filterProjects, getProject, validateProjects } from './projects'

test('contains only the approved roster with unique slugs', () => {
  expect(validateProjects(projects)).toEqual([])
  expect(projects.map((project) => project.slug)).toEqual([
    'fix-yo-yap',
    'carekaki',
    'das-dial',
    'false-positive',
    'cited',
    'brawnix',
    'ingatik-recall',
    'fames',
    'hypecast',
    'steady',
    'rekap',
    'spike-responder',
    'math-me-home',
    'onesearch',
    'aegis',
    'hydrun',
    'personal-workout-tracker',
  ])
})

test('keeps excluded work out of the content layer', () => {
  const names = projects.map((project) => project.name).join(' ')
  expect(names).not.toMatch(/ChordGrab|DocDeck|Pufferty|Meowtivation|Regression/i)
})

test('resolves verified Ingatik links', () => {
  expect(getProject('ingatik-recall')?.links).toEqual({
    live: 'https://ingatikrecall.com',
    appStore: 'https://apps.apple.com/us/app/ingatik-recall/id6788639514',
  })
})

test('filters by capability without hiding the archive source', () => {
  const result = filterProjects(projects, { capability: 'responsible-ai', query: '' })
  expect(result.map((project) => project.slug)).toEqual(
    expect.arrayContaining(['carekaki', 'das-dial', 'cited'])
  )
})
