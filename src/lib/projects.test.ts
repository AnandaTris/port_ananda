import { projects } from '@/content/projects'
import { filterProjects, getProject, validateProjects } from './projects'

test('contains only the approved roster with unique slugs', () => {
  expect(validateProjects(projects)).toEqual([])
  expect(projects).toHaveLength(17)
  expect(new Set(projects.map((project) => project.slug)).size).toBe(17)
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
