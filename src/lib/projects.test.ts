import { projects } from '@/content/projects'
import type { Project } from '@/content/types'
import { getProject, validateProjects } from './projects'

const validProject = projects.find((project) => project.slug === 'carekaki')!

function mutatedProject(overrides: Partial<Project>): Project {
  return { ...validProject, ...overrides }
}

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
    'cseshell',
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

test('rejects blank required project and nested strings', () => {
  const invalid = mutatedProject({
    name: '   ',
    ownership: [''],
    system: [
      { title: '', detail: 'A valid detail' },
      { title: 'A valid title', detail: '   ' },
    ],
    outcomes: [{ label: '', value: ' ', source: 'test' }],
    limitations: ['\t'],
    stack: [''],
  })

  expect(validateProjects([invalid])).toEqual(
    expect.arrayContaining([
      'blank required field: carekaki.name',
      'blank ownership item: carekaki',
      'blank system title: carekaki',
      'blank system detail: carekaki',
      'blank outcome label: carekaki',
      'blank outcome value: carekaki',
      'blank limitation item: carekaki',
      'blank stack item: carekaki',
    ]),
  )
})

test('requires evidence-bearing arrays and at least two system blocks', () => {
  const invalid = mutatedProject({
    capabilities: [],
    ownership: [],
    outcomes: [],
    limitations: [],
    stack: [],
    system: [{ title: 'Only block', detail: 'One block is not enough.' }],
  })

  expect(validateProjects([invalid])).toEqual(
    expect.arrayContaining([
      'missing capabilities: carekaki',
      'missing ownership: carekaki',
      'missing outcomes: carekaki',
      'missing limitation: carekaki',
      'missing stack: carekaki',
      'needs at least two system blocks: carekaki',
    ]),
  )
})

test('rejects a blank outcome source', () => {
  const invalid = mutatedProject({
    outcomes: [
      {
        ...validProject.outcomes[0],
        source: '' as Project['outcomes'][number]['source'],
      },
    ],
  })

  expect(validateProjects([invalid])).toContain('blank outcome source: carekaki')
})

test('rejects blank media source and alt text', () => {
  const invalid = mutatedProject({
    media: [{ src: ' ', alt: '\t', width: 1200, height: 800 }],
  })

  expect(validateProjects([invalid])).toEqual(
    expect.arrayContaining([
      'blank media source: carekaki',
      'blank media alt: carekaki',
    ]),
  )
})

test('rejects a blank optional contribution boundary when present', () => {
  const invalid = mutatedProject({ contributionBoundary: '   ' })

  expect(validateProjects([invalid])).toContain('blank contribution boundary: carekaki')
})

test.each([
  ['', 'invalid link: carekaki.live'],
  ['http://carekaki.test', 'invalid link: carekaki.live'],
  ['https://example.com/project', 'placeholder link: carekaki.live'],
  ['https://127.0.0.1/project', 'placeholder link: carekaki.live'],
  ['https://portfolio.invalid/project', 'placeholder link: carekaki.live'],
  ['https://', 'invalid link: carekaki.live'],
] as const)('rejects invalid or placeholder public link %j', (url, expectedError) => {
  const invalid = mutatedProject({ links: { live: url } })

  expect(validateProjects([invalid])).toContain(expectedError)
})

test.each(['2026-8-21', '2026-02-30', 'not-a-date'])(
  'rejects invalid verification date %s',
  (lastVerified) => {
    const invalid = mutatedProject({ lastVerified })

    expect(validateProjects([invalid])).toContain(`invalid verification date: carekaki`)
  },
)
