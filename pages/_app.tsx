import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ToastContainer, Zoom } from 'react-toastify'

import client from '@/services/GraphQL/client'
import ErrorBoundary from '@/views/Shared/ErrorBoundary'
import Dashboard from '@/views/Shared/Layouts/Dashboard'
import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/globals.scss'

const DIDAdminPanel = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const router = useRouter()

  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        {router.pathname === '/ingresar' ? (
          <Component {...pageProps} />
        ) : (
          <Dashboard>
            <Component {...pageProps} />
          </Dashboard>
        )}
        <ToastContainer transition={Zoom} />
      </ApolloProvider>
    </ErrorBoundary>
  )
}
export default DIDAdminPanel
