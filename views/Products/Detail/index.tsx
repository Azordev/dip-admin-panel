import { FC } from 'react'

import { Product } from '@/services/GraphQL/products/types'
import Image from '@/views/Shared/Image'

const ProductDetail: FC<{ product: Product }> = ({ product }) => (
  <div>
    {product.imageUrl && <Image src={product.imageUrl} alt="Product" />}
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p>SOL/ {product.basePriceSol}</p>
    <p>{product.createdAt}</p>
    <p>{product.updatedAt}</p>
  </div>
)

export default ProductDetail
