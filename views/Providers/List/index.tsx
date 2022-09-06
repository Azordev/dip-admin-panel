import Link from 'next/link'
import { FC } from 'react'

import ListHeader from '@/components/ListHeader'
import { Provider } from '@/services/GraphQL/providers/types'

const ProvidersList: FC<{ providers: Provider[] }> = ({ providers }) => (
  <div>
    <ListHeader createText="Añadir nuevo proveedor" createPath="/proveedores/crear" />

    {providers.map(provider => (
      <Link key={provider.id} href="/proveedores/[id]" as={`/proveedores/${provider.id}`}>
        <a>
          <h2>{provider.commercialName}</h2>
          <p>{provider.salesPhone}</p>
        </a>
      </Link>
    ))}
  </div>
)

export default ProvidersList
