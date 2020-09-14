import React, { FC, useCallback, useState } from 'react'
import { IGroup } from '@gtms/commons/models'
import { updateGroup } from '@gtms/state-group'
import { uploadGroupBg } from '@gtms/api-group'
// ui
import { GoSettings } from 'react-icons/go'
import { Button } from '@gtms/ui/Button'
import { FullScreenGallery } from '@gtms/ui/FullScreenGallery'
import { UploadFile } from '@gtms/ui/UploadFile'
// styles
import styles from './styles.scss'
import { BACKGROUNDS_GALLERY } from 'enums'
import { changePageBackground } from 'state'

export const GroupBackgroundSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [isFullScreenGalleryOpen, setIsFullScreenGalleryOpen] = useState<
    boolean
  >(false)
  const [fileUploadState, setfileUploadState] = useState<{
    isLoading: boolean
    isError: boolean
    file: ArrayBuffer | string | null
  }>({
    isLoading: false,
    isError: false,
    file: null,
  })
  const onImageDrop = useCallback(
    async (acceptedFiles) => {
      setfileUploadState((state) => ({
        ...state,
        isError: false,
        isLoading: true,
      }))

      const file = acceptedFiles[0]

      try {
        await uploadGroupBg(group.id, file)
        const reader = new FileReader()

        reader.onload = (e) => {
          setfileUploadState((state) => ({
            ...state,
            file: e.target ? e.target.result : null,
          }))
        }

        reader.readAsDataURL(file)

        setfileUploadState((state) => ({
          ...state,
          isError: false,
          isLoading: false,
        }))
      } catch (err) {
        setfileUploadState((state) => ({
          ...state,
          isError: true,
          isLoading: false,
        }))
      }
    },
    [group]
  )

  const onBgChange = useCallback((name: string) => {
    updateGroup(
      {
        bgType: name,
      },
      group.slug
    )
    changePageBackground(name)
  }, [])

  return (
    <div
      data-testid="group-settings-background-image"
      className={styles.wrapper}
    >
      <FullScreenGallery
        currentBg={group.bgType}
        onBgChange={onBgChange}
        gallery={BACKGROUNDS_GALLERY}
        isActive={isFullScreenGalleryOpen}
        onClose={() => setIsFullScreenGalleryOpen(false)}
        file={fileUploadState.file}
      >
        <UploadFile
          onDrop={onImageDrop}
          isLoading={fileUploadState.isLoading}
          isError={fileUploadState.isError}
        />
      </FullScreenGallery>
      <Button
        onClick={() => setIsFullScreenGalleryOpen(true)}
        additionalStyles={styles.btn}
      >
        <i>
          <GoSettings />
        </i>
        Change group page background
      </Button>
    </div>
  )
}
