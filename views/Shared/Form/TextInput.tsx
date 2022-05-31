import React from 'react'
import styles from './Form.module.scss'

interface Props {
  placeholder?: string
}

const TextInput: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(function TextInput(
  { placeholder, ...rest },
  ref,
) {
  return <input type="text" placeholder={placeholder} ref={ref} className={`shadow ${styles.input}`} {...rest} />
})

export default TextInput
