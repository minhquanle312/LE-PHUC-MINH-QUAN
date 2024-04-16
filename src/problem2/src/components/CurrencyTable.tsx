import { ReactSVG } from 'react-svg'

import { BASE_URL_SVG, MAPPING_EDGE_CASE_ICON } from '../constants'
import { useExchangeRate } from '../context'
import classes from './CurrencyTable.module.css'

export const CurrencyTable = () => {
  const { formattedData, tokenOptions } = useExchangeRate()

  return (
    <>
      <div className={classes['table-wrapper']}>
        <div className={classes['table-scroll']}>
          {tokenOptions.map((currency) => (
            <div key={currency} className={classes['card']}>
              <div className={classes['card-header']}>
                <div className={classes['currency-name']}>
                  <ReactSVG
                    src={`${BASE_URL_SVG}/${
                      MAPPING_EDGE_CASE_ICON?.[currency] || currency
                    }.svg`}
                  />
                  {currency}
                </div>
                <div>
                  {new Date(formattedData[currency][0].date).toLocaleString(
                    'en-US'
                  )}
                </div>
              </div>
              <div>
                <strong>Price: </strong>
                {formattedData[currency][0].price}
              </div>
            </div>
          ))}

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
                  <td>
                    <div className={classes['currency-name']}>
                      <ReactSVG
                        src={`${BASE_URL_SVG}/${
                          MAPPING_EDGE_CASE_ICON?.[currency] || currency
                        }.svg`}
                      />
                      {currency}
                    </div>
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

      {tokenOptions.map((currency) => (
        <div key={currency} className={classes['card']}>
          <div className={classes['card-header']}>
            <div className={classes['currency-name']}>
              <ReactSVG
                src={`${BASE_URL_SVG}/${
                  MAPPING_EDGE_CASE_ICON?.[currency] || currency
                }.svg`}
              />
              {currency}
            </div>
            <div>
              {new Date(formattedData[currency][0].date).toLocaleString(
                'en-US'
              )}
            </div>
          </div>
          <div>
            <strong>Price: </strong>
            {formattedData[currency][0].price}
          </div>
        </div>
      ))}
    </>
  )
}
