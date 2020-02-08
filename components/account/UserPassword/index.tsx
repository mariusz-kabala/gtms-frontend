import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { ExpandingItem } from 'components/common/ExpandingItem'
import { PasswordChangeForm } from './Form'

export const UserPassword: FC = () => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div
      className={styles.wrapper}
      data-testid="userPassword"
      onClick={() => setState(true)}
    >
      <ExpandingItem isActive={state} label={<span>*************</span>}>
        <PasswordChangeForm />
      </ExpandingItem>
    </div>
  )
}
