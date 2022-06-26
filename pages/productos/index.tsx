import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { PRODUCTS } from '@/services/GraphQL/products/queries'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Products: NextPage = () => {
  const { data, loading, queryError } = useQuery(PRODUCTS)
  const { error: logError } = useLogger()

  if (queryError) logError(queryError, 'pages/productos/index.tsx', 'No se pudo obtener la lista de eventos')

  if (loading) return <Loading />
  if (!data || !data.products) return <EmptyList text="No hay suscripciones" />
  return (
    <ClientOnly>
      <ProductList products={data.products} />
    </ClientOnly>
  )
}

export default Products
