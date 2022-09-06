import Link from 'next/link'
import { FC } from 'react'

import Switch from '@/components/CustomSwitch'

import EditIcon from '../Icons/EditIcon'

import styles from './Actions.module.scss'

interface ActionsProps {
  editLink: string
  showSwitch?: boolean
  isCheckedSwitch?: boolean
  onSwitchChange?: (_value: boolean) => void
}

const Actions: FC<ActionsProps> = ({ editLink, showSwitch, isCheckedSwitch, onSwitchChange }) => (
  <div className={styles.container}>
    {showSwitch && (
      <Switch
        isChecked={Boolean(isCheckedSwitch)}
        onChange={isChecked => onSwitchChange && onSwitchChange(isChecked)}
      />
    )}
    <Link href={editLink}>
      <a className={styles.edit}>
        <EditIcon height="26px" width="30px" />
      </a>
    </Link>
  </div>
)

export default Actions
