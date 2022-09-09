import { FC } from 'react'
import { useController, UseControllerProps, useFormContext, useFormState } from 'react-hook-form'

interface TextareaProps extends UseControllerProps {
  label?: string
  name: string
  autocomplete?: 'off' | 'on'
}

const Textarea: FC<TextareaProps> = props => {
  const { label, name, rules, defaultValue, autocomplete, ...rest } = props
  const formContext = useFormContext()
  const { errors } = useFormState()
  const { field } = useController({ name, rules, defaultValue })
  const { value } = field
  const error = errors[name]

  if (!formContext) return null
  const { register } = formContext

  return (
    <div>
      {label && <label>{label}</label>}
      <textarea value={value} {...register(name, { ...rest })} autoComplete={autocomplete} />
      {error?.message && <small className="text-red-500">{error.message}</small>}
    </div>
  )
}

export default Textarea
