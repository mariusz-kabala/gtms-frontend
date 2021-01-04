import React, { FC, useCallback, useState } from 'react'
import { IGroup } from '@gtms/commons/models'
import cx from 'classnames'
import { uploadGroupBg } from '@gtms/api-group'
import { BACKGROUNDS_GALLERY } from '@app/enums'
// state
import { updateGroup } from '@gtms/state-group'
import { changePageBackground } from '@app/state'
// ui
import { GoSettings } from 'react-icons/go'
import { Button } from '@gtms/ui/Button'
import { FullScreenGallery } from '@gtms/ui/FullScreenGallery'
import { UploadFile } from '@gtms/ui/UploadFile'
// styles
import styles from './styles.scss'

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

  const bg = BACKGROUNDS_GALLERY.filter((bg) => bg.name === group.bgType)[0]

  return (
    <div
      data-testid="group-settings-background-image"
      className={styles.wrapper}
    >
      <FullScreenGallery
        currentBg={group.bgType}
        file={fileUploadState.file}
        gallery={
          BACKGROUNDS_GALLERY.filter((item) => item.name !== null) as {
            name: string
            className: string
          }[]
        }
        isActive={isFullScreenGalleryOpen}
        onBgChange={onBgChange}
        onClose={() => setIsFullScreenGalleryOpen(false)}
      >
        <UploadFile
          onDrop={onImageDrop}
          isLoading={fileUploadState.isLoading}
          isError={fileUploadState.isError}
        />
      </FullScreenGallery>
      <div
        data-loaded="true"
        className={cx(styles.btnWrapperWithBg, bg?.className)}
        style={
          group.bgType === 'file' && group.bg?.files.mini
            ? {
                backgroundImage: `url(${group.bg?.files.mini.jpg})`,
              }
            : {}
        }
      >
        <div>
          {' '}
          {/* this div prevents streetching button by display flex */}
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
      </div>
    </div>
  )
}
