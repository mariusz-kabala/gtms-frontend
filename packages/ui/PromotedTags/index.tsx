import React, { FC, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { IoIosAddCircle } from 'react-icons/io'
import { Spinner } from '@gtms/ui/Spinner'
import { FileStatus } from '@gtms/commons/enums'
import { IPromotedTag } from '@gtms/commons/models'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { Picture } from '@gtms/ui/Picture'

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
      {isLoading && <Spinner />}

      <NavigationTabs data={{
        header: 'Promoted tags',
        links: [
          {
            id: 0,
            description: 'Promoted tags',
          },
          {
            id: 1,
            description: 'Hot tags',
          },
          {
            id: 2,
            description: 'Favorites tags',
          },
          {
            id: 3,
            description: 'Favorites tags',
          }
        ]
      }} />

      {tags.length > 0 &&
        tags.map((tag) => (
          <div key={`promoted-${tag.id}`}>
            {!tag.logo.status && <Picture {...noImage['200x200']} />}
            {tag.logo.status === FileStatus.ready && (
              <Picture
                additionalStyles={styles.image}
                {...tag.logo.files['200x200']} />
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
        <div className={styles.mock}>
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <p>
            This group has no promoted tags{' '}
            <a className={styles.add} onClick={onClick}>
              please add some
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
