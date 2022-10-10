import { SyntaxKind, Node } from 'ts-morph'
import LiteralKind from './types/LiteralKind'
import KindToTypeMappings from './types/KindToTypeMappings'
import { parseStringNode } from './parseStringNode'
import { parseNumericNode } from './parseNumericNode'
import { parseBooleanNode } from './parseBooleanNode'

/**
 * Get a literal parser by SyntaxKind.
 */
function getLiteralParserByKind<T extends LiteralKind>(kind: T): (node: Node) => KindToTypeMappings[T] | undefined {
  switch (kind) {
    case SyntaxKind.StringLiteral:
      return parseStringNode as (node: Node) => KindToTypeMappings[T] | undefined
    case SyntaxKind.NumericLiteral:
      return parseNumericNode as (node: Node) => KindToTypeMappings[T] | undefined
    case SyntaxKind.BooleanKeyword:
      return parseBooleanNode as (node: Node) => KindToTypeMappings[T] | undefined
    default:
      return parseStringNode as (node: Node) => KindToTypeMappings[T] | undefined
  }
}

export { getLiteralParserByKind }
