export const categoryInfo = `
  # badge_url
  # description
  is_active
  name
`

export interface CategoryBase {
  // badge_url?: string
  // description?: string
  name: string
}

export interface CategoryEditable extends CategoryBase {
  is_active?: boolean
}

export interface Category extends CategoryBase {
  id: string
  is_active: boolean
  created_at: string
  updated_at: string
  products: {
    stats: {
      count: number
    }
  }
}

export interface MutableCategoryFormProps {
  onSubmit: (_formData: CategoryEditable) => void
  loading: boolean
  originalData?: Category
}
