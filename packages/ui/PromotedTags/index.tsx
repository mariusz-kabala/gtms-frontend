import React, { FC, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Spinner } from '@gtms/ui/Spinner'
import { IPromotedTag } from '@gtms/commons/models'
import { FileStatus } from '@gtms/commons/enums'
import { Picture } from '@gtms/ui/Picture'
import { IoIosAddCircle } from 'react-icons/io'

export const PromotedTags: FC<{
  additionalStyles?: string
  isLoading: boolean
  isAdmin?: boolean
  tags: IPromotedTag[]
  noImage: {
    '200x200': {
      jpg: string
      webp?: string
    }
  }
  onNoRecordsClick?: () => unknown
}> = ({
  additionalStyles,
  isLoading,
  tags,
  noImage,
  onNoRecordsClick,
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
      {isLoading && (
        <p>
          <Spinner />
        </p>
      )}
      {tags.length > 0 &&
        tags.map((tag) => (
          <div key={`promoted-${tag.id}`}>
            {!tag.logo.status && <Picture {...noImage['200x200']} />}
            {tag.logo.status === FileStatus.ready && (
              <Picture {...tag.logo.files['200x200']} />
            )}
            <h3>#{tag.tag}</h3>
            <p>{tag.description}</p>
          </div>
        ))}
      {tags.length > 0 && isAdmin && (
        <div className={styles.manager} onClick={onClick}>
          <i>
            <IoIosAddCircle />
          </i>
          <p>Manage promoted tags</p>
        </div>
      )}
      {tags.length === 0 && isAdmin && (
        <p>
          This group has no promoted tags{' '}
          <a onClick={onClick}>please add some</a>
        </p>
      )}
    </div>
  )
}
