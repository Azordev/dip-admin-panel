import { FC, ReactNode } from 'react'

import BackHeader, { BackHeaderProps } from '../BackHeader'

interface Props extends BackHeaderProps {
  children: ReactNode
}

const UpdateFormLayout: FC<Props> = ({ children, commercialName, parentImageUrl }) => (
  <>
    <BackHeader commercialName={commercialName} parentImageUrl={parentImageUrl} />
    {children}
  </>
)

export default UpdateFormLayout
