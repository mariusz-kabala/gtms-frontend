import React, { FC, useCallback, useState } from 'react'
import { IGroupBg } from '@gtms/commons/models'
import { GroupBgNoImage } from '../../../enums'
import { updateGroupAvatar } from '@gtms/state-group'
// ui
import { IoIosSettings } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { Modal } from '@gtms/ui/Modal'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'

export const GroupBackgroundSettings: FC<{ bg?: IGroupBg }> = ({ bg }) => {
  const [bgUploadStatus, setBgUploadStatus] = useState<{
    isUploading: boolean
    isError: boolean
  }>({
    isError: false,
    isUploading: false,
  })

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

  const [showUploadFileGroupBg, setShowUploadFileGroupBg] = useState<boolean>(
    false
  )

  return (
    <div data-testid="group-settings-images" className={styles.wrapper}>
      {showUploadFileGroupBg && (
        <Modal onClose={() => setShowUploadFileGroupBg(false)}>
          <UploadFile
            additionalStyles={styles.uploadFile}
            isError={bgUploadStatus.isError}
            isLoading={bgUploadStatus.isUploading}
            onDrop={onBgDrop}
          />
        </Modal>
      )}
      <div className={styles.imagePreview}>
        <ImageWithLightbox
          additionalStyles={styles.imagePreview}
          src={bg?.files['200x200'] || GroupBgNoImage['200x200']}
        />
        <Button
          onClick={() => setShowUploadFileGroupBg(true)}
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
