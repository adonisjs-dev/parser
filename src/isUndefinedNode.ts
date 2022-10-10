import { SyntaxKind, Node } from 'ts-morph'

/**
 * Is an undefined node.
 */
export default function isUndefinedNode(node: Node): boolean {
  const identifier = node.asKind(SyntaxKind.Identifier)
  if (!identifier) return false

  return identifier.getText() === 'undefined'
}
