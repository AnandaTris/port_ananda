import { projectMarks } from './project-marks'
import { projects } from './projects'

const drawn = new Set(
  projects.flatMap((project) => (project.logo.kind === 'mark' ? [project.logo.name] : [])),
)

test('draws every mark it defines', () => {
  // The type already stops a project from naming a mark that does not exist.
  // This is the other direction: a mark left behind by a renamed or removed
  // project is dead geometry, and nothing else in the build would say so.
  expect([...Object.keys(projectMarks)].sort()).toEqual([...drawn].sort())
})

test('keeps every mark inside the shared 24-unit box', () => {
  for (const [name, mark] of Object.entries(projectMarks)) {
    expect(mark.title.trim(), name).not.toBe('')

    const coordinates = mark.d.match(/-?\d+(\.\d+)?/g) ?? []
    expect(coordinates.length, name).toBeGreaterThan(0)
    // The tiles are a set, so a mark that ran past the viewBox would clip
    // against the tile edge while the others floated free inside it.
    for (const value of coordinates) {
      expect(Math.abs(Number(value)), `${name} uses ${value}`).toBeLessThanOrEqual(24)
    }
  }
})
