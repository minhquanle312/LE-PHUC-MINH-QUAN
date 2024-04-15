import { groupBy } from 'lodash'
import { ReactSVG } from 'react-svg'

import styles from './CurrencyTable.module.css'
import { MOCK_DATA } from '../data'

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
  const formattedData = groupBy(MOCK_DATA, 'currency')
  console.log('formatted MOCK_DATA:: ', formattedData)

  return (
    <div className={styles['table-wrapper']}>
      <div className={styles['table-scroll']}>
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
                <td className={styles['currency-name']}>
                  <ReactSVG
                    src={`${BASE_URL_SVG}/${
                      MAPPING_EDGE_CASE_ICON?.[currency] || currency
                    }.svg`}
                  />
                  {currency}
                </td>
                <td>{formattedData[currency][0].price}</td>
                <td>{formattedData[currency][0].date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
