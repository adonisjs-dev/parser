import { SyntaxKind, Node } from 'ts-morph'

/**
 * Parse a string literal node as Node.
 */
function parseStringLiteral(node: Node): string | undefined {
  const literal = node.asKind(SyntaxKind.StringLiteral)
  return literal?.getLiteralValue()
}

/**
 * Parse a string literal node as Node or throw an error.
 */
function parseStringLiteralOrThrow(node: Node): string {
  const literal = node.asKindOrThrow(SyntaxKind.StringLiteral)
  return literal.getLiteralValue()
}

export { parseStringLiteral, parseStringLiteralOrThrow }
