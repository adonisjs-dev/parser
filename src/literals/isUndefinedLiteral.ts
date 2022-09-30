import { SyntaxKind, Node } from 'ts-morph'

/**
 * Is an undefined literal node.
 */
export default function isUndefinedLiteral(node: Node): boolean {
  const identifier = node.asKind(SyntaxKind.Identifier)
  if (!identifier) return false

  return identifier.getText() === 'undefined'
}
