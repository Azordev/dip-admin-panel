import type { NextPage } from 'next'
import React, { useState } from 'react'
import styles from '../styles/Login.module.css'

const Login: NextPage = () => {
  const [authData, setAuthData] = useState({})

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value,
    })
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <div className={styles['login-container']}>
        <img src="/did_logo.svg" alt="DID Logo" className={styles.logo} />
        <h2 className={styles.title}>Ingresa a DID Perú</h2>
        <form onSubmit={submitHandler} className={styles['login-form']}>
          <input
            type="text"
            name="username"
            onChange={changeHandler}
            className={styles['login-form-input']}
            placeholder="Nombre de Usuario"
          />
          <input
            type="password"
            name="password"
            onChange={changeHandler}
            className={styles['login-form-input']}
            placeholder="Contraseña"
          />
          <button className={styles['login-form-button']} type="submit">
            Ingresar
          </button>
        </form>
        <a href="#" className={styles['forgot-password']}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  )
}

export default Login
