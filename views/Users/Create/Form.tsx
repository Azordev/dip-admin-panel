import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { MutableUserFormProps, UserEditable } from '@/services/GraphQL/users/types'

const CreateUserForm: FC<MutableUserFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserEditable>()
  const submitHandler = handleSubmit(onSubmit)

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="namePartner">Nombre del Socio</label>
        <input
          id="namePartner"
          type="text"
          placeholder="Escribe el nombre del socio"
          {...register('namePartner', { required: true })}
        />
        {errors.namePartner && <small className="text-red-100">{errors.namePartner.message}</small>}

        <label htmlFor="memberCode">Código del Socio</label>
        <input
          id="memberCode"
          type="text"
          placeholder="Escribe el código del socio"
          {...register('memberCode', { required: true })}
        />
        {errors.memberCode && <small className="text-red-100">{errors.memberCode.message}</small>}

        <label htmlFor="startDate">Fecha de Inicio</label>
        <input id="startDate" type="date" {...register('startDate', { required: true })} />
        {errors.startDate && <small className="text-red-100">{errors.startDate.message}</small>}

        <label htmlFor="email">Correo electrónico</label>
        <input
          id="email"
          type="text"
          placeholder="Inserte el correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <small className="text-red-500">{errors.email.message}</small>}

        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" placeholder="Inserte la contraseña del socio" {...register('password')} />
        {errors.password && <small className="text-red-500">{errors.password.message}</small>}

        <div className="button-container">
          <button className="add" type="submit">
            Añadir
          </button>

          <button className="delete" type="submit">
            Eliminar
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateUserForm
