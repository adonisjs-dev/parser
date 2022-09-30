import LiteralKind from '../types/LiteralKind'

/**
 * The interface for the object which been wanted to parse.
 */
export default interface ObjectToParse {
  [key: string]: LiteralKind | Array<LiteralKind> | ObjectToParse
}
