import { Project, SourceFile } from 'ts-morph'
import { parseNumericNode, parseNumericNodeOrThrow } from '../src/parseNumericNode'

describe('Parse a numeric literal node:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile

  beforeAll(() => {
    project = new Project()
    file1 = project.createSourceFile('file1.ts', `const cityCode = 54\n`)
    file2 = project.createSourceFile('file2.ts', `const cityCode = 'Novosibirsk'\n`)
  })

  describe('Parse a numeric literal node or undefined:', () => {
    test('NumericLiteral node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('cityCode')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseNumericNode(vdChildren[1])

      expect(value).toBe(54)
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('cityCode')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseNumericNode(vdChildren[1])

      expect(value).toBeUndefined()
    })
  })

  describe('Parse a numeric literal node or throw:', () => {
    test('NumericLiteral node', () => {
      const vdNode = file1.getVariableDeclarationOrThrow('cityCode')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseNumericNodeOrThrow(vdChildren[1])

      expect(value).toBe(54)
    })

    test('incorrect node', () => {
      const vdNode = file2.getVariableDeclarationOrThrow('cityCode')
      const vdChildren = vdNode.forEachChildAsArray()

      expect(() => parseNumericNodeOrThrow(vdChildren[1])).toThrow()
    })
  })
})
