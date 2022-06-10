import { Magic } from '@magic-sdk/admin'

const magicCredential = process.env.MAGIC_SK || ''
const magic = new Magic(magicCredential)

export const magicProviderCredentials = {
  name: 'Magic Link',
  credentials: {
    didToken: { label: 'DID Token', type: 'text' },
  },
  async authorize({ didToken }, _req) {
    magic.token.validate(didToken)

    const metadata = await magic.users.getMetadataByToken(didToken)

    // return user info
    return { ...metadata }
  },
}
