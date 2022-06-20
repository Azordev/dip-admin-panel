import { useMutation } from '@apollo/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { CREATE_PROVIDER } from '@/services/GraphQL/providers/mutations'
import { ProviderEditable } from '@/services/GraphQL/providers/types'
import styles from '@/styles/Home.module.css'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [createProvider] = useMutation(CREATE_PROVIDER)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submitHandler = handleSubmit((newProvider: ProviderEditable) => {
    if (!newProvider?.commercial_name || !newProvider?.b2b_email) {
      return
    }

    createProvider({ variables: newProvider })
    push('/proveedores')
  })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Provider</h1>

      <form onSubmit={submitHandler}>
        <input type="text" placeholder="Comercial Name" {...register('commercial_name', { required: true })} />
        {errors.commercial_name && <span>This field is required</span>}
        <input type="text" placeholder="Address" {...register('address')} />
        <input type="text" placeholder="Sales Phone" {...register('sales_phone')} />
        <input type="text" placeholder="B2B Phone" {...register('b2b_phone')} />
        <input type="text" placeholder="Sales Email" {...register('sales_email')} />
        <input type="text" placeholder="B2B Email" {...register('b2b_email', { required: true })} />
        {errors.b2b_email && <span>This field is required</span>}
        <input type="text" placeholder="Legal Name" {...register('legal_name')} />
        <input type="text" placeholder="Details" {...register('details')} />
        <input type="text" placeholder="Logo URL" {...register('logo_url')} />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Create
