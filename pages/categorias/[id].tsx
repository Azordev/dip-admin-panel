import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import { CATEGORY_BY_ID } from '@/services/GraphQL/categories/queries'
import useLogger from '@/hooks/useLogger'
import ClientOnly from '@/views/Shared/ClientOnly'
import { Category as CategoryFields } from '@/services/GraphQL/categories/types'
import CategoryDetail from '@/views/Categories/Detail'

const Category: NextPage = () => {
  const { data: category, loading, error } = useQuery<CategoryFields>(CATEGORY_BY_ID)
  const { push } = useRouter()
  const { error: LogError } = useLogger()

  if (error) {
    LogError(error, 'pages/categorias/[id].tsx Category.tsx', 'useQuery(CATEGORY_BY_ID)', 'UNEXPECTED')
    push('/categorias')
  }

  return (
    <div>
      {loading && <p>Cargando...</p>}
      <ClientOnly>{category && category !== undefined ? <CategoryDetail category={category} /> : <></>}</ClientOnly>
    </div>
  )
}

export default Category
