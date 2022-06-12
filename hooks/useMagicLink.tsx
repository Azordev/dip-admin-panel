import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Magic, RPCError, RPCErrorCode } from 'magic-sdk'
import useError from '@/hooks/useLogger'
import { User } from '@/services/GraphQL/users/users'

const magicCredential = process.env.NEXT_PUBLIC_MAGIC_PK || ''
const magic = typeof window !== 'undefined' && new Magic(magicCredential)

const useMagicLink = () => {
  const { warn } = useError()
  const router = useRouter()

  const magicLink = async (user: User) => {
    // ts-ignore
    if (!user.member_info?.email) {
      warn('useMagicLink', 'No se encontró un email en el usuario', 'INPUT')
      return
    }
    try {
      if (!magic) throw new Error(`magic not defined`)

      // login with Magic
      await magic.auth
        .loginWithMagicLink({ email: user.member_info?.email as string })
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
            warn('Login:useMagicLink', message, 'AUTHORIZATION')
          }
          alert('Error al tratar de entrar con Magic, recargando formulario')
          // Have to reload to erase internal state of Magic
          setTimeout(() => router.reload(), 1000)
        })
    } catch (err) {
      return router.reload()
    }
  }
  return magicLink
}

export default useMagicLink
