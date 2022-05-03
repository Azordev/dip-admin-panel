import React from 'react'

interface Props {
  placeholder?: string
  [key: string]: any
}

const TextInput: React.FC<Props> = React.forwardRef<HTMLInputElement, Props>(({placeholder, ...rest}, ref) => (
  <input type="text" placeholder={placeholder} ref={ref} {...rest} />
))

export default TextInput
