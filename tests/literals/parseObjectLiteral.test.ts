import { Project, SourceFile, SyntaxKind } from 'ts-morph'
import { parseObjectLiteralAsInterface } from '../../src/literals/parseObjectLiteral'
import ObjectToParse from '../../src/interfaces/ObjectToParse'

describe('Parse an object literal expression as an interface:', () => {
  let project: Project
  let file1: SourceFile
  let file2: SourceFile
  let file3: SourceFile
  let file4: SourceFile

  const personObj: ObjectToParse = {
    name: SyntaxKind.StringLiteral,
    age: SyntaxKind.NumericLiteral,
    hasGreencard: SyntaxKind.BooleanKeyword,
    knowledge: {
      frameworks: [SyntaxKind.StringLiteral],
    },
    flags: [SyntaxKind.BooleanKeyword],
    salaryFork: [SyntaxKind.NumericLiteral],
  }

  beforeAll(() => {
    project = new Project()

    file1 = project.createSourceFile(
      'file1.ts',
      `const person = {
        name: 'Vlad',
        age: 31,
        hasGreencard: false,
        knowledge: {
          frameworks: ['vue', 'nuxt', 'adonis'],
        },
        flags: [true, false, true, true],
        salaryFork: [10000, 20000],
      }\n`
    )

    file2 = project.createSourceFile(
      'file2.ts',
      `const person = {
        name: 10110010,
        age: 11,
        hasGreencard: '',
        knowledge: {
          frameworks: false,
        },
        flags: ['', 0, true, true],
        salaryFork: ['$120k', 10000, 20000, '$15000'],
        anotherKey: 'just field',
      }\n`
    )

    file3 = project.createSourceFile(
      'file3.ts',
      `const person = {
        name: 10110010,
        age: false,
        hasGreencard: '',
        flags: true,
        salaryFork: 10000,
        anotherKey: 'just field',
      }\n`
    )

    file4 = project.createSourceFile('file4.ts', `const person = 'b01010110'\n`)
  })

  test('full object', () => {
    const vdNode = file1.getVariableDeclarationOrThrow('person')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = parseObjectLiteralAsInterface(vdChildren[1], personObj)

    const person = {
      name: 'Vlad',
      age: 31,
      hasGreencard: false,
      knowledge: {
        frameworks: ['vue', 'nuxt', 'adonis'],
      },
      flags: [true, false, true, true],
      salaryFork: [10000, 20000],
    }

    expect(value).toEqual(person)
  })

  test('partial object', () => {
    const vdNode = file2.getVariableDeclarationOrThrow('person')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = parseObjectLiteralAsInterface(vdChildren[1], personObj)

    const person = {
      age: 11,
      knowledge: {},
      flags: [true, true],
      salaryFork: [10000, 20000],
    }

    expect(value).toEqual(person)
  })

  test('empty object', () => {
    const vdNode = file3.getVariableDeclarationOrThrow('person')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = parseObjectLiteralAsInterface(vdChildren[1], personObj)

    expect(value).toEqual({})
  })

  test('incorrect node', () => {
    const vdNode = file4.getVariableDeclarationOrThrow('person')
    const vdChildren = vdNode.forEachChildAsArray()
    const value = parseObjectLiteralAsInterface(vdChildren[1], personObj)

    expect(value).toBeUndefined()
  })
})
