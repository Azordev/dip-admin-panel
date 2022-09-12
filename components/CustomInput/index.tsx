import { ReactNode } from 'react'
import { Path, UseFormRegister } from 'react-hook-form'

import styles from './CustomInput.module.scss'

type InputProps<T> = {
  register: UseFormRegister<T>
  id: string
  type?: string
  label: string
  name: Path<T>
  placeholder: string
  defaultValue?: string | number
  required?: boolean | string
  children?: ReactNode
}

const CustomInput = <T,>({
  register,
  id,
  type = 'text',
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
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
        {...register(name, { required })}
      />
      {children}
    </div>
  )
}

export default CustomInput
