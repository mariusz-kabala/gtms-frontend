import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
import { BasicInfoSetup } from '../BasicInfoSetup'
import { PermissionsSetup } from '../PermissionsSetup'

export const BasicSettings: FC<{
  group: IGroup
}> = ({ group }) => {
  return (
    <div data-testid="group-settings-basic">
      <BasicInfoSetup group={group} />
      <PermissionsSetup group={group} />
    </div>
  )
}
