import React, { FC, useState, useCallback } from 'react'
import { Picture } from '@gtms/ui/Picture'
import { UploadFile } from '@gtms/ui/UploadFile'
import { useTranslation } from '@gtms/commons/i18n'
import { updateGroupAvatar } from '@gtms/state-group'
import { Modal } from '@gtms/ui/Modal'
import { FileStatus } from '@gtms/commons'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

export const GroupAvatar: FC<{
  additionalStyles?: string
  files: {
    jpg: string
    webp?: string
  }
  isEditAllowed: boolean
  filesStatus: FileStatus
}> = ({ files, isEditAllowed, additionalStyles, filesStatus }) => {
  const { t } = useTranslation('groupAvatarComponent')
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
      {isEditModeActive && (
        <Modal onClose={() => setIsEditModeActive(false)}>
          <UploadFile
            onDrop={onDrop}
            isLoading={uploadStatus.isUploading}
            isError={uploadStatus.isError}
          />
        </Modal>
      )}

      <div
        className={styles.wrapper}
        data-tip={isEditAllowed ? t('clickToUploadNewImage') : ''}
      >
        {[FileStatus.uploaded, FileStatus.processing].includes(filesStatus) && (
          <Spinner additionalStyles={styles.spinner} />
        )}
        <Picture {...files} />
      </div>
    </div>
  )
}
