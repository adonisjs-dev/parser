import { Project, SourceFile } from 'ts-morph'
import isUndefinedLiteral from '../../src/literals/isUndefinedLiteral'

describe('Is an undefined literal node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const name = undefined\n`)
    file2 = project.createSourceFile('file2.ts', `const name = 'b01010110'\n`)
  })

  test('undefined', () => {
    const vdNode = file1.getVariableDeclarationOrThrow('name')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = isUndefinedLiteral(vdChildren[1])

    expect(value).toBe(true)
  })

  test('incorrect node', () => {
    const vdNode = file2.getVariableDeclarationOrThrow('name')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = isUndefinedLiteral(vdChildren[1])

    expect(value).toBe(false)
  })
})
