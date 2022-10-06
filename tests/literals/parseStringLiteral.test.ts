import { Project, SourceFile } from 'ts-morph'
import { parseStringLiteral, parseStringLiteralOrThrow } from '../../src/literals/parseStringLiteral'

describe('Parse a string literal:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const city = 'Novosibirsk'\n`)
    file2 = project.createSourceFile('file2.ts', `const city = 54\n`)
  })

  describe('Parse a string literal or undefined:', () => {
    test('StringLiteral node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseStringLiteral(vdChildren[1])

      expect(value).toBe('Novosibirsk')
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseStringLiteral(vdChildren[1])

      expect(value).toBeUndefined()
    })
  })

  describe('Parse a string literal or throw:', () => {
    test('StringLiteral node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseStringLiteralOrThrow(vdChildren[1])

      expect(value).toBe('Novosibirsk')
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('city')
      const vdChildren = vdNode.forEachChildAsArray()

      expect(() => parseStringLiteralOrThrow(vdChildren[1])).toThrow()
    })
  })
})
