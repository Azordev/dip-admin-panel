import { ReactNode } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

import styles from './CustomInput.module.scss'

type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  id: string
  type?: string
  label: string
  name: Path<T>
  placeholder: string
  defaultValue?: string | number
  required?: string
  children?: ReactNode
}

const CustomInput = <T extends FieldValues>({
  register,
  id,
  type = 'text',
  label,
  name,
  placeholder,
  defaultValue,
  required = 'El campo no puede estar vacio',
  children,
}: InputProps<T>): JSX.Element => {
  return (
    <div className={styles['custom-input']}>
      <label htmlFor={id} className={styles['label-input']}>
        {label}
      </label>
      <input
        className={styles.input}
        placeholder={placeholder}
        id={id}
        type={type}
        defaultValue={defaultValue}
        {...register(name, { required: { value: true, message: required } })}
      />
      {children}
    </div>
  )
}

export default CustomInput
