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
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <>
      <form className="form" onSubmit={submitHandler}>
        <label className="text-size label" htmlFor="namePartner">
          Nombre del Socio
        </label>
        <input
          className="input-member font-visby"
          id="namePartner"
          type="text"
          placeholder="Escribe el nombre del socio"
          {...register('namePartner', { required: true })}
        />
        {errors.namePartner && <small className="text-red-100">{errors.namePartner.message}</small>}

        <label className="text-size label" htmlFor="memberCode">
          Código del Socio
        </label>
        <input
          className="input-member font-visby"
          id="memberCode"
          type="text"
          placeholder="Escribe el código del socio"
          {...register('memberCode', { required: true })}
        />
        {errors.memberCode && <small className="text-red-100">{errors.memberCode.message}</small>}

        <label className="text-size label" htmlFor="startDate">
          Fecha de Inicio
        </label>
        <input className="input-member" id="startDate" type="date" {...register('startDate', { required: true })} />
        {errors.startDate && <small className="text-red-100">{errors.startDate.message}</small>}

        <label className="text-size label" htmlFor="email">
          Correo electrónico
        </label>
        <input
          className="input-member font-visby"
          id="email"
          type="text"
          placeholder="Inserte el correo electrónico"
          {...register('email', { required: true })}
        />
        {errors.email && <small className="text-red-500">{errors.email.message}</small>}

        <label className="text-size label" htmlFor="password">
          Contraseña
        </label>
        <input
          className="input-member font-visby"
          id="password"
          type="password"
          placeholder="Inserte la contraseña del socio"
          {...register('password')}
        />
        {errors.password && <small className="text-red-500">{errors.password.message}</small>}

        <div className="button-container">
          <button className="add text-size" type="submit">
            {buttonText}
          </button>

          <button className="delete text-size" type="submit">
            Eliminar
          </button>
        </div>
      </form>
    </>
  )
}

export default CreateUserForm
