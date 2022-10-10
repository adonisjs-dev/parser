import { SyntaxKind, Node } from 'ts-morph'

/**
 * Parse an identifier node.
 */
function parseIdentifierNode(node: Node): string | undefined {
  const identifier = node.asKind(SyntaxKind.Identifier)
  if (!identifier) return undefined

  return identifier.getText()
}

/**
 * Parse an identifier node or throw an error.
 */
function parseIdentifierNodeOrThrow(node: Node): string {
  const identifier = node.asKindOrThrow(SyntaxKind.Identifier)
  return identifier.getText()
}

export { parseIdentifierNode, parseIdentifierNodeOrThrow }
