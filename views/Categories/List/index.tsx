import Link from 'next/link'
import { FC } from 'react'

import { Category } from '@/services/GraphQL/categories/types'

const CategoriesList: FC<{ categories: Category[] }> = ({ categories }) => (
  <>
    <h1>Categories</h1>
    <ul>
      {categories.map((category: Category) => (
        <li key={`category-${category.id}`}>
          <Link href={`/categorias/${category.id}`}>{category.name}</Link>
        </li>
      ))}
    </ul>
  </>
)

export default CategoriesList
