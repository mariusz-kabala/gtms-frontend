import React, { FC } from 'react'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'
import { IGroupAvatar, IGroupBg } from '@gtms/commons/models'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { GroupAvatarNoImage, GroupBgNoImage } from '../../../enums'

export const ImagesSettings: FC<{ avatar?: IGroupAvatar; bg?: IGroupBg }> = ({
  avatar,
  bg,
}) => {
  return (
    <div data-testid="group-settings-images" className={styles.container}>
      <section>
        <h3 className={styles.header}>Group avatar</h3>
        <div className={styles.content}>
          <UploadFile onDrop={() => null} isLoading={false} isError={false} />
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
          <UploadFile onDrop={() => null} isLoading={false} isError={false} />
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
