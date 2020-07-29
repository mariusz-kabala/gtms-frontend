import React, { FC, useCallback, useState } from 'react'
import { IGroupBg } from '@gtms/commons/models'
import { GroupBgNoImage } from 'enums'
import { updateGroupAvatar } from '@gtms/state-group'
import { IoIosSettings } from 'react-icons/io'
// ui
import { Button } from '@gtms/ui/Button'
import { FullScreenGallery } from '@gtms/ui/FullScreenGallery'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { Modal } from '@gtms/ui/Modal'
import { UploadFile } from '@gtms/ui/UploadFile'
// styles
import styles from './styles.scss'

const BACKGROUNDS_GALLERY = [
  {
    name: 'background1',
    className: styles.bg1,
  },
  {
    name: 'background2',
    className: styles.bg2,
  },
  {
    name: 'background3',
    className: styles.bg3,
  },
  {
    name: 'background4',
    className: styles.bg4,
  },
  {
    name: 'background5',
    className: styles.bg5,
  },
  {
    name: 'background6',
    className: styles.bg6,
  },
  {
    name: 'background7',
    className: styles.bg7,
  },
  {
    name: 'background8',
    className: styles.bg8,
  },
  {
    name: 'background9',
    className: styles.bg9,
  },
  {
    name: 'background10',
    className: styles.bg10,
  },
  {
    name: 'background11',
    className: styles.bg11,
  },
  {
    name: 'background1',
    className: styles.bg1,
  },
  {
    name: 'background2',
    className: styles.bg2,
  },
  {
    name: 'background3',
    className: styles.bg3,
  },
  {
    name: 'background4',
    className: styles.bg4,
  },
  {
    name: 'background5',
    className: styles.bg5,
  },
  {
    name: 'background6',
    className: styles.bg6,
  },
  {
    name: 'background7',
    className: styles.bg7,
  },
  {
    name: 'background8',
    className: styles.bg8,
  },
  {
    name: 'background9',
    className: styles.bg9,
  },
  {
    name: 'background10',
    className: styles.bg10,
  },
  {
    name: 'background11',
    className: styles.bg11,
  },
]

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
  const [isFullScreenGalleryOpen, setIsFullScreenGalleryOpen] = useState<
    boolean
  >(false)

  return (
    <div
      data-testid="group-settings-background-image"
      className={styles.wrapper}
    >
      <FullScreenGallery
        gallery={BACKGROUNDS_GALLERY}
        isActive={isFullScreenGalleryOpen}
        onClose={() => setIsFullScreenGalleryOpen(false)}
      />
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
          onClick={() => setIsFullScreenGalleryOpen(true)}
          additionalStyles={styles.btn}
        >
          Open gallery
        </Button>
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
