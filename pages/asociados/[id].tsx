import { GetStaticPaths } from 'next'
import React from 'react'
import client from '../../services/GraphQL/client'
import { GET_MEMBERS, GET_MEMBER_BY_ID } from '../../services/GraphQL/queries/users'
import { Member as MemberProps } from '../../services/GraphQL/types/users'
import ClientOnly from '../../views/Shared/ClientOnly'

const Member: React.FC<{ member: MemberProps }> = ({ member }) => (
  <div>
    <ClientOnly>
      {member && (
        <div>
          <h1>
            {member.first_names} {member.last_names}
          </h1>
          <p>{member.email}</p>
        </div>
      )}
    </ClientOnly>
  </div>
)

export default Member

type StaticProps = {
  params: MemberProps
}

export async function getStaticProps({ params: { id } }: StaticProps) {
  const {
    data: { member },
    errors,
  } = await client.query({
    query: GET_MEMBER_BY_ID,
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
      member,
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const {
    data: { members },
    errors,
  } = await client.query({
    query: GET_MEMBERS,
  })

  if (members.length < 1 || errors) {
    return {
      paths: [],
      fallback: false,
    }
  }

  const paths =
    members.map((member: MemberProps) => ({
      params: {
        id: member.id?.toString(),
      },
    })) || []
  return {
    paths,
    fallback: false, // indicates the type of fallback
  }
}
