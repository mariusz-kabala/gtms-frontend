import React, { FC, useState } from 'react'
import cx from 'classnames'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { IGroup, FileStatus } from '@gtms/commons'
import { IoIosKeypad } from 'react-icons/io'

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
          [styles.show]: showFullView,
        })}
      >
        <div className={styles.bg} />
        <div className={styles.content}>{children}</div>
      </div>
      <ul className={styles.navigationDot} data-testid="navigation-dots">
        {groups.map((value, index) => (
          <li key={index}>
            <Link href={`/group/${value.slug}`}>
              <div
                className={styles.item}
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
        <li onClick={() => setShowFullView((value) => !value)}>
          <i>
            <IoIosKeypad />
          </i>
        </li>
      </ul>
    </div>
  )
}
