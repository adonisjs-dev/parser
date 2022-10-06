import { SyntaxKind, Node } from 'ts-morph'

/**
 * Is a null literal node.
 */
export default function isNullLiteral(node: Node): boolean {
  return node.isKind(SyntaxKind.NullKeyword)
}
