import React, { FC, useState, useCallback } from 'react'
import { Picture } from '@gtms/ui/Picture'
import { UploadFile } from '@gtms/ui/UploadFile'
import { useTranslation } from '@gtms/commons/i18n'
import { ExpandingItem } from '@gtms/ui/ExpandingItem'
import { updateGroupAvatar } from '@gtms/state-group'

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
  const [uploadStatus, setUploadStatus] = useState<{
    isUploading: boolean
    isError: boolean
  }>({
    isError: false,
    isUploading: false,
  })
  const onDrop = useCallback((acceptedFiles) => {
    setUploadStatus({
      isUploading: true,
      isError: false,
    })

    updateGroupAvatar(acceptedFiles[0])
      .then(() => {
        setIsEditModeActive(false)
        setUploadStatus({
          isUploading: false,
          isError: false,
        })
      })
      .catch(() => {
        setUploadStatus({
          isUploading: false,
          isError: true,
        })
      })
  }, [])

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
        <div>
          <UploadFile
            onDrop={onDrop}
            isLoading={uploadStatus.isUploading}
            isError={uploadStatus.isError}
          />
        </div>
      </ExpandingItem>
    </div>
  )
}
