import { SyntaxKind, Node } from 'ts-morph'

/**
 * Parse true or false nodes.
 */
function parseBooleanNode(node: Node): boolean | undefined {
  const trueLiteral = node.asKind(SyntaxKind.TrueKeyword)
  if (trueLiteral) return trueLiteral.getLiteralValue()

  const falseLiteral = node.asKind(SyntaxKind.FalseKeyword)
  if (falseLiteral) return falseLiteral.getLiteralValue()

  return undefined
}

/**
 * Parse true or false nodes or throw an error.
 */
function parseBooleanNodeOrThrow(node: Node): boolean {
  const trueLiteral = node.asKind(SyntaxKind.TrueKeyword)
  if (trueLiteral) return trueLiteral.getLiteralValue()

  const falseLiteral = node.asKindOrThrow(SyntaxKind.FalseKeyword)
  return falseLiteral.getLiteralValue()
}

export { parseBooleanNode, parseBooleanNodeOrThrow }
