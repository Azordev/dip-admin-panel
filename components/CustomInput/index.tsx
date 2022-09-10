import { FC, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'

import { EventEditable } from '@/services/GraphQL/events/types'

import styles from './CustomInput.module.scss'

interface InputProps {
  register: UseFormRegister<EventEditable>
  id: string
  type: string
  label: string
  name: 'title' | 'date' | 'description' | 'type'
  placeholder: string
  defaultValue: string | number | undefined
  required?: boolean | string
  children?: ReactNode
}

const CustomInput: FC<InputProps> = ({
  register,
  id,
  type,
  label,
  name,
  placeholder,
  defaultValue,
  required = false,
  children,
}) => {
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
