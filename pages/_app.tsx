import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ApolloProvider } from '@apollo/client'
import { ToastContainer, Zoom } from 'react-toastify'
import client from '@/services/GraphQL/client'
import ErrorBoundary from '@/views/Shared/ErrorBoundary'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/globals.scss'

const DIDAdminPanel = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const router = useRouter()

  useEffect(() => {
    const user = window.sessionStorage.getItem('user')

    if (!user) {
      router.push('/ingresar')
    }
  }, [router])
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
        <ToastContainer transition={Zoom} />
      </ApolloProvider>
    </ErrorBoundary>
  )
}
export default DIDAdminPanel
