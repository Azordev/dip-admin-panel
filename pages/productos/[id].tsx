import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyItem from '@/components/EmptyItem'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { PRODUCT_BY_ID } from '@/services/GraphQL/products/queries'
import ProductDetail from '@/views/Products/Detail'
import ClientOnly from '@/views/Shared/ClientOnly'

const Product: NextPage = () => {
  const { data, loading, error: queryError } = useQuery(PRODUCT_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (queryError) {
    LogError(queryError, 'Product.tsx', 'useQuery(PRODUCT_BY_ID)', 'UNEXPECTED')
    push('/productos')
  }

  if (loading) return <Loading className="center-text" />
  if (!data || !data.product) return <EmptyItem text="El producto esta vacío o es invalido." />
  return (
    <ClientOnly>
      <ProductDetail product={data.product} />
    </ClientOnly>
  )
}

export default Product
