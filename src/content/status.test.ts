import { renderToStaticMarkup } from 'react-dom/server'
import { ProjectIndex } from '@/components/home/ProjectIndex'
import { projects } from '@/content/projects'
import { statusDetails, statusLabels } from '@/content/status'

test('pins the maturity vocabulary the site actually says', () => {
  // The words are the point, so they are written out here rather than derived.
  // Four separate declarations of this list once drifted into "Live" on one
  // page and "Live product" on another; a spelling change should have to be
  // made twice — here and in the file — before it can reach a visitor.
  expect(statusLabels).toEqual({
    live: 'Shipped',
    'working-demo': 'In development',
    'source-backed': 'Completed',
    prototype: 'Prototype',
  })
})

test('gives every status a project uses a label and a tone', () => {
  for (const project of projects) {
    const detail = statusDetails[project.status]
    expect(detail, project.slug).toBeDefined()
    expect(detail.label, project.slug).not.toHaveLength(0)
  }
})

test('leaves no status declared that nothing on the site is', () => {
  // A vocabulary entry nobody uses is a word the site cannot say. `prototype`
  // is the one deliberate exception: it is the label an unreleased build would
  // get, kept so that adding one is a content change and not a code change.
  const used = new Set(projects.map((project) => project.status))
  const unused = Object.keys(statusDetails).filter((status) => !used.has(status as never))

  expect(unused).toEqual(['prototype'])
})

test('prints the label, never the internal status value, on the project index', () => {
  const html = renderToStaticMarkup(ProjectIndex())

  for (const project of projects) {
    expect(html).toContain(statusLabels[project.status])
  }
  expect(html).not.toContain('source-backed')
  expect(html).not.toContain('working-demo')
})
