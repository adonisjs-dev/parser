import { Project, SourceFile } from 'ts-morph'
import isNullLiteral from '../../src/literals/isNullLiteral'

describe('Is a null literal node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const name = null\n`)
    file2 = project.createSourceFile('file2.ts', `const name = 'b01010110'\n`)
  })

  test('null', () => {
    const vdNode = file1.getVariableDeclarationOrThrow('name')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = isNullLiteral(vdChildren[1])

    expect(value).toBe(true)
  })

  test('incorrect node', () => {
    const vdNode = file2.getVariableDeclarationOrThrow('name')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = isNullLiteral(vdChildren[1])

    expect(value).toBe(false)
  })
})
