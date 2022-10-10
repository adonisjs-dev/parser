import { SyntaxKind, Node } from 'ts-morph'

/**
 * Is a null node.
 */
export default function isNullNode(node: Node): boolean {
  return node.isKind(SyntaxKind.NullKeyword)
}
