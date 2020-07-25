import React, { FC, useCallback, useState } from 'react'
import { IGroupAvatar } from '@gtms/commons/models'
import { GroupAvatarNoImage } from '../../../enums'
import { updateGroupAvatar } from '@gtms/state-group'
// ui
import { IoIosSettings } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'

export const GroupAvatarSettings: FC<{ avatar?: IGroupAvatar }> = ({
  avatar,
}) => {
  const [avatarUploadStatus, setAvatarUploadStatus] = useState<{
    isUploading: boolean
    isError: boolean
  }>({
    isError: false,
    isUploading: false,
  })
  const onAvatarDrop = useCallback((acceptedFiles) => {
    setAvatarUploadStatus({
      isUploading: true,
      isError: false,
    })

    updateGroupAvatar(acceptedFiles[0])
      .then(() => {
        setAvatarUploadStatus({
          isUploading: false,
          isError: false,
        })
      })
      .catch(() => {
        setAvatarUploadStatus({
          isUploading: false,
          isError: true,
        })
      })
  }, [])

  const [showUploadFileGroupAvatar, setShowUploadFileGroupAvatar] = useState<
    boolean
  >(false)

  return (
    <div data-testid="group-settings-images" className={styles.wrapper}>
      {showUploadFileGroupAvatar && (
        <Modal onClose={() => setShowUploadFileGroupAvatar(false)}>
          <UploadFile
            additionalStyles={styles.uploadFile}
            isError={avatarUploadStatus.isError}
            isLoading={avatarUploadStatus.isUploading}
            onDrop={onAvatarDrop}
          />
        </Modal>
      )}
      <div className={styles.imagePreview}>
        <ImageWithLightbox
          additionalStyles={styles.imagePreview}
          src={avatar?.files['200x200'] || GroupAvatarNoImage['200x200']}
        />
        <Button
          onClick={() => setShowUploadFileGroupAvatar(true)}
          additionalStyles={styles.btn}
        >
          <i>
            <IoIosSettings />
          </i>
        </Button>
      </div>
    </div>
  )
}
