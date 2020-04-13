import React, { FC, useState } from 'react'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { GroupNameForm } from './Form'
import { ChangeGroupNameProps, ChangeGroupNameData } from './interfaces'

export const ChangeGroupName: FC<ChangeGroupNameProps> = ({
  additionalStyles,
  formData,
}) => {
  const [isInEditMode, setEditMode] = useState<boolean>(false)

  const onSubmit = (formData: ChangeGroupNameData) => {
    setEditMode(false)
    alert(JSON.stringify(formData))
  }

  return (
    <div
      className={additionalStyles}
      data-testid="group-name"
      onClick={() => (!isInEditMode ? setEditMode(true) : null)}
    >
      <ExpandingItem
        isActive={isInEditMode}
        label={formData.name}
        onClose={() => setEditMode(false)}
        contentLabel="Edit Group Name"
      >
        <GroupNameForm formData={formData} onSubmit={onSubmit} />
      </ExpandingItem>
    </div>
  )
}
