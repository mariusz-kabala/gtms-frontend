import React, { FC, useCallback, useState } from 'react'
import { IGroup } from '@gtms/commons/models'
import { updateGroup } from '@gtms/state-group'
// ui
import { Button } from '@gtms/ui/Button'
import { FullScreenGallery } from '@gtms/ui/FullScreenGallery'
// styles
import styles from './styles.scss'
import { BACKGROUNDS_GALLERY } from 'enums'
import { changePageBackground } from 'state'

export const GroupBackgroundSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [isFullScreenGalleryOpen, setIsFullScreenGalleryOpen] = useState<
    boolean
  >(false)

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
      />
      <Button
        onClick={() => setIsFullScreenGalleryOpen(true)}
        additionalStyles={styles.btn}
      >
        Change group page background
      </Button>
    </div>
  )
}
