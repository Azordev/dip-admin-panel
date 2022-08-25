import type { GetServerSideProps, NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import { Product } from '@/services/GraphQL/products/types'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

import { getProducts } from 'controllers/products'

interface PageProps {
  products: Product[] | undefined
}

const Products: NextPage<PageProps> = ({ products }) => {
  if (!products || products.length < 1) return <EmptyList text="No hay suscripciones" />
  return (
    <ClientOnly>
      <ProductList products={products} />
    </ClientOnly>
  )
}

export default Products

export const getServerSideProps: GetServerSideProps = async () => {
  const { products } = await getProducts()
  return {
    props: {
      products: products || [],
    },
  }
}
