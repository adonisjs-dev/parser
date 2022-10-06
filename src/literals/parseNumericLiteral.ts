import { SyntaxKind, Node } from 'ts-morph'

/**
 * Parse a numeric literal node as Node.
 */
function parseNumericLiteral(node: Node): number | undefined {
  const literal = node.asKind(SyntaxKind.NumericLiteral)
  return literal?.getLiteralValue()
}

/**
 * Parse a numeric literal node as Node or throw an error.
 */
function parseNumericLiteralOrThrow(node: Node): number {
  const literal = node.asKindOrThrow(SyntaxKind.NumericLiteral)
  return literal.getLiteralValue()
}

export { parseNumericLiteral, parseNumericLiteralOrThrow }
