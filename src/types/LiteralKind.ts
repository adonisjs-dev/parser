import { SyntaxKind } from 'ts-morph'

type LiteralKind = SyntaxKind.StringLiteral | SyntaxKind.NumericLiteral | SyntaxKind.BooleanKeyword

export default LiteralKind
