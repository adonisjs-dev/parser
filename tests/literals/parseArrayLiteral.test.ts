import { Project, SourceFile, SyntaxKind } from 'ts-morph'
import { parseArrayLiteralAsKind } from '../../src/literals/parseArrayLiteral'

describe('Parse an array literal expression as kind:', () => {
  let project: Project

  let file1full: SourceFile
  let file1part: SourceFile
  let file1empty: SourceFile

  let file2full: SourceFile
  let file2part: SourceFile
  let file2empty: SourceFile

  let file3full: SourceFile
  let file3part: SourceFile
  let file3empty: SourceFile

  let file4: SourceFile

  beforeAll(() => {
    project = new Project()

    file1full = project.createSourceFile('file1full.ts', `const states = ['Washington', 'California', 'Florida']\n`)
    file1part = project.createSourceFile('file1part.ts', `const states = ['Washington', 1234, true, 'Florida']\n`)
    file1empty = project.createSourceFile('file1empty.ts', `const states = [1234, true, null, 0]\n`)

    file2full = project.createSourceFile('file2full.ts', `const statesPop = [7705281, 39538223, 21538187]\n`)
    file2part = project.createSourceFile('file2part.ts', `const statesPop = [false, '7705281', 39538223, '21538187']\n`)
    file2empty = project.createSourceFile('file2empty.ts', `const statesPop = [false, '7705281', '', null]\n`)

    file3full = project.createSourceFile('file3full.ts', `const flags = [true, false, true]\n`)
    file3part = project.createSourceFile('file3part.ts', `const flags = [1, false, 0, true, '']\n`)
    file3empty = project.createSourceFile('file3empty.ts', `const flags = [1, 'Washington', 0, '']\n`)

    file4 = project.createSourceFile('file4.ts', `const notArr = false\n`)
  })

  describe('Parse an array literal expression as StringLiteral kind:', () => {
    test('full of StringLiteral nodes', () => {
      const vdNode = file1full.getVariableDeclarationOrThrow('states')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.StringLiteral)

      expect(value).toEqual(['Washington', 'California', 'Florida'])
    })

    test('part of StringLiteral nodes', () => {
      const vdNode = file1part.getVariableDeclarationOrThrow('states')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.StringLiteral)

      expect(value).toEqual(['Washington', 'Florida'])
    })

    test('empty array', () => {
      const vdNode = file1empty.getVariableDeclarationOrThrow('states')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.StringLiteral)

      expect(value).toEqual([])
    })

    test('incorrect node', () => {
      const vdNode = file4.getVariableDeclarationOrThrow('notArr')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.StringLiteral)

      expect(value).toBeUndefined()
    })
  })

  describe('Parse an array literal expression as NumericLiteral kind:', () => {
    test('full of NumericLiteral nodes', () => {
      const vdNode = file2full.getVariableDeclarationOrThrow('statesPop')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.NumericLiteral)

      expect(value).toEqual([7705281, 39538223, 21538187])
    })

    test('part of NumericLiteral nodes', () => {
      const vdNode = file2part.getVariableDeclarationOrThrow('statesPop')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.NumericLiteral)

      expect(value).toEqual([39538223])
    })

    test('empty array', () => {
      const vdNode = file2empty.getVariableDeclarationOrThrow('statesPop')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.NumericLiteral)

      expect(value).toEqual([])
    })

    test('incorrect node', () => {
      const vdNode = file4.getVariableDeclarationOrThrow('notArr')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.NumericLiteral)

      expect(value).toBeUndefined()
    })
  })

  describe('Parse an array literal expression as BooleanKeyword kind:', () => {
    test('full of BooleanKeyword nodes', () => {
      const vdNode = file3full.getVariableDeclarationOrThrow('flags')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.BooleanKeyword)

      expect(value).toEqual([true, false, true])
    })

    test('part of BooleanKeyword nodes', () => {
      const vdNode = file3part.getVariableDeclarationOrThrow('flags')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.BooleanKeyword)

      expect(value).toEqual([false, true])
    })

    test('empty array', () => {
      const vdNode = file3empty.getVariableDeclarationOrThrow('flags')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.BooleanKeyword)

      expect(value).toEqual([])
    })

    test('incorrect node', () => {
      const vdNode = file4.getVariableDeclarationOrThrow('notArr')
      const vdChildren = vdNode.forEachChildAsArray()
      const value = parseArrayLiteralAsKind(vdChildren[1], SyntaxKind.BooleanKeyword)

      expect(value).toBeUndefined()
    })
  })
})
