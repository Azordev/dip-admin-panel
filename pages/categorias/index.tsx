import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'

import { CATEGORIES } from '@/services/GraphQL/categories/queries'
import CategoriesList from '@/views/Categories/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Categories: NextPage = () => {
  const { data, loading, error } = useQuery(CATEGORIES)

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    console.error(error)
  }

  return <ClientOnly>{data.length && <CategoriesList categories={data.categories} />}</ClientOnly>
}

export default Categories
