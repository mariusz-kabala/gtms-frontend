import React, { FC, useState } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
import { IGroup, FileStatus } from '@gtms/commons'
// ui
import { Overlay } from '@gtms/ui/Overlay'
import { IoIosKeypad, IoIosCloseCircle } from 'react-icons/io'
import styles from './styles.scss'

export const NavigationDots: FC<{ groups: IGroup[] }> = ({
  groups,
  children,
}) => {
  const [showFullView, setShowFullView] = useState<boolean>(false)
  if (groups.length === 0) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={cx(styles.fullView, {
          [styles.active]: showFullView,
        })}
      >
        <div className={styles.content}>{children}</div>
        <Overlay onClick={() => setShowFullView((value) => !value)} />
      </div>
      <ul className={styles.navigationDot} data-testid="navigation-dots">
        <li
          className={cx(styles.item, styles.showAllGroups, {
            [styles.active]: showFullView,
          })}
          onClick={() => setShowFullView((value) => !value)}
        >
          <i>{showFullView ? <IoIosCloseCircle /> : <IoIosKeypad />}</i>
          <span>close</span>
        </li>
        {groups.map((value, index) => (
          <li className={styles.item} key={index}>
            <Link href={`/group/${value.slug}`}>
              <div
                style={{
                  backgroundImage: `url(${
                    value.avatar &&
                    value.avatar.status === FileStatus.ready &&
                    value.avatar.files['200x200']
                      ? value.avatar?.files['200x200'].jpg
                      : 'http://via.placeholder.com/50x50'
                  })`,
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
