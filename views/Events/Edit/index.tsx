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
    handleSubmit,
    formState: { errors },
  } = useForm<EventEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'
  const [type, setType] = useState(originalEvent?.type)

  const handleChange = (isCheck: any) => {
    if (isCheck) {
      setValue('type', 'ATTENDANCE')
      setType(getValues().type)
      return
    }
    setValue('type', 'WORKSHOP')
    setType(getValues().type)
  }

  useEffect(() => {
    setValue('type', originalEvent?.type)
    setType(getValues('type'))
  }, [originalEvent?.type])

  return (
    <form onSubmit={submitHandler}>
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
      <label className={styles.switchLabel}>{type === 'ATTENDANCE' ? 'Evento' : 'Convocatoria'}</label>
      <CustomSwitch isChecked={originalEvent?.type === 'ATTENDANCE'} onChange={handleChange} />
      <button type="submit">{buttonText}</button>
    </form>
  )
}

export default EditEventForm
