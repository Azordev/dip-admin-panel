import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Category } from '@/services/GraphQL/categories/types'

interface CreateCategoryFormProps {
  onSubmit: (_formData: Category) => void
  loading: boolean
}

const CreateCategoryForm: FC<CreateCategoryFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Category>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="title" {...register('name', { required: true })} />
      {errors.name && <small className="text-red-500">{errors.name.message}</small>}
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default CreateCategoryForm
