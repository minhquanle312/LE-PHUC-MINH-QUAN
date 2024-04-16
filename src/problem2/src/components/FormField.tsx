import classes from './FormField.module.css'

interface FormFieldProps {
  options: string[]
  option: string
  setOption: (option: string) => void
  value: number
  setValue: (value: number) => void
}

export const FormField: React.FC<FormFieldProps> = (props) => {
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
