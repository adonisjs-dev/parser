import { Project, SourceFile } from 'ts-morph'
import { parseStringNode, parseStringNodeOrThrow } from '../src/parseStringNode'

describe('Parse a string literal node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const city = 'Novosibirsk'\n`)
    file2 = project.createSourceFile('file2.ts', `const city = 54\n`)
  })

  describe('Parse a string literal node or undefined:', () => {
    test('StringLiteral node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseStringNode(vdChildren[1])

      expect(value).toBe('Novosibirsk')
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseStringNode(vdChildren[1])

      expect(value).toBeUndefined()
    })
  })

  describe('Parse a string literal node or throw:', () => {
    test('StringLiteral node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseStringNodeOrThrow(vdChildren[1])

      expect(value).toBe('Novosibirsk')
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()

      expect(() => parseStringNodeOrThrow(vdChildren[1])).toThrow()
    })
  })
})
