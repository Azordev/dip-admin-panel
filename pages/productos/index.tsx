import axios from 'axios'
import type { NextPage } from 'next'
import { useCallback, useState } from 'react'

import ProductsContainers from '@/containers/Products/ProductsContainers'
import { Product } from '@/services/GraphQL/products/types'
import ClientOnly from '@/views/Shared/ClientOnly'

interface ProductResponse {
  products: Product[]
  products_aggregate: {
    aggregate: {
      totalCount: number
    }
  }
}

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [isLoading, setIsLoading] = useState<Boolean>(true)

  const getProducts = useCallback(async (limit: number, offset: number) => {
    const providerId = sessionStorage.getItem('providerId')
    const { data } = await axios.get<ProductResponse>('/api/providers/products', {
      headers: {
        providerId: providerId || '',
      },
      params: {
        limit,
        offset,
      },
    })
    setProducts(data.products)
    setTotalProducts(data.products_aggregate.aggregate.totalCount)
    setIsLoading(false)
  }, [])

  return (
    <ClientOnly>
      <ProductsContainers
        products={products}
        totalProducts={totalProducts}
        onchangePage={getProducts}
        loading={isLoading}
      />
    </ClientOnly>
  )
}

export default Products
