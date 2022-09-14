import { ApolloProvider } from '@apollo/client'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ToastContainer, Zoom } from 'react-toastify'

import client from '@/services/GraphQL/client'
import ErrorBoundary from '@/views/Shared/ErrorBoundary'
import Dashboard from '@/views/Shared/Layouts/Dashboard'

import 'react-toastify/dist/ReactToastify.min.css'
import '@/styles/globals.scss'

const DIDAdminPanel = ({ Component, pageProps: { ...pageProps } }: AppProps) => {
  const { pathname } = useRouter()

  return (
    <ErrorBoundary>
      <Head>
        <title>DID Panel Administrativo</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        {/* <!-- HTML Meta Tags --> */}
        <title>DID Panel Administrativo</title>
        <meta
          name="description"
          content="Somos la Asociación de Diseñadores de Interiores del Perú. Unidos para promover el interiorismo peruano, basado en nuestra creatividad y cultura."
        />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://www.did-admin.tk/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="DID Panel Administrativo" />
        <meta
          property="og:description"
          content="Somos la Asociación de Diseñadores de Interiores del Perú. Unidos para promover el interiorismo peruano, basado en nuestra creatividad y cultura."
        />
        <meta
          property="og:image"
          content="https://static.wixstatic.com/media/539145_8d634facac56459abe42ab5d47fa4f74~mv2.jpg/v1/fill/w_2500,h_1668,al_c/539145_8d634facac56459abe42ab5d47fa4f74~mv2.jpg"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="DID Panel" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="did-admin.tk" />
        <meta property="twitter:url" content="https://www.did-admin.tk/" />
        <meta name="twitter:title" content="DID Panel Administrativo" />
        <meta
          name="twitter:description"
          content="Somos la Asociación de Diseñadores de Interiores del Perú. Unidos para promover el interiorismo peruano, basado en nuestra creatividad y cultura."
        />
        <meta
          name="twitter:image"
          content="https://static.wixstatic.com/media/539145_8d634facac56459abe42ab5d47fa4f74~mv2.jpg/v1/fill/w_2500,h_1668,al_c/539145_8d634facac56459abe42ab5d47fa4f74~mv2.jpg"
        />

        <meta
          name="keywords"
          content="peru, design, diseñadores, Diseño de interiores, Asociación Perú, Interior Designs Peru"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Spanish" />
        <meta name="revisit-after" content="45 days" />
        <meta name="author" content="Israel Antonio Rosales Laguan" />
      </Head>
      <ApolloProvider client={client}>
        {pathname === '/ingresar' ? (
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
