import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import useAuth from '@/hooks/useAuth'
import { Product } from '@/services/GraphQL/products/types'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const getProducts = async () => {
      const providerId = sessionStorage.getItem('providerId')

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
      <>
        <ListHeader
          createPath={`/productos/crear`}
          createText="Añadir nuevo producto"
          logoUrl={user?.providerInfo.logoUrl}
          altLogo={user?.providerInfo.commercialName}
        />
        <ProductList products={products} />
      </>
    </ClientOnly>
  )
}

export default Products
