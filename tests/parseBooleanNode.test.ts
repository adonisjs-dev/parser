import { Project, SourceFile } from 'ts-morph'
import { parseBooleanNode, parseBooleanNodeOrThrow } from '../src/parseBooleanNode'

describe('Parse a boolean literal node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile
  let file3: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const isCity = true\n`)
    file2 = project.createSourceFile('file2.ts', `const isCity = false\n`)
    file3 = project.createSourceFile('file3.ts', `const isCity = 0\n`)
  })

  describe('Parse a boolean literal node or undefined:', () => {
    test('TrueKeyword node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanNode(vdChildren[1])

      expect(value).toBe(true)
    })

    test('FalseKeyword node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanNode(vdChildren[1])

      expect(value).toBe(false)
    })

    test('incorrect node', () => {
      const vdNode = file3.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanNode(vdChildren[1])

      expect(value).toBeUndefined()
    })
  })

  describe('Parse a boolean literal node or throw:', () => {
    test('TrueKeyword node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanNodeOrThrow(vdChildren[1])

      expect(value).toBe(true)
    })

    test('FalseKeyword node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanNodeOrThrow(vdChildren[1])

      expect(value).toBe(false)
    })

    test('incorrect node', () => {
      const vdNode = file3.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()

      expect(() => parseBooleanNodeOrThrow(vdChildren[1])).toThrow()
    })
  })
})
