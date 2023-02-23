import axios from 'axios'
import { useRouter } from 'next/router'
import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import btnStyle from '@/components/Button/Button.module.scss'
import DeleteModal from '@/components/DeleteModal'
import { MemberEditable, MutableMemberFormProps } from '@/services/GraphQL/users/types'

import styles from '../../Create/Form.module.scss'

const EditMemberForm: FC<MutableMemberFormProps> = ({ onSubmit, loading, originalData: originalMember }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<MemberEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const router = useRouter()
  useEffect(() => {
    setValue('memberId', originalMember?.memberInfo ? originalMember.memberInfo.id : '')
    setValue('memberCode', originalMember ? originalMember.memberCode : '')
    setValue('password', originalMember?.password)
    setValue('firstNames', originalMember?.memberInfo?.firstNames)
    setValue('lastNames', originalMember?.memberInfo?.lastNames)
    setValue('startDate', originalMember?.memberInfo?.startDate)
    setValue('email', originalMember?.memberInfo ? originalMember.memberInfo.email : '')
  }, [originalMember, originalMember?.memberCode, originalMember?.memberInfo, originalMember?.password, setValue])
  const buttonText = loading ? 'Enviando' : 'Enviar'

  const showModal = () => {
    const message = originalMember?.memberInfo?.firstNames
      ? `el socio "${originalMember?.memberInfo?.firstNames}"`
      : 'socio'

    DeleteModal(message, async (confirmed: boolean) => {
      if (confirmed) {
        await axios.delete(`/api/members/${originalMember?.memberInfo?.id}`)
        router.push('/socios')
      }
    })
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <section className={styles.section}>
        <div className={styles['input-section']}>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']} htmlFor="namePartner">
              Nombre del Socio
            </label>
            <input
              className={styles.input}
              id="namePartner"
              type="text"
              placeholder="Escribe el nombre del socio"
              {...register('firstNames', { required: true })}
            />
            {errors.firstNames && <small className={styles['error-message']}>{errors.firstNames.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']} htmlFor="lastenamePartner">
              Apellido del Socio
            </label>
            <input
              className={styles.input}
              id="lastenamePartner"
              type="text"
              placeholder="Escribe el apellido del socio"
              {...register('lastNames', { required: true })}
            />
            {errors.lastNames && <small className={styles['error-message']}>{errors.lastNames.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']} htmlFor="memberCode">
              Código del Socio
            </label>
            <input
              className={styles.input}
              id="memberCode"
              type="text"
              placeholder="Escribe el código del socio"
              {...register('memberCode', { required: true })}
            />
            {errors.memberCode && <small className={styles['error-message']}>{errors.memberCode.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']} htmlFor="startDate">
              Fecha de Inicio
            </label>
            <input className={styles.input} id="startDate" type="date" {...register('startDate')} />
            {errors.startDate && <small className={styles['error-message']}>{errors.startDate.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']} htmlFor="email">
              Correo electrónico
            </label>
            <input
              className={styles.input}
              id="email"
              type="text"
              placeholder="Inserte el correo electrónico"
              {...register('email', { required: true })}
            />
            {errors.email && <small className={styles['error-message']}>{errors.email.message}</small>}
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']} htmlFor="password">
              Contraseña
            </label>
            <input
              className={styles.input}
              id="password"
              placeholder="Inserte la contraseña del socio"
              {...register('password', { required: true })}
            />
            {errors.password && <small className={styles['error-message']}>{errors.password.message}</small>}
          </div>
        </div>
      </section>
      <section className={btnStyle['buttons-container']}>
        <Button className={btnStyle['button-cancel']} onClick={() => router.push('/eventos')}>
          Cancelar
        </Button>
        <Button iconName="" className={btnStyle['button-save']} type="submit">
          {buttonText}
        </Button>
        <Button onClick={showModal} iconName="" className={btnStyle['button-delete']} type="button">
          Eliminar
        </Button>
      </section>
    </form>
  )
}

export default EditMemberForm
