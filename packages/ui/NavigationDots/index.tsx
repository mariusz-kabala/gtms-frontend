import React, { FC, useState, useLayoutEffect } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
import { IImage } from '@gtms/commons/types/image'
import { getImage } from '@gtms/commons/helpers'
import { ReactSortable } from 'react-sortablejs'
// ui
import useKey from 'use-key-hook'
import { IoIosKeypad } from 'react-icons/io'
import styles from './styles.scss'

export const NavigationDots: FC<{
  groups: IGroup[]
  noImage: { [key: string]: IImage }
  onOrderChange?: (groups: IGroup[]) => unknown
}> = ({ groups, noImage, children, onOrderChange }) => {
  const [showFullView, setShowFullView] = useState<boolean>(false)
  const [sortedGroups, setSortedGroups] = useState<IGroup[]>(groups)

  useLayoutEffect(() => {
    const body = document.body

    if (showFullView) {
      body.style.position = 'fixed'
    } else {
      body.style.position = ''
    }
  }, [showFullView])

  useKey(
    () => {
      setShowFullView(false)
    },
    {
      detectKeys: [27],
    }
  )

  if (groups.length === 0) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.navigationDot} data-testid="navigation-dots">
        <div
          className={cx(styles.item, styles.showAllGroups, {
            [styles.active]: showFullView,
          })}
          onClick={() => setShowFullView((value) => !value)}
        >
          <i>
            <IoIosKeypad />
          </i>
        </div>
        <div className={styles.myGroups}>
          <ReactSortable
            list={sortedGroups}
            setList={setSortedGroups}
            onEnd={() => {
              onOrderChange && onOrderChange(sortedGroups)
            }}
          >
            {sortedGroups.map((value, index) => (
              <div className={styles.item} key={index}>
                <Link href={`/group/${value.slug}`}>
                  <div
                    style={{
                      backgroundImage: `url(${
                        getImage('50x50', value.avatar, noImage).jpg
                      })`,
                    }}
                  />
                </Link>
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
      <div
        className={cx(styles.fullView, {
          [styles.active]: showFullView,
        })}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  )
}
