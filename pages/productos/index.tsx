import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import useAuth from '@/hooks/useAuth'
import { Product } from '@/services/GraphQL/products/types'
import styles from '@/styles/Products.module.scss'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const showProductList = (products: Product[]) =>
  products?.length > 0 ? (
    <ProductList products={products} />
  ) : (
    <EmptyList className={styles['center-text']} text="No hay productos" />
  )

const Products: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(true)
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
      setIsLoading(false)
    }

    getProducts()
  }, [])

  return (
    <ClientOnly>
      <>
        <ListHeader
          createPath={`/productos/crear`}
          createText="Añadir nuevo producto"
          logoUrl={user?.providerInfo.logoUrl}
          altLogo={user?.providerInfo.commercialName}
        />
        {isLoading ? <div className={styles['center-text']}>Cargando...</div> : showProductList(products)}
      </>
    </ClientOnly>
  )
}

export default Products
