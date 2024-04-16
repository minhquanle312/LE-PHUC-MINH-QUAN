import { useEffect, useMemo, useState } from 'react'
import { useExchangeRate } from '../context'
import classes from './ExchangeForm.module.css'
import { FormField } from './FormField'

export const ExchangeForm = () => {
  const { formattedData, tokenOptions } = useExchangeRate()

  const [lhsValue, setLhsValue] = useState<number>(1)
  const [lhsOption, setLhsOption] = useState<string>()
  const [rhsValue, setRhsValue] = useState<number>()
  const [rhsOption, setRhsOption] = useState<string>()

  const ratio = useMemo(() => {
    const calculatedRatio =
      formattedData[lhsOption || 0]?.[0].price /
      formattedData[rhsOption || 1]?.[0].price
    return isNaN(calculatedRatio) ? 0 : calculatedRatio
  }, [formattedData, lhsOption, rhsOption])

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
