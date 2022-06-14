import { FC, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const UpdateFormLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <h2>Update Form</h2>
      {children}
    </>
  )
}

export default UpdateFormLayout
