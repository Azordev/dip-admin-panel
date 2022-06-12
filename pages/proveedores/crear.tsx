import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import styles from '../../styles/Home.module.css'
import { ProviderBase as Provider } from '../../services/GraphQL/providers/types'
import { CREATE_PROVIDER } from '../../services/GraphQL/providers/mutations'

const Create: NextPage = () => {
  const { push } = useRouter()
  const [newProvider, setNewProviders] = useState<Provider>({
    commercial_name: '',
    b2b_phone: '',
    b2b_email: '',
    logo_url: '',
  })

  const [createProvider] = useMutation(CREATE_PROVIDER)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!newProvider.commercial_name || !newProvider.b2b_email) {
      return
    }

    createProvider({ variables: newProvider })
    push('/proveedores')
  }

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewProviders({ ...newProvider, [e.target.name]: e.target.value })

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Provider</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="commercial_name"
          onChange={changeHandler}
          value={newProvider.commercial_name}
          placeholder="Comercial Name"
        />
        <input type="text" name="address" onChange={changeHandler} value={newProvider.address} placeholder="Address" />
        <input
          type="text"
          name="sales_phone"
          onChange={changeHandler}
          value={newProvider.sales_phone}
          placeholder="Sales Phone"
        />
        <input
          type="text"
          name="b2b_phone"
          onChange={changeHandler}
          value={newProvider.b2b_phone}
          placeholder="B2B Phone"
        />
        <input
          type="text"
          name="sales_email"
          onChange={changeHandler}
          value={newProvider.sales_email}
          placeholder="Sales Email"
        />
        <input
          type="text"
          name="b2b_email"
          onChange={changeHandler}
          value={newProvider.b2b_email}
          placeholder="B2B Email"
        />
        <input
          type="text"
          name="legal_name"
          onChange={changeHandler}
          value={newProvider.legal_name}
          placeholder="Legal Name"
        />
        <input type="text" name="details" onChange={changeHandler} value={newProvider.details} placeholder="Details" />
        <input
          type="text"
          name="logo_url"
          onChange={changeHandler}
          value={newProvider.logo_url}
          placeholder="Logo URL"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}

export default Create
