import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { UserNameChangeForm } from './Form'

export const UserName: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="user-name"
      onClick={() => (!state ? setState(true) : null)}
    >
      <ExpandingItem
        isActive={state}
        label="Larry Ellison"
        onClose={() => {
          setState(false)
        }}
      >
        <UserNameChangeForm />
      </ExpandingItem>
    </div>
  )
}
