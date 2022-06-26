import { useQuery } from '@apollo/client'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import EmptyItem from '@/components/EmptyItem'
import Loading from '@/components/Loading'
import useLogger from '@/hooks/useLogger'
import { CATEGORY_BY_ID } from '@/services/GraphQL/categories/queries'
import CategoryDetail from '@/views/Categories/Detail'
import ClientOnly from '@/views/Shared/ClientOnly'

const Category: NextPage = () => {
  const { push, query } = useRouter()
  const { data, loading, queryError } = useQuery(CATEGORY_BY_ID, {
    variables: { id: query.id },
  })
  const { error: logError } = useLogger()

  if (queryError) {
    logError(queryError, 'pages/categorias/[id].tsx Category.tsx', 'useQuery(CATEGORY_BY_ID)', 'UNEXPECTED')
    push('/categorias')
  }

  if (loading) return <Loading />
  if (!data || !data.category) return <EmptyItem text="La categoría esta vacía o es invalida" />
  return (
    <ClientOnly>
      <CategoryDetail category={data.category} />
    </ClientOnly>
  )
}

export default Category
