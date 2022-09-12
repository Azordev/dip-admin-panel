import { FC, ReactNode } from 'react'

import Icon8 from '@/views/Shared/Icons8'

import styles from './Button.module.scss'
interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  iconSize?: number
  iconName?: string
  iconStyle?: string
  color?: string
}

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  className,
  iconSize,
  iconName,
  iconStyle = 'ios-filled',
  type = 'button',
  color = '#fff',
}) => {
  return (
    <button type={type} className={`${className} ${styles.button}`} onClick={onClick}>
      {!!iconName && (
        <Icon8 color={color} name={iconName} size={iconSize} iconStyle={iconStyle} className={styles['icon-button']} />
      )}
      <p>{children}</p>
    </button>
  )
}

export default Button
