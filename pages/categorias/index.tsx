import { useQuery } from '@apollo/client'
import { NextPage } from 'next'

import EmptyList from '@/components/EmptyList'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { CATEGORIES } from '@/services/GraphQL/categories/queries'
import CategoriesList from '@/views/Categories/List'
import ClientOnly from '@/views/Shared/ClientOnly'

const Categories: NextPage = () => {
  const { data, loading, queryError } = useQuery(CATEGORIES)
  const { error: logError } = useLogger()

  if (queryError) logError(queryError, 'pages/categorias/index.tsx', 'No se pudo obtener la categoría.')

  if (loading) return <Loading />
  if (!data && data.categories.length < 1) return <EmptyList text="No hay categorías aun, por favor crear una" />
  return (
    <ClientOnly>
      <CategoriesList categories={data.categories} />
    </ClientOnly>
  )
}

export default Categories
