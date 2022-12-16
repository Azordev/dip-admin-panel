import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

import { User } from '@/services/GraphQL/users/types'

import { getMemberByMemberCode } from 'controllers/members'

import styles from '../../styles/MemberInfo.module.scss'

interface MemberInfoProps {
  user: User
  error: String
}

const MemberInfo: NextPage<MemberInfoProps> = ({ user, error }) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <>
            <div className={styles['card-header']}>
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={`Avatar of ${user.memberInfo?.firstNames} ${user.memberInfo?.lastNames}`}
                />
              ) : (
                <img
                  src="/images/default-avatar.png"
                  alt={`Avatar of ${user.memberInfo?.firstNames} ${user.memberInfo?.lastNames}`}
                />
              )}
              <div className={styles.cardHeaderInfo}>
                {user.isActive ? (
                  <p className={styles['is-active']}>Membresía activa</p>
                ) : (
                  <p className={styles['is-inactive']}>Membresía inactiva</p>
                )}
                <p>Válido hasta: {user.memberInfo?.subscriptions?.[0].expiration}</p>
              </div>
            </div>
            <div className={styles['card-body']}>
              Nombres
              <p className={styles.value}>{user.memberInfo?.firstNames}</p>
              Apellidos
              <p className={styles.value}>{user.memberInfo?.lastNames}</p>
              Código
              <p className={styles.value}>{user.memberCode}</p>
            </div>
          </>
        )}
        <p className={styles.return}>
          <Link href="/ingresar">
            <a>Volver</a>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default MemberInfo

export const getServerSideProps: GetServerSideProps = async context => {
  const { memberCode } = context.query

  const res = await getMemberByMemberCode(memberCode as string)

  return {
    props: res,
  }
}
