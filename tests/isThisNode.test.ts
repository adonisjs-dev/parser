import { Project, SourceFile } from 'ts-morph'
import isThisNode from '../src/isThisNode'

describe('Is a this node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const name = this\n`)
    file2 = project.createSourceFile('file2.ts', `const name = 'b01010110'\n`)
  })

  test('this', () => {
    const vdNode = file1.getVariableDeclarationOrThrow('name')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = isThisNode(vdChildren[1])

    expect(value).toBe(true)
  })

  test('incorrect node', () => {
    const vdNode = file2.getVariableDeclarationOrThrow('name')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = isThisNode(vdChildren[1])

    expect(value).toBe(false)
  })
})
