import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { CategoryEditable, MutableCategoryFormProps } from '@/services/GraphQL/categories/types'

const EditCategoryForm: FC<MutableCategoryFormProps> = ({ onSubmit, loading, originalData: originalCategory }) => {
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
          checked={originalCategory?.isActive ?? false}
          {...register('isActive', { required: false })}
        />
        <button type="submit">{buttonText}</button>
      </form>
    </>
  )
}

export default EditCategoryForm
