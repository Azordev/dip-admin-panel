import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { Magic, RPCError, RPCErrorCode } from 'magic-sdk'
import useError from '@/hooks/useLogger'
import { User } from '@/services/GraphQL/types/users'
import { useRouter } from 'next/router'

const magicCredential = process.env.NEXT_PUBLIC_MAGIC_PK || ''
const magic = typeof window !== 'undefined' && new Magic(magicCredential)

const useMagicLink = () => {
  const [logError] = useError()
  const router = useRouter()

  const magicLink = async (user: User) => {
    try {
      if (!magic) throw new Error(`magic not defined`)

      // login with Magic
      await magic.auth
        .loginWithMagicLink({ email: user.username })
        .then(async didToken => {
          window.sessionStorage.setItem('userId', user.id)
          window.sessionStorage.setItem('user', JSON.stringify(user))

          // sign in with NextAuth
          return await signIn('credentials', {
            didToken,
            callbackUrl: router.query.callbackUrl as string,
          })
        })
        .catch(err => {
          if (err instanceof RPCError) {
            let message = ''
            switch (err.code) {
              case RPCErrorCode.MagicLinkFailedVerification:
                message = `Verificación de link fallida, ${err.rawMessage}`
                break
              case RPCErrorCode.MagicLinkExpired:
                message = `Link expirado, ${err.rawMessage}`
                break
              case RPCErrorCode.MagicLinkRateLimited:
                message = `Demasiados intentos, ${err.rawMessage}`
                break
              case RPCErrorCode.UserAlreadyLoggedIn:
                message = `Usuario ya logueado, ${err.rawMessage}`
                break
              default:
                message = err.rawMessage
            }
            toast.error(message, { theme: 'colored' })
            logError(Error(message), 'useMagicLink::magicLink::L52', 'AUTHORIZATION')
          }
          alert('Error al tratar de entrar con Magic, recargando formulario')
          router.reload()
        })
    } catch (err) {
      return router.reload()
    }
  }
  return magicLink
}

export default useMagicLink
