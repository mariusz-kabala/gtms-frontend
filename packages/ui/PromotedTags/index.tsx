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
  const mock = [
    {
      id: 0,
      tag: 'Tag',
      logo: {
        status: false,
      },
      description:
        'Lorem cillum consequat est excepteur. Fugiat aliquip magna veniam nulla occaecat',
    },
    {
      id: 0,
      tag: 'Tag',
      logo: {
        status: false,
      },
      description:
        'Lorem cillum consequat est excepteur. Fugiat aliquip magna veniam nulla occaecat',
    },
    {
      id: 0,
      tag: 'Tag',
      logo: {
        status: false,
      },
      description:
        'Lorem cillum consequat est excepteur. Fugiat aliquip magna veniam nulla occaecat',
    },
    {
      id: 0,
      tag: 'Tag',
      logo: {
        status: false,
      },
      description:
        'Lorem cillum consequat est excepteur. Fugiat aliquip magna veniam nulla occaecat',
    },
  ]
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid="promoted-tags"
    >
      {isLoading && <Spinner />}

      <NavigationTabs />
      {mock.length > 0 && (
        <ul className={styles.items}>
          {mock.map((tag) => (
            <li className={styles.item} key={`promoted-${tag.id}`}>
              {!tag.logo.status && (
                <Picture
                  additionalStyles={styles.image}
                  {...noImage['200x200']}
                />
              )}
              {tag.logo.status === FileStatus.ready && (
                <Picture additionalStyles={styles.image} />
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
