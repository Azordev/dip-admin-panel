import { FC, useEffect, useState } from 'react'

import EmptyList from '@/components/EmptyList'
import ListHeader from '@/components/ListHeader'
import Loading from '@/components/Loading'
import Paginated from '@/components/Paginated/Paginated'
import useAuth from '@/hooks/useAuth'
import { Product } from '@/services/GraphQL/products/types'
import styles from '@/styles/Products.module.scss'
import ProductList from '@/views/Products/List'

interface PaginatedProps {
  products: Product[]
  totalProducts: number
  onchangePage: (limit: number, offset: number) => void
  loading: Boolean
}

const ProductsContainers: FC<PaginatedProps> = props => {
  const { products, totalProducts, onchangePage, loading } = props
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const productsPerPage = 15
  const indexOfFirst = currentPage * productsPerPage - productsPerPage
  const indexOfLast = indexOfFirst + products.length

  const showProductList = () =>
    products?.length > 0 ? (
      <div className={styles['product-container']}>
        <ProductList products={products} />
        <Paginated
          itemsPerPage={productsPerPage}
          totalItemsLength={totalProducts}
          data={products}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          indexOfFirst={indexOfFirst}
          indexOfLast={indexOfLast}
        />
      </div>
    ) : (
      <EmptyList className="center-text" text="No hay productos" />
    )

  useEffect(() => {
    onchangePage(productsPerPage, indexOfFirst)
  }, [indexOfFirst, onchangePage])

  return (
    <div className={styles.relative}>
      <ListHeader
        createPath={`/productos/crear`}
        createText="Añadir nuevo producto"
        logoUrl={user?.providerInfo.logoUrl}
        altLogo={user?.providerInfo.commercialName}
      />
      {loading ? <Loading className="center-text" /> : showProductList()}
    </div>
  )
}

export default ProductsContainers
