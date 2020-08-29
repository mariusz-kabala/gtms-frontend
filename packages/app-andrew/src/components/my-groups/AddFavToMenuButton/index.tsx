import React, { FC } from 'react'
import { IGroup } from '@gtms/commons/models'
// ui
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import styles from './styles.scss'

export const AddFavToMenuButton: FC<{
  isChecked: boolean
  onClick: (group: IGroup) => unknown
  group: IGroup
}> = ({ isChecked, onClick, group }) => {
  return (
    <Button
      additionalStyles={styles.btn}
      onClick={(e) => {
        e?.preventDefault()
        e?.stopPropagation()
        onClick(group)
      }}
    >
      <i>{isChecked ? <IoMdCheckmark /> : <IoMdClose />}</i>
      {isChecked ? 'checked' : 'unchecked'}
    </Button>
  )
}
