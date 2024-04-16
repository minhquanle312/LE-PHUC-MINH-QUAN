import { chain } from 'lodash'
import { ReactSVG } from 'react-svg'

import { MOCK_DATA } from '../data'
import { Token } from '../models'
import { sortByDate } from '../utils'
import classes from './CurrencyTable.module.css'

const BASE_URL_SVG =
  'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens'

/** Icon name does not match the file name */
const MAPPING_EDGE_CASE_ICON: Record<string, string> = {
  STEVMOS: 'stEVMOS',
  RATOM: 'rATOM',
  STOSMO: 'stOSMO',
  STATOM: 'stATOM',
  STLUNA: 'stLUNA',
}

export const CurrencyTable = () => {
  const formattedData = chain(MOCK_DATA)
    .groupBy('currency')
    .mapValues((value: Token[]) => value.sort(sortByDate))
    .value()

  return (
    <div className={classes['table-wrapper']}>
      <div className={classes['table-scroll']}>
        <table>
          <thead>
            <tr>
              <th>Cryptocurrency name</th>
              <th>Price, USD</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formattedData).map((currency) => (
              <tr key={currency}>
                <td className={classes['currency-name']}>
                  <ReactSVG
                    src={`${BASE_URL_SVG}/${
                      MAPPING_EDGE_CASE_ICON?.[currency] || currency
                    }.svg`}
                  />
                  {currency}
                </td>
                <td>{formattedData[currency][0].price}</td>
                <td>
                  {new Date(formattedData[currency][0].date).toLocaleString(
                    'en-US'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
