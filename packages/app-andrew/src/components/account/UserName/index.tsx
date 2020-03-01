import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { UserNameChangeForm } from './Form'

export const UserName: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="user-name"
      onClick={() => setState(true)}
    >
      <ExpandingItem isActive={state} label="Larry Ellison">
        <UserNameChangeForm />
      </ExpandingItem>
    </div>
  )
}
