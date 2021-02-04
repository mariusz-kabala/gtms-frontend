import React, { FC, useCallback, useState } from 'react'
import cx from 'classnames'
// commons
import { IPromotedTag } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
// ui
import {
  IoIosAddCircle,
  IoIosCloseCircle,
  IoIosCheckbox,
  IoMdTrash,
  IoIosSettings,
} from 'react-icons/io'
import { Button } from '../Button'
import { Modal } from '../Modal'
import { Spinner } from '../Spinner'
import { Image } from '../Image'
import { Fav } from '../Fav'
// style
import styles from './styles.scss'

export const PromotedTagsList: FC<{
  activeTags?: string[]
  additionalStyles?: string
  isAdmin?: boolean
  isLoading: boolean
  noImage: {
    '200x200': IImage
  }
  onDeleteRecordClick?: (promotedTag: IPromotedTag) => unknown
  onEditRecordClick?: (promotedTag: IPromotedTag) => unknown
  onNoRecordsClick?: () => unknown
  onTagClick?: (promotedTag: IPromotedTag) => unknown
  tags: IPromotedTag[]
  onFavClick: (tag: IPromotedTag, checked: boolean) => unknown
  favs: string[]
}> = ({
  activeTags = [],
  additionalStyles,
  isAdmin = false,
  isLoading,
  noImage,
  onDeleteRecordClick,
  onEditRecordClick,
  onNoRecordsClick,
  onTagClick,
  onFavClick,
  tags,
  favs,
}) => {
  const [TagToDelete, setTagToDelete] = useState<IPromotedTag | null>(null)
  const onClick = useCallback(() => {
    onNoRecordsClick && onNoRecordsClick()
  }, [onNoRecordsClick])

  return (
    <div className={additionalStyles} data-testid="promoted-tags-list">
      {isLoading && <Spinner />}
      {TagToDelete && (
        <Modal
          additionalStyles={styles.deleteTagModal}
          onClose={() => setTagToDelete(null)}
        >
          <h2 className={styles.header}>Are you sure you want delete tag?</h2>
          <p className={styles.desc}>
            Eteu in occaecat occaecat consectetur et laboris aliquip.
          </p>
          <div className={styles.buttons}>
            <Button
              additionalStyles={styles.no}
              testid="delete-account-cancel"
              onClick={() => setTagToDelete(null)}
            >
              <i>
                <IoIosCloseCircle />
              </i>
              No
            </Button>
            <Button
              testid="delete-account-confirm"
              additionalStyles={styles.yes}
              onClick={() => {
                onDeleteRecordClick && onDeleteRecordClick(TagToDelete)
                setTagToDelete(null)
              }}
            >
              <i>
                <IoIosCheckbox />
              </i>
              Yes
            </Button>
          </div>
        </Modal>
      )}
      {tags.length > 0 && isAdmin && (
        <button
          className={styles.addTag}
          onClick={onClick}
          data-testid="add-more-tags-button"
        >
          <i>
            <IoIosAddCircle />
          </i>
          Add more tags
        </button>
      )}
      <ul className={cx(styles.items)}>
        {tags.length > 0 &&
          tags.map((tag) => (
            <li
              className={cx(styles.item, {
                [styles.active]: activeTags.includes(tag.tag),
              })}
              key={`promoted-${tag.id}`}
            >
              {isAdmin && (
                <div className={styles.adminPanel}>
                  <ul>
                    <li
                      onClick={() =>
                        onEditRecordClick && onEditRecordClick(tag)
                      }
                    >
                      <i>
                        <IoIosSettings />
                      </i>
                    </li>
                    <li onClick={() => setTagToDelete(tag)}>
                      <i>
                        <IoMdTrash />
                      </i>
                    </li>
                  </ul>
                </div>
              )}
              <Fav
                additionalStyles={styles.favButton}
                isChecked={favs.includes(tag.tag)}
                onClick={(checked) => {
                  onFavClick(tag, checked)
                }}
              />
              <div
                className={styles.content}
                onClick={() => onTagClick && onTagClick(tag)}
              >
                <Image
                  {...(tag.logo as any)}
                  noImage={noImage}
                  size={'200x200'}
                />
                <div className={styles.desc}>
                  <h3>#{tag.tag}</h3>
                  <p>{tag.description}</p>
                </div>
              </div>
            </li>
          ))}
      </ul>
      <Button
        additionalStyles={styles.btnShowMore}
        data-testid="show-more-tags-button"
      >
        <Spinner size="xsm" />
        show more...
      </Button>
    </div>
  )
}
