import React, { FC, useState, useEffect } from 'react'
// state
import {
  IUserPreviewState,
  userPreviewQuery,
  hideUserPreview,
} from '@app/state/userPreview'
// commons
import { UserAvatarNoImage } from '@app/enums'
// ui
import { Modal } from '@gtms/ui/Modal'
import { UserPreview as UserPreviewUI } from '@gtms/ui/UserPreview'

export const UserPreview: FC = () => {
  const [state, setState] = useState<IUserPreviewState>(
    userPreviewQuery.getValue()
  )

  useEffect(() => {
    const sub = userPreviewQuery.select().subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.isOpen || !state.user) {
    return null
  }

  return (
    <>
      <Modal onClose={hideUserPreview}>
        <UserPreviewUI
          user={state.user}
          noUserAvatar={UserAvatarNoImage}
          onUserPostsClick={() => null}
        />
      </Modal>
    </>
  )
}
