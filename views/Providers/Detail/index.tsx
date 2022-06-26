import { FC } from 'react'

import { Provider } from '@/services/GraphQL/providers/types'
import Image from '@/views/Shared/Image'

const ProviderDetail: FC<{ provider: Provider }> = ({ provider }) => (
  <div>
    {provider.avatarUrl && <Image src={provider.avatarUrl} alt="avatar" />}
    <h1>{provider.commercialName}</h1>
    <p>{provider.salesEmail}</p>
    <p>{provider.salesPhone}</p>
    <p>{provider.address}</p>
    <p>{provider.createdAt}</p>
    <p>{provider.updatedAt}</p>
  </div>
)

export default ProviderDetail
