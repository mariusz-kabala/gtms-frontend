import React, { FC, useCallback } from 'react'
import cx from 'classnames'
import { IoIosAddCircle, IoMdTrash, IoIosSettings } from 'react-icons/io'
// commons
import { FileStatus } from '@gtms/commons/enums'
import { IPromotedTag } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
// ui
import { Spinner } from '../Spinner'
import { Picture } from '../Picture'
// style
import styles from './styles.scss'

export const PromotedTags: FC<{
  additionalStyles?: string
  isLoading: boolean
  isAdmin?: boolean
  tags: IPromotedTag[]
  noImage: {
    '200x200': IImage
  }
  onNoRecordsClick?: () => unknown
  onEditRecordClick?: (promotedTag: IPromotedTag) => unknown
  onDeleteRecordClick?: (promotedTag: IPromotedTag) => unknown
}> = ({
  additionalStyles,
  isLoading,
  tags,
  noImage,
  onNoRecordsClick,
  onEditRecordClick,
  onDeleteRecordClick,
  isAdmin = false,
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
      <div className={styles.items}>
        {tags.length > 0 &&
          tags.map((tag) => (
            <div className={styles.item} key={`promoted-${tag.id}`}>
              {!tag.logo.status && <Picture {...noImage['200x200']} />}
              {tag.logo.status === FileStatus.ready && (
                <Picture
                  additionalStyles={styles.image}
                  {...tag.logo.files['200x200']}
                />
              )}
              <h3>#{tag.tag}</h3>
              <p>{tag.description}</p>
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
          <div className={cx(styles.manager, styles.item)} onClick={onClick}>
            <i>
              <IoIosAddCircle />
            </i>
            <p>Add more tags</p>
          </div>
        )}
      </div>
    </div>
  )
}
