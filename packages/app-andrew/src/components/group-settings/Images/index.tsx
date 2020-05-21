import React, { FC, useCallback, useState } from 'react'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'
import { IGroupAvatar, IGroupBg } from '@gtms/commons/models'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { GroupAvatarNoImage, GroupBgNoImage } from '../../../enums'
import { updateGroupAvatar } from '@gtms/state-group'

export const ImagesSettings: FC<{ avatar?: IGroupAvatar; bg?: IGroupBg }> = ({
  avatar,
  bg,
}) => {
  const [avatarUploadStatus, setAvatarUploadStatus] = useState<{
    isUploading: boolean
    isError: boolean
  }>({
    isError: false,
    isUploading: false,
  })
  const [bgUploadStatus, setBgUploadStatus] = useState<{
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

  const onBgDrop = useCallback((acceptedFiles) => {
    setBgUploadStatus({
      isUploading: true,
      isError: false,
    })

    updateGroupAvatar(acceptedFiles[0])
      .then(() => {
        setBgUploadStatus({
          isUploading: false,
          isError: false,
        })
      })
      .catch(() => {
        setBgUploadStatus({
          isUploading: false,
          isError: true,
        })
      })
  }, [])

  return (
    <div data-testid="group-settings-images" className={styles.wrapper}>
      <section>
        <h3 className={styles.header}>Group avatar</h3>
        <div className={styles.content}>
          <UploadFile
            onDrop={onAvatarDrop}
            isLoading={avatarUploadStatus.isUploading}
            isError={avatarUploadStatus.isError}
          />
          <div className={styles.imagePreview}>
            <ImageWithLightbox
              src={avatar?.files['200x200'] || GroupAvatarNoImage['200x200']}
            />
          </div>
        </div>
      </section>
      <section>
        <h3 className={styles.header}>Group background</h3>
        <div className={styles.content}>
          <UploadFile
            onDrop={onBgDrop}
            isLoading={bgUploadStatus.isUploading}
            isError={bgUploadStatus.isError}
          />
          <div className={styles.imagePreview}>
            <ImageWithLightbox
              src={bg?.files['200x200'] || GroupBgNoImage['200x200']}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
