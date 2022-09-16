import { NextPage } from 'next'
import Link from 'next/link'

import { Product } from '@/services/GraphQL/products/types'
import styles from '@/styles/Products.module.scss'
import Image from '@/views/Shared/Image'
import Picture from '@/views/SVGs/Picture'

const ProductItem: NextPage<{ product: Product }> = ({ product }) => (
  <Link href={`/productos/editar/${product?.id}`} passHref>
    <a className={styles['product-item']}>
      <div className={styles['image-container']}>
        {product?.imageUrl ? (
          <Image src={product.imageUrl} alt={`image of product ${product?.name}`} className={styles.image} />
        ) : (
          <Picture />
        )}
      </div>
      <section className={styles['product-name']}>
        <h2>{product?.name}</h2>
      </section>
      <section className={styles['product-price']}>
        <p>S/. {product?.basePriceSol}</p>
      </section>
    </a>
  </Link>
)

export default ProductItem
