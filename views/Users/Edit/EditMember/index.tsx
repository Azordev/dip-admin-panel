import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button'
import btnStyle from '@/components/Button/Button.module.scss'
import { MemberEditable, MutableMemberFormProps } from '@/services/GraphQL/users/types'

import styles from '../../Create/Form.module.scss'

const EditMemberForm: FC<MutableMemberFormProps> = ({ onSubmit, loading, originalData: originalMember }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemberEditable>()
  const submitHandler = handleSubmit(onSubmit)
  const buttonText = loading ? 'Enviando' : 'Enviar'

  return (
    <form onSubmit={submitHandler}>
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
              <input
                className={styles.input}
                id="startDate"
                type="date"
                placeholder="Escribe el código del socio"
                {...register('createdAt', { required: true })}
              />
              {errors.createdAt && <small className={styles['error-message']}>{errors.createdAt.message}</small>}
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
                type="password"
                placeholder="Inserte la contraseña del socio"
                {...register('password', { required: true })}
              />
              {errors.password && <small className={styles['error-message']}>{errors.password.message}</small>}
            </div>
          </div>
        </section>
        <section className={btnStyle['buttons-container']}>
          <Button iconName="" className={btnStyle['button-save']} type="submit">
            {buttonText}
          </Button>
        </section>
      </form>
    </form>
  )
}

export default EditMemberForm
