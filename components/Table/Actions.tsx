import Link from 'next/link'
import { FC } from 'react'

import Switch from '@/components/CustomSwitch'
import Icons8 from '@/views/Shared/Icons8'

import styles from './Actions.module.scss'

interface ActionsProps {
  editLink: string
  showSwitch?: boolean
  isCheckedSwitch?: boolean
  // eslint-disable-next-line no-unused-vars
  onSwitchChange?: (value: boolean) => void
}

const Actions: FC<ActionsProps> = ({ editLink, showSwitch, isCheckedSwitch, onSwitchChange }) => {
  return (
    <div className={styles.container}>
      {showSwitch && (
        <Switch
          isChecked={Boolean(isCheckedSwitch)}
          onChange={isChecked => onSwitchChange && onSwitchChange(isChecked)}
        />
      )}
      <Link href={editLink}>
        <a>
          <Icons8 name="edit--v1" iconStyle="material" color="#636363" />
        </a>
      </Link>
    </div>
  )
}

export default Actions
