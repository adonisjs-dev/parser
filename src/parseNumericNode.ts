import { SyntaxKind, Node } from 'ts-morph'

/**
 * Parse a numeric literal node.
 */
function parseNumericNode(node: Node): number | undefined {
  const literal = node.asKind(SyntaxKind.NumericLiteral)
  return literal?.getLiteralValue()
}

/**
 * Parse a numeric literal node or throw an error.
 */
function parseNumericNodeOrThrow(node: Node): number {
  const literal = node.asKindOrThrow(SyntaxKind.NumericLiteral)
  return literal.getLiteralValue()
}

export { parseNumericNode, parseNumericNodeOrThrow }
