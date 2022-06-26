import { FC } from 'react'

import { Product } from '@/services/GraphQL/products/types'

const ProductList: FC<{ products: Product[] }> = ({ products }) => (
  <>
    <h1>Suscripciones</h1>

    <ul>
      {products.map((product: Product) => (
        <li key={product.id}>{product.id}</li>
      ))}
    </ul>
  </>
)

export default ProductList
