import { Token } from '../models'

/**
 * @description sorting token array to descending of last date updated
 */
export const sortByDate = (lhs: Token, rhs: Token) =>
  new Date(rhs.date).getTime() - new Date(lhs.date).getTime()
