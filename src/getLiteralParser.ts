import { SyntaxKind, Node } from 'ts-morph'
import LiteralKind from './types/LiteralKind'
import KindToTypeMappings from './types/KindToTypeMappings'
import { parseStringLiteral, parseNumericLiteral, parseBooleanLiteral } from './literals'

/**
 * Get a literal parser by SyntaxKind.
 */
export default function getLiteralParserByKind<T extends LiteralKind>(
  kind: T
): (node: Node) => KindToTypeMappings[T] | undefined {
  switch (kind) {
    case SyntaxKind.StringLiteral:
      return parseStringLiteral as (node: Node) => KindToTypeMappings[T] | undefined
    case SyntaxKind.NumericLiteral:
      return parseNumericLiteral as (node: Node) => KindToTypeMappings[T] | undefined
    case SyntaxKind.BooleanKeyword:
      return parseBooleanLiteral as (node: Node) => KindToTypeMappings[T] | undefined
    default:
      return parseStringLiteral as (node: Node) => KindToTypeMappings[T] | undefined
  }
}
