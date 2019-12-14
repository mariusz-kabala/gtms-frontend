import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { ExpandingItem } from 'components/common/ExpandingItem'
import { UserNameChangeForm } from './Form'

export const UserName: FC = () => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div className={styles.wrapper} onClick={() => setState(true)}>
      <ExpandingItem isActive={state} label={<div>User Name</div>}>
        <UserNameChangeForm />
      </ExpandingItem>
    </div>
  )
}
