import { chain } from 'lodash'
import { MOCK_DATA } from '../data'
import { Token } from '../models'
import { sortByDate } from '../utils'

import classes from './ExchangeForm.module.css'
import { useEffect, useState } from 'react'

interface FormFieldProps {
  options: string[]
  option: string
  setOption: (option: string) => void
  value: number
  setValue: (value: number) => void
}

const FormField: React.FC<FormFieldProps> = (props) => {
  const { options, option, setOption, value, setValue } = props

  return (
    <div className={classes['form-field']}>
      <label htmlFor="lhs-value"></label>
      <input
        type="number"
        id="lhs-value"
        name="lhs-value"
        value={value}
        onChange={(value) => setValue(+value.target.value)}
      />
      <div className={classes['divider']} />
      <label htmlFor="lhs-currency"></label>
      <select
        name="lhs-currency"
        id="lhs-currency"
        onChange={(event) => setOption(event.target.value)}
        value={option}
      >
        {options.map((token) => (
          <option key={token} value={token}>
            {token}
          </option>
        ))}
      </select>
    </div>
  )
}

export const ExchangeForm = () => {
  const [lhsValue, setLhsValue] = useState<number>(1)
  const [lhsOption, setLhsOption] = useState<string>()
  const [rhsValue, setRhsValue] = useState<number>()
  const [rhsOption, setRhsOption] = useState<string>()

  const formattedData = chain(MOCK_DATA)
    .groupBy('currency')
    .mapValues((value: Token[]) => value.sort(sortByDate))
    .value()

  const tokenOptions = Object.keys(formattedData)

  const ratio =
    formattedData[lhsOption || 0]?.[0].price /
    formattedData[rhsOption || 1]?.[0].price

  useEffect(() => {
    lhsOption ?? setLhsOption(tokenOptions[0])
    rhsOption ?? setRhsOption(tokenOptions[1])
  }, [lhsOption, rhsOption, tokenOptions])

  useEffect(() => {
    setRhsValue(lhsValue * ratio || 0)
  }, [ratio, lhsValue])

  return (
    <div className={classes['form-wrapper']}>
      <article>
        1 {lhsOption} equals <strong>{ratio}</strong> {rhsOption}
      </article>
      <div className={classes['form-exchange']}>
        <FormField
          options={tokenOptions}
          option={lhsOption ?? tokenOptions[0]}
          setOption={(value) => {
            // NOTE: swap 2 option
            if (value === rhsOption) setRhsOption(lhsOption)
            setLhsOption(value)
          }}
          value={lhsValue}
          setValue={(value) => {
            setLhsValue(value)
            setRhsValue(value * ratio || 0)
          }}
        />
        <FormField
          options={tokenOptions}
          option={rhsOption ?? tokenOptions[1]}
          setOption={(value) => {
            // NOTE: swap 2 option
            if (value === lhsOption) setLhsOption(rhsOption)
            setRhsOption(value)
          }}
          value={rhsValue ?? ratio ?? 0}
          setValue={(value) => {
            setRhsValue(value)
            setLhsValue(value / ratio || 0)
          }}
        />
      </div>
    </div>
  )
}
