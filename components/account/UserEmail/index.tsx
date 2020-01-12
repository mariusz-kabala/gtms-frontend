import React, { FC, useState } from 'react'
import styles from './styles.scss'
import { ExpandingItem } from 'components/common/ExpandingItem'
import { UserEmailChangeForm } from './Form'

export const UserEmail: FC = () => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div
      className={styles.wrapper}
      data-testid="userEmail"
      onClick={() => setState(true)}>
      <ExpandingItem 
        isActive={state} 
        label={<div>User Email</div>}>
        <UserEmailChangeForm />
      </ExpandingItem>
    </div>
  )
}
