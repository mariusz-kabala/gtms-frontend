import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { Button } from '@gtms/ui/Button'
import { Checkbox } from '@gtms/ui/Forms/Checkbox'

export const AddFavToMenuButton: FC<{
  isChecked: boolean
  onClick: (group: IGroup) => unknown
  group: IGroup
}> = ({ isChecked, onClick, group }) => {
  return (
    <Button onClick={() => onClick(group)}>
      <Checkbox checked={isChecked} label={'Add to menu'} />
    </Button>
  )
}
