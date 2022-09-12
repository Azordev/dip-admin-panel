import type { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import useAuth from '@/hooks/useAuth'
import { Product } from '@/services/GraphQL/products/types'
import ProductList from '@/views/Products/List'
import ClientOnly from '@/views/Shared/ClientOnly'

import { getProducts } from 'controllers/products'

interface PageProps {
  products: Product[] | undefined
}

const Products: NextPage<PageProps> = ({ products }) => {
  const { user } = useAuth()
  if (!products || products.length < 1) return <EmptyList text="No hay suscripciones" />
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { products } = await getProducts()
  return {
    props: {
      products: products || [],
    },
  }
}
