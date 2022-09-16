import { FC } from 'react'

import ProductItem from '@/components/ProductItem'
import { Product } from '@/services/GraphQL/products/types'
import styles from '@/styles/Products.module.scss'

interface ProductListProps {
  products: Product[]
}

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <div className={styles.container}>
      <div className={styles['products-list']}>
        {products.map((product: Product) => (
          <ProductItem key={`product-${product.id}`} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
