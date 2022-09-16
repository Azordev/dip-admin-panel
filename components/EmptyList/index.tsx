import { FC } from 'react'

const EmptyList: FC<{ text: string; className?: string }> = ({ text, className }) => (
  <h3 className={className}>{text}</h3>
)

export default EmptyList
