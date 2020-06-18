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
  const mock = [
    {
      id: 0,
      tag: 'Tag',
      logo: {
        status: false,
      },
      description:
        'Lorem cillum consequat est excepteur. Fugiat aliquip magna veniam nulla occaecat minim minim nulla proident duis velit ex in',
    },
  ]
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="promoted-tags"
    >
      {isLoading && <Spinner />}

      <header>
        <h2>Tags</h2>
        <ul>
          <li>Promoted tags</li>
          <li>Hot tags</li>
          <li>Latest tags</li>
          <li>Favorites tags</li>
        </ul>
      </header>

      {mock.length > 0 && (
        <ul>
          {mock.map((tag) => (
            <li className={styles.tag} key={`promoted-${tag.id}`}>
              {!tag.logo.status && <Picture {...noImage['200x200']} />}
              {tag.logo.status === FileStatus.ready && (
                <Picture
                  additionalStyles={styles.image}
                />
              )}
              <div className={styles.desc}>
                <h3>#{tag.tag}</h3>
                <p>{tag.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {tags.length > 0 && isAdmin && (
        <div className={styles.manager} onClick={onClick}>
          <i>
            <IoIosAddCircle />
          </i>
          <p>Manage promoted tags</p>
        </div>
      )}

      {!tags.length === 0 && isAdmin && (
        <p>
          This group has no promoted tags{' '}
          <a className={styles.add} onClick={onClick}>
            please add some
          </a>
        </p>
      )}
    </div>
  )
}
