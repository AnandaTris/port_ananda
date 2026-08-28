import { projects } from './projects'
import { stackGroups } from './stack'
import { stackIcons } from './stack-icons'

const grouped = stackGroups.flatMap((group) => group.items)
const used = [...new Set(projects.flatMap((project) => project.stack))]

test('names every tool the projects actually use, and no others', () => {
  // Both directions matter. A missing item means the stack section quietly
  // under-reports the work; an extra one is a tool claimed on a portfolio that
  // no project on the site can back up.
  expect([...grouped].sort()).toEqual([...used].sort())
})

test('files each tool under exactly one group', () => {
  expect(grouped).toHaveLength(new Set(grouped).size)
})

test('draws a brand mark only for a tool the site actually lists', () => {
  // A stale key here would be silent — `StackIcon` renders nothing it cannot
  // match — so a tool renamed in `stack.ts` would quietly lose its logo. This
  // fails instead, and points at the key that no longer has a chip.
  for (const item of Object.keys(stackIcons)) {
    expect(grouped).toContain(item)
  }
})

test('gives every group a name and at least one tool', () => {
  for (const group of stackGroups) {
    expect(group.name.trim()).not.toBe('')
    expect(group.items.length).toBeGreaterThan(0)
  }
})
