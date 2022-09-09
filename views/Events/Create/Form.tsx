import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import Input from '@/components/Input'
import Textarea from '@/components/Textarea'
import { EventEditable, MutableEventFormProps } from '@/services/GraphQL/events/types'

const CreateEventForm: FC<MutableEventFormProps> = ({ onSubmit, loading }) => {
  const methods = useForm<EventEditable>({
    mode: 'onChange',
  })
  const buttonText = loading ? 'Enviando' : 'Enviar'

  const submitHandler = (form: any) => {
    onSubmit(form)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitHandler)}>
        <Input
          label="Nombre del evento"
          name="title"
          type="text"
          autocomplete="off"
          rules={{ required: 'Este campo es requerido' }}
        />
        <Input
          label="Fecha del evento"
          name="date"
          type="datetime-local"
          autocomplete="off"
          rules={{ required: 'Este campo es requerido' }}
        />
        <Textarea label="Descripción del evento" name="description" rules={{ required: 'Este campo es requerido' }} />
        <Input
          label="Límite de asistentes"
          name="asistentes"
          type="text"
          autocomplete="off"
          rules={{ required: 'Este campo es requerido' }}
        />
        {/* <div>
            <label>Fecha del evento</label>
            <input type="datetime-local" {...register('date', { required: true })} />
          </div>
          <div>
            <label>Descripción del evento</label>
            <textarea placeholder="description" {...register('description')} />
          </div>
          <input type="file" name="image" accept="image/*" />
          <select {...register('type', { required: true })}>
            <option value="ATTENDANCE">Evento</option>
            <option value="WORKSHOP">Convocatoria</option>
          </select> */}
        <button type="submit">{buttonText}</button>
      </form>
    </FormProvider>
  )
}

export default CreateEventForm
