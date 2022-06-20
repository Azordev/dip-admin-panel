import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { magicProviderCredentials } from './nextauth.provider.magic.utils'

export default NextAuth({
  session: {
    jwt: true,
  },
  pages: {
    // override signIn page so we can integrate with Magic
    signIn: '/ingresar',
  },
  providers: [CredentialsProvider(magicProviderCredentials)],
})
