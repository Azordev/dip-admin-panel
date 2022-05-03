import React from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import 'react-toastify/dist/ReactToastify.min.css'
import client from '../services/GraphQL/client'
import '../styles/globals.scss'

function DIDAdminPanel({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer />
    </ApolloProvider>
  )
}

export default DIDAdminPanel
