import { FC, ReactNode } from 'react'

import BackHeader, { BackHeaderProps } from '../BackHeader'

interface Props extends BackHeaderProps {
  children: ReactNode
}

const UpdateFormLayout: FC<Props> = ({ children, parent }) => (
  <>
    <BackHeader parent={parent} />
    {children}
  </>
)

export default UpdateFormLayout
