import { SyntaxKind, Node } from 'ts-morph'

/**
 * Parse a string literal node.
 */
function parseStringNode(node: Node): string | undefined {
  const literal = node.asKind(SyntaxKind.StringLiteral)
  return literal?.getLiteralValue()
}

/**
 * Parse a string literal node or throw an error.
 */
function parseStringNodeOrThrow(node: Node): string {
  const literal = node.asKindOrThrow(SyntaxKind.StringLiteral)
  return literal.getLiteralValue()
}

export { parseStringNode, parseStringNodeOrThrow }
