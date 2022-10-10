import { SyntaxKind, Node } from 'ts-morph'
import KindToTypeMappings from './types/KindToTypeMappings'
import { getLiteralParserByKind } from './getLiteralParser'
import LiteralKind from './types/LiteralKind'

/**
 * Parse an array expression node with the help of SyntaxKind.
 */
function parseArrayNodeAsKind<T extends LiteralKind>(node: Node, kind: T): Array<KindToTypeMappings[T]> | undefined {
  const arrayLiteral = node.asKind(SyntaxKind.ArrayLiteralExpression)
  if (arrayLiteral === undefined) return undefined

  const array: Array<KindToTypeMappings[T]> = []

  const elements = arrayLiteral.getElements()
  elements.forEach((elNode) => {
    const parser = getLiteralParserByKind(kind)
    const value = parser(elNode)
    if (value === undefined) return

    array.push(value)
  })

  return array
}

export { parseArrayNodeAsKind }
