import React, { FC, useState } from 'react'
import { Picture } from '@gtms/ui/Picture'
import { useTranslation } from '@gtms/commons/i18n'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'

export const GroupAvatar: FC<{
  additionalStyles?: string
  files: {
    jpg: string
    webp?: string
  }
  isEditAllowed: boolean
}> = ({ files, isEditAllowed, additionalStyles }) => {
  const { t } = useTranslation('groupPage')
  const [isEditModeActive, setIsEditModeActive] = useState<boolean>(false)

  return (
    <div
      className={additionalStyles}
      data-testid="group-avatar"
      onClick={() => {
        if (isEditAllowed && !isEditModeActive) {
          setIsEditModeActive(true)
        }
      }}
    >
      <ExpandingItem
        isActive={isEditModeActive}
        closeOnClickOutsie={false}
        label={
          <div data-tip={t('click-to-upload-new-image')}>
            <Picture {...files} />
          </div>
        }
        onClose={() => {
          setIsEditModeActive(false)
        }}
      >
        <div>EDITOR</div>
      </ExpandingItem>
    </div>
  )
}
