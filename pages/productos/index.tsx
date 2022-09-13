import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import EmptyList from '@/components/EmptyList'
import { Product } from '@/services/GraphQL/products/types'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const providerId = sessionStorage.getItem('providerId')
      console.log(providerId)

      const { data } = await axios.get<{ products: Product[] }>('/api/providers/products', {
        headers: {
          providerId: providerId || '',
        },
      })
      setProducts(data.products)
    }

    getProducts()
  }, [])

  if (!products || products.length < 1) return <EmptyList text="No hay productos" />
  return (
    <ClientOnly>
      <ProductList products={products} />
    </ClientOnly>
  )
}

export default Products
