import React, { FC, useCallback } from 'react'
import cx from 'classnames'
// commons
import { FileStatus } from '@gtms/commons/enums'
import { IPromotedTag } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
// ui
import { IoIosAddCircle, IoMdTrash, IoIosSettings } from 'react-icons/io'
import { Button } from '../Button'
import { Spinner } from '../Spinner'
import { Picture } from '../Picture'
import { UploadedPicture } from '../UploadedPicture'
// style
import styles from './styles.scss'
import { isNull } from 'util'

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
  const onClick = useCallback(() => {
    onNoRecordsClick && onNoRecordsClick()
  }, [onNoRecordsClick])

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="promoted-tags"
    >
      {isLoading && <Spinner />}

      <div className={cx(styles.items)}>
        {tags.length > 0 &&
          tags.map((tag) => (
            <div
              onClick={() => onTagClick && onTagClick(tag)}
              className={cx(styles.item, {
                [styles.active]: activeTags.includes(tag.tag),
              })}
              style={{
                backgroundImage: `url(${
                  tag.logo.status === FileStatus.ready
                    ? tag.logo.files['200x200'].jpg
                    : isNull
                })`,
              }}
              key={`promoted-${tag.id}`}
            >
              {!tag.logo.status && <Picture {...noImage['200x200']} />}
              {tag.logo.status && tag.logo.status !== FileStatus.ready && (
                <UploadedPicture jpg={tag.logo.files[0]} />
              )}
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
                      <IoIosSettings />
                    </li>
                    <li
                      onClick={() =>
                        onDeleteRecordClick && onDeleteRecordClick(tag)
                      }
                    >
                      <IoMdTrash />
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
