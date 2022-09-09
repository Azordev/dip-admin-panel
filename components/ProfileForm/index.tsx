import Image from 'next/image'
import { useRouter } from 'next/router'

import Button from '@/components/Button'

import styles from './ProfileForm.module.scss'

const ProfileForm = () => {
  const router = useRouter()
  return (
    <form className={styles.form}>
      <label className={styles['label-input']}>Logotipo</label>
      <div className={styles['container-input']}>
        <input id="image-file" type="file" accept="image/*" className={styles['input-file']} />
        <label htmlFor="image-file" className={styles.image}>
          <figure>
            <Image
              width={40}
              height={40}
              objectFit="contain"
              src="https://img.icons8.com/ios/100/image.png"
              alt="Imagen del perfil  "
            />
          </figure>
          <span className={styles.label}> {'Añadir imagen'} </span>
        </label>
      </div>
      <section className={styles.section}>
        <div className={styles['input-section']}>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Nombre de la marca</label>
            <input
              className={styles.input}
              placeholder="Escriba el nombre del evento"
              id="title"
              type="text"
              defaultValue="prueba"
            />
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Número de WhatsApp</label>
            <input
              className={styles.input}
              placeholder="Inserte número de WhatsApp del proveedor..."
              id="title"
              type="text"
              defaultValue="prueba"
            />
          </div>
          <div className={styles['custom-input']}>
            <label className={styles['label-input']}>Link del catálogo</label>
            <input
              className={styles.input}
              placeholder="Inserta el enlace de tu catálogo web"
              id="title"
              type="text"
              defaultValue="prueba"
            />
          </div>
        </div>
      </section>
      <section className={styles['buttons-container']}>
        <Button iconName="" className={styles['button-cancel']} onClick={() => router.push('/')}>
          Cancelar
        </Button>
        <Button iconName="" className={styles['button-save']} type="submit">
          Guardar
        </Button>
        {/* TODO: implementar funcionalidad asociada a este botón */}
      </section>
    </form>
  )
}

export default ProfileForm
