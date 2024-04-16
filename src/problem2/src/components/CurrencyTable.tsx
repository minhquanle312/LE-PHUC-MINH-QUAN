import { ReactSVG } from 'react-svg'

import { BASE_URL_SVG, MAPPING_EDGE_CASE_ICON } from '../constants'
import { useExchangeRate } from '../context'
import classes from './CurrencyTable.module.css'

export const CurrencyTable = () => {
  const { formattedData, tokenOptions } = useExchangeRate()

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
            {tokenOptions.map((currency) => (
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
