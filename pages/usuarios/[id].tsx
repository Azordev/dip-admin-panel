import { FC } from 'react'
import { GetStaticPaths } from 'next'
import client from '@/services/GraphQL/client'
import { USERS } from '@/services/GraphQL/users/queries'
import { User as UserProp } from '@/services/GraphQL/users/types'
import Image from '@/views/Shared/Image'
import ClientOnly from '@/views/Shared/ClientOnly'

const User: FC<{ user: UserProp }> = ({ user }) => (
  <ClientOnly>
    {user && (
      <div>
        {user.avatar_url && <Image src={user.avatar_url} alt={user.member_code} />}
        <h1>
          {user.member_info?.first_names} {user.member_info?.last_names}
        </h1>
        <p>{user.position}</p>
      </div>
    )}
  </ClientOnly>
)

export default User

type StaticProps = {
  params: UserProp
}

export async function getStaticProps({ params: user }: StaticProps) {
  return {
    props: {
      user,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const {
    data: { users },
    errors,
  } = await client.query({
    query: USERS,
  })

  if (users.length < 1 || errors) {
    return {
      paths: [],
      fallback: false,
    }
  }

  const paths =
    users.map((user: UserProp) => ({
      params: {
        ...user,
      },
    })) || []
  return {
    paths,
    fallback: false, // indicates the type of fallback
  }
}
