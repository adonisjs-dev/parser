import { Project, SourceFile } from 'ts-morph'
import { parseIdentifierNode, parseIdentifierNodeOrThrow } from '../src/parseIdentifierNode'

describe('Parse an identifier node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const sib = 'Novosibirsk'\nconst city = sib\n`)
    file2 = project.createSourceFile('file2.ts', `const city = false\n`)
  })

  describe('Parse an identifier node or undefined:', () => {
    test('an identifier node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseIdentifierNode(vdChildren[1])

      expect(value).toBe('sib')
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseIdentifierNode(vdChildren[1])

      expect(value).toBeUndefined()
    })
  })

  describe('Parse an identifier node or throw:', () => {
    test('an identifier node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseIdentifierNodeOrThrow(vdChildren[1])

      expect(value).toBe('sib')
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()

      expect(() => parseIdentifierNodeOrThrow(vdChildren[1])).toThrow()
    })
  })
})
