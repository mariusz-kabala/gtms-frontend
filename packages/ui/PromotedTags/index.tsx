import React, { FC, useCallback, useState } from 'react'
import cx from 'classnames'
// commons
import { FileStatus } from '@gtms/commons/enums'
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
import { Button } from '@gtms/ui/Button'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '../Picture'
import { Spinner } from '../Spinner'
import { UploadedPicture } from '../UploadedPicture'
// style
import styles from './styles.scss'
import { getImage } from '@gtms/commons'

export const PromotedTags: FC<{
  additionalStyles?: string
  isLoading: boolean
  isAdmin?: boolean
  tags: IPromotedTag[]
  noImage: {
    '200x200': IImage
  }
  activeTags?: string[]
  onNoRecordsClick?: () => unknown
  onEditRecordClick?: (promotedTag: IPromotedTag) => unknown
  onDeleteRecordClick?: (promotedTag: IPromotedTag) => unknown
  onTagClick?: (promotedTag: IPromotedTag) => unknown
}> = ({
  additionalStyles,
  isLoading,
  tags,
  noImage,
  onNoRecordsClick,
  onEditRecordClick,
  onDeleteRecordClick,
  onTagClick,
  isAdmin = false,
  activeTags = [],
}) => {
  const [TagToDelete, setTagToDelete] = useState<IPromotedTag | null>(null)
  const onClick = useCallback(() => {
    onNoRecordsClick && onNoRecordsClick()
  }, [onNoRecordsClick])

  return (
    <div className={additionalStyles} data-testid="promoted-tags">
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
      <div className={cx(styles.items)}>
        {tags.length > 0 &&
          tags.map((tag) => (
            <div
              // onClick={() => onTagClick && onTagClick(tag)}
              className={cx(styles.item, styles.typeTwo, {
                [styles.active]: activeTags.includes(tag.tag),
              })}
              key={`promoted-${tag.id}`}
              style={
                tag.logo.status === FileStatus.ready
                  ? {
                      backgroundImage: `url(${
                        getImage('200x200', tag.logo).jpg
                      }`,
                    }
                  : {}
              }
            >
              {!tag.logo.status && <Picture {...noImage['200x200']} />}
              {tag.logo.status && tag.logo.status !== FileStatus.ready && (
                <UploadedPicture jpg={tag.logo.files[0]} />
              )}
              <div
                className={styles.image}
                style={
                  tag.logo.status === FileStatus.ready
                    ? {
                        backgroundImage: `url(${
                          getImage('200x200', tag.logo).jpg
                        }`,
                      }
                    : {}
                }
              />
              <div className={styles.desc}>
                <h3>#{tag.tag}</h3>
                <p>{tag.description}</p>
              </div>
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
            </div>
          ))}

        {tags.length > 0 && isAdmin && (
          <button className={styles.addTag} onClick={onClick}>
            <i>
              <IoIosAddCircle />
            </i>
            Add more tags
          </button>
        )}
      </div>
      <Button additionalStyles={styles.btn}>
        <Spinner size="sm" />
        Show more...
      </Button>
    </div>
  )
}
