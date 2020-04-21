import React, { FC, ReactNode, useEffect } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Overlay } from '../Overlay'
import { ImageHolder } from '../ImageHolder'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import useKey from 'use-key-hook'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
// import { UserCardMini } from '@gtms/ui/UserCardMini'

export const UserCard: FC<{
  additionalStyles?: string
  image: string
}> = ({ additionalStyles, image, onClose }) => {
  useEffect(() => {
    disableBodyScroll(document.body)

    return () => enableBodyScroll(document.body)
  }, [])

  useKey(() => onClose(), {
    detectKeys: [27],
  })

  return (
    <>
      <div
        className={cx(styles.wrapper, additionalStyles)}
        data-testid="user-card"
      >
        <div className={styles.content}>
          <div className={styles.left}>
            <ImageHolder
              additionalStyles={styles.image}
              alt="user avatar"
              src={image}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.desc}>
              <h2 className={styles.nameSurname}>Johnny Silverhand</h2>
              <p className={styles.desc}>
                Id in veniam sunt labore. Adipisicing proident dolor nulla
                cillum cupidatat. Do sint labore cupidatat.
              </p>
              <h3>Moje tagi:</h3>
              <TagGroup additionalStyles={styles.userTags}>
                <Tag label="Mechanik" />
                <Tag label="Oddam" />
                <Tag label="SerwisRowerowy" />
                <Tag label="Impreza" />
                <Tag label="DzienKobiet" />
                <Tag label="Znaleziono" />
                <Tag label="Polityka" />
              </TagGroup>
              <h3>Obserwuje tagi:</h3>
              <TagGroup additionalStyles={styles.userTags}>
                <Tag label="Mechanik" />
                <Tag label="Oddam" />
                <Tag label="SerwisRowerowy" />
                <Tag label="Impreza" />
                <Tag label="DzienKobiet" />
                <Tag label="Znaleziono" />
                <Tag label="Polityka" />
              </TagGroup>
              <h3>Jestem w grupach</h3>
              {/* <UserCardMini image={'/images/temp_images/logo-patrol-2.png'} /> */}
            </div>
          </div>
        </div>
      </div>
      <Overlay onClick={onClose} />
    </>
  )
}
