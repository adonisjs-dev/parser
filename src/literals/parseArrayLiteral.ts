import { SyntaxKind, Node } from 'ts-morph'
import KindToTypeMappings from '../types/KindToTypeMappings'
import getLiteralParserByKind from '../getLiteralParser'
import LiteralKind from '../types/LiteralKind'

/**
 * Parse an array literal expression node as Node with the help of SyntaxKind.
 */
function parseArrayLiteralAsKind<T extends LiteralKind>(node: Node, kind: T): Array<KindToTypeMappings[T]> | undefined {
  const arrayLiteral = node.asKind(SyntaxKind.ArrayLiteralExpression)
  if (arrayLiteral === undefined) return undefined

  const array: Array<KindToTypeMappings[T]> = []

  const elements = arrayLiteral.getElements()
  elements.forEach((elNode) => {
    const parser = getLiteralParserByKind(kind)
    if (parser === undefined) return

    const value = parser(elNode)
    if (value === undefined) return

    array.push(value)
  })

  return array
}

export { parseArrayLiteralAsKind }
