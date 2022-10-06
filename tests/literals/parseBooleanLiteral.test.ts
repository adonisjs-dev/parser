import { Project, SourceFile } from 'ts-morph'
import { parseBooleanLiteral, parseBooleanLiteralOrThrow } from '../../src/literals/parseBooleanLiteral'

describe('Parse a boolean literal:', () => {
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

  describe('Parse a boolean literal or undefined:', () => {
    test('TrueKeyword node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanLiteral(vdChildren[1])

      expect(value).toBe(true)
    })

    test('FalseKeyword node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanLiteral(vdChildren[1])

      expect(value).toBe(false)
    })

    test('incorrect node', () => {
      const vdNode = file3.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanLiteral(vdChildren[1])

      expect(value).toBeUndefined()
    })
  })

  describe('Parse a boolean literal or throw:', () => {
    test('TrueKeyword node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanLiteralOrThrow(vdChildren[1])

      expect(value).toBe(true)
    })

    test('FalseKeyword node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseBooleanLiteralOrThrow(vdChildren[1])

      expect(value).toBe(false)
    })

    test('incorrect node', () => {
      const vdNode = file3.getVariableDeclarationOrThrow('isCity')
      const vdChildren = vdNode.forEachChildAsArray()

      expect(() => parseBooleanLiteralOrThrow(vdChildren[1])).toThrow()
    })
  })
})
