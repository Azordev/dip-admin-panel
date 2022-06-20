import { Category, CategoryEditable } from '@/services/GraphQL/categories/types'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

interface EditCategoryFormProps {
  onSubmit: (_formData: CategoryEditable) => void
  loading: boolean
  originalData?: Category
}

const EditCategoryForm: FC<EditCategoryFormProps> = ({ onSubmit, loading, originalData: originalCategory }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          defaultValue={originalCategory?.name}
          {...register('name', { required: true })}
        />
        {errors.name && <small className="text-red-500">{errors.name.message}</small>}
        <input
          type="checkbox"
          checked={originalCategory?.is_active ?? false}
          {...register('is_active', { required: false })}
        />
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default EditCategoryForm
