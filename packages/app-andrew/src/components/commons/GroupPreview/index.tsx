import React, { FC, useState, useEffect } from 'react'
// commons
import { getImage } from '@gtms/commons/helpers'
import { GroupAvatarNoImage, UserAvatarNoImage } from 'enums'
// state
import {
  IGroupPreviewState,
  groupPreviewQuery,
  hideGroupPreview,
} from 'state/groupPreview'
// ui
import { Modal } from '@gtms/ui/Modal'
import { GroupCard } from '@gtms/ui/GroupCard'

export const GroupPreview: FC = () => {
  const [state, setState] = useState<IGroupPreviewState>(
    groupPreviewQuery.getValue()
  )

  useEffect(() => {
    const sub = groupPreviewQuery.select().subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.isOpen) {
    return null
  }

  return (
    <Modal onClose={hideGroupPreview}>
      <GroupCard
        description={state.description}
        isLoading={state.isLoading}
        isLoadingMembers={state.isLoadingMembers}
        logo={getImage('200x200', state.avatar, GroupAvatarNoImage)}
        members={state.members}
        name={state.name}
        noUserAvatar={UserAvatarNoImage}
        slug={state.slug}
        tags={state.tags || []}
      />
    </Modal>
  )
}
