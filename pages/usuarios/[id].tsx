import { FC } from 'react'
import { GetStaticPaths } from 'next'
import client from '@/services/GraphQL/client'
import { GET_USERS, GET_USER_BY_ID } from '@/services/GraphQL/queries/users'
import { User as UserProp } from '@/services/GraphQL/types/users'
import Image from '@/views/Shared/Image'
import ClientOnly from '@/views/Shared/ClientOnly'

const User: FC<{ user: UserProp }> = ({ user }) => (
  <div>
    <ClientOnly>
      {user && (
        <div>
          {user.avatar_url && <Image src={user.avatar_url} alt={user.member_code} />}
          <h1>
            {user.member_information?.first_names} {user.member_information?.last_names}
          </h1>
          <p>{user.position}</p>
        </div>
      )}
    </ClientOnly>
  </div>
)

export default User

type StaticProps = {
  params: UserProp
}

export async function getStaticProps({ params: { id } }: StaticProps) {
  const {
    data: { user },
    errors,
  } = await client.query({
    query: GET_USER_BY_ID,
    variables: {
      id,
    },
  })

  if (errors) {
    return {
      props: {
        event: null,
      },
    }
  }

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
    query: GET_USERS,
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
        id: user.id?.toString(),
      },
    })) || []
  return {
    paths,
    fallback: false, // indicates the type of fallback
  }
}
