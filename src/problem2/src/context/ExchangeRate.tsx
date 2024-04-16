import { PropsWithChildren, createContext, useContext } from 'react'
import { chain } from 'lodash'

import { Token } from '../models'
import { MOCK_DATA } from '../data'
import { sortByDate } from '../utils'

const ExchangeRateContext = createContext<{
  formattedData: Record<string, Token[]>
  tokenOptions: string[]
}>({ formattedData: {}, tokenOptions: [] })

export const useExchangeRate = () => useContext(ExchangeRateContext)

export const ExchangeRateProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const formattedData = chain(MOCK_DATA)
    .groupBy('currency')
    .mapValues((value: Token[]) => value.sort(sortByDate))
    .value()

  const tokenOptions = Object.keys(formattedData)

  return (
    <ExchangeRateContext.Provider value={{ formattedData, tokenOptions }}>
      {children}
    </ExchangeRateContext.Provider>
  )
}
