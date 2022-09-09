import { FC } from 'react'
import { useController, UseControllerProps, useFormContext, useFormState } from 'react-hook-form'

import styles from './Input.module.scss'

interface InputProps extends UseControllerProps {
  type: string
  label?: string
  name: string
  autocomplete: 'off' | 'on'
}

const Input: FC<InputProps> = props => {
  const { label, name, type, rules, defaultValue, autocomplete, ...rest } = props
  const formContext = useFormContext()
  const { errors } = useFormState()
  const { field } = useController({ name, rules, defaultValue })
  const { value } = field
  const error = errors[name]

  if (!formContext) return null
  const { register } = formContext

  return (
    <div className={styles.container}>
      {label && <label>{label}</label>}
      <input type={type} value={value} {...register(name, { ...rest })} autoComplete={autocomplete} />
      {error?.message && <small className="text-red-500">{error.message}</small>}
    </div>
  )
}

export default Input
