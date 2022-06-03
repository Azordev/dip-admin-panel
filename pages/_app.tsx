import React from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import client from '@/services/GraphQL/client'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'

const DIDAdminPanel = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
    <ToastContainer />
  </ApolloProvider>
)

export default DIDAdminPanel
