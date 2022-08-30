import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import CustomSwitch from '@/components/CustomSwitch'
import { EventEditable, MutableEventFormProps } from '@/services/GraphQL/events/types'

import styles from './Edit.module.scss'
const EditEventForm: FC<MutableEventFormProps> = ({ onSubmit, loading, originalData: originalEvent }) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EventEditable>()
  const buttonText = loading ? 'Enviando' : 'Enviar'
  const [type, setType] = useState(originalEvent?.type)

  const handleChange = (isCheck: any) => {
    if (isCheck) {
      setValue('type', 'WORKSHOP')
      setType(getValues().type)
      return
    }
    setValue('type', 'ATTENDANCE')
    setType(getValues().type)
  }

  useEffect(() => {
    setValue('type', 'ATTENDANCE')
    setType(getValues('type'))
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="title"
        defaultValue={originalEvent?.title}
        {...register('title', { required: true })}
      />
      {errors.title && <small className="text-red-500">{errors.title.message}</small>}
      <input
        type="text"
        placeholder="description"
        defaultValue={originalEvent?.description}
        {...register('description', { required: false })}
      />
      <input
        type="datetime-local"
        defaultValue={originalEvent?.date.slice(0, 19) as string}
        {...register('date', { required: true })}
      />
      <CustomSwitch
        isChecked={type === 'WORKSHOP'}
        onChange={handleChange}
        firstLabel="Evento"
        secondLabel="Convocatoria"
      />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default EditEventForm
