import { SyntaxKind, Node } from 'ts-morph'
import ObjectToParse from '../interfaces/ObjectToParse'
import getLiteralParserByKind from '../getLiteralParser'
import { parseArrayLiteralAsKind } from './parseArrayLiteral'
import LiteralKind from '../types/LiteralKind'
import KindToTypeMappings from '../types/KindToTypeMappings'

/**
 * Parse an object literal expression node as Node with the help of an interface.
 */
function parseObjectLiteralAsInterface<T extends ObjectToParse>(
  node: Node,
  objectToParse: T
):
  | {
      [key in keyof T]?: T[key] extends Array<LiteralKind>
        ? Array<KindToTypeMappings[T[key][0]]>
        : T[key] extends LiteralKind
        ? KindToTypeMappings[T[key]]
        : ReturnType<typeof parseObjectLiteralAsInterface>
    }
  | undefined {
  const objectLiteral = node.asKind(SyntaxKind.ObjectLiteralExpression)
  if (objectLiteral === undefined) return undefined

  const result: { [key in keyof T]?: unknown } = {}

  const propertyAssignments = objectLiteral.getChildrenOfKind(SyntaxKind.PropertyAssignment)
  propertyAssignments.forEach((paNode) => {
    const paChildren = paNode.forEachChildAsArray()

    const identifier = paChildren[0].asKind(SyntaxKind.Identifier)
    if (identifier === undefined) return

    const key = identifier.getText() as keyof T
    if (!Object.prototype.hasOwnProperty.call(objectToParse, key)) return

    if (Array.isArray(objectToParse[key])) {
      const kind = objectToParse[key] as Array<LiteralKind>
      const value = parseArrayLiteralAsKind(paChildren[1], kind[0])
      if (value === undefined) return
      result[key] = value
    } else if (typeof objectToParse[key] === 'object') {
      const value = parseObjectLiteralAsInterface(paChildren[1], objectToParse[key] as ObjectToParse)
      if (value === undefined) return
      result[key] = value
    } else {
      const parser = getLiteralParserByKind(objectToParse[key] as LiteralKind)
      const value = parser(paChildren[1])
      if (value === undefined) return
      result[key] = value
    }
  })

  return result as {
    [key in keyof T]?: T[key] extends Array<LiteralKind>
      ? Array<KindToTypeMappings[T[key][0]]>
      : T[key] extends LiteralKind
      ? KindToTypeMappings[T[key]]
      : ReturnType<typeof parseObjectLiteralAsInterface>
  }
}

export { parseObjectLiteralAsInterface }
