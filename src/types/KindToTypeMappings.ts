import { SyntaxKind } from 'ts-morph'

type KindToTypeMappings = {
  [SyntaxKind.StringLiteral]: string
  [SyntaxKind.NumericLiteral]: number
  [SyntaxKind.BooleanKeyword]: boolean
}

export default KindToTypeMappings
