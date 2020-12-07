import React, { FC, useState, useCallback } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { updateGroupAvatar } from '@gtms/state-group'
import { FileStatus } from '@gtms/commons/enums'
import { IImage } from '@gtms/commons/types/image'
// ui
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'

export const GroupAvatar: FC<{
  additionalStyles?: string
  files: IImage
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
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="group-avatar"
      data-tip={isEditAllowed ? t('clickToUploadNewImage') : ''}
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
      {[FileStatus.uploaded, FileStatus.processing].includes(filesStatus) && (
        <Spinner size="sm" additionalStyles={styles.spinner} />
      )}
      <Picture {...files} />
    </div>
  )
}
