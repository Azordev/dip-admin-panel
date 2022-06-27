import { FC } from 'react'

import { Provider } from '@/services/GraphQL/providers/types'
import Image from '@/views/Shared/Image'

const ProviderDetail: FC<{ provider: Provider }> = ({ provider }) => (
  <div>
    {provider.logoUrl && <Image src={provider.logoUrl} alt="avatar" />}
    <h1>{provider.commercialName}</h1>
    <p>{provider.salesPhone}</p>
    <p>{provider.createdAt}</p>
    <p>{provider.updatedAt}</p>
  </div>
)

export default ProviderDetail
