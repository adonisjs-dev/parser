import { SyntaxKind, Node } from 'ts-morph'

/**
 * Is a this node.
 */
export default function isThisNode(node: Node): boolean {
  return node.isKind(SyntaxKind.ThisKeyword)
}
