import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import useLogger from '@/hooks/useLogger'
import { PRODUCT_BY_ID } from '@/services/GraphQL/products/queries'
import { Product as ProductFields } from '@/services/GraphQL/products/types'
import ClientOnly from '@/views/Shared/ClientOnly'
import Image from '@/views/Shared/Image'

const Product: NextPage = () => {
  const { data: product, loading, error } = useQuery<ProductFields>(PRODUCT_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (error) {
    LogError(error, 'Product.tsx', 'useQuery(PRODUCT_BY_ID)', 'UNEXPECTED')
    push('/productos')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>
        {typeof product !== undefined && product ? (
          <div>
            {product.image_url && <Image src={product.image_url} alt="Product" />}
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>SOL/ {product.base_price_sol}</p>
            <p>{product.created_at}</p>
            <p>{product.updated_at}</p>
          </div>
        ) : (
          <></>
        )}
      </ClientOnly>
    </div>
  )
}

export default Product
