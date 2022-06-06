import React from 'react'
import type { AppProps } from 'next/app'
import { ToastContainer, Zoom } from 'react-toastify'
import { ApolloProvider } from '@apollo/client'
import { SessionProvider } from 'next-auth/react'
import client from '@/services/GraphQL/client'
import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import ErrorBoundary from '@/views/Shared/ErrorBoundary'

const DIDAdminPanel = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => (
  <ErrorBoundary>
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </ApolloProvider>
    </SessionProvider>
  </ErrorBoundary>
)

export default DIDAdminPanel
