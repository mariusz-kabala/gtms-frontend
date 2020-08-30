import React, { FC } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
// ui

import { AiOutlineBell } from 'react-icons/ai'
import { FaIdCard } from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'
import styles from './styles.scss'

export enum Tabs {
  profile,
  security,
  notifications,
}

export const Navigation: FC<{ current: Tabs }> = ({ current }) => {
  const titleMapper = Object.freeze({
    [Tabs.profile]: 'My profile',
    [Tabs.security]: 'Security',
    [Tabs.notifications]: 'Notifications',
  })
  return (
    <div className={styles.navigation}>
      <h2 className={styles.header}>{titleMapper[current]}</h2>
      <ul className={styles.items}>
        <li
          className={cx(styles.item, {
            [styles.current]: current === Tabs.profile,
          })}
        >
          <Link href="/account">
            <a>
              <i>
                <FaIdCard />
              </i>
              My profile card
            </a>
          </Link>
        </li>
        <li
          className={cx(styles.item, {
            [styles.current]: current === Tabs.security,
          })}
        >
          <Link href="/account/security">
            <a>
              <i>
                <MdSecurity />
              </i>
              Security
            </a>
          </Link>
        </li>
        <li
          className={cx(styles.item, {
            [styles.current]: current === Tabs.notifications,
          })}
        >
          <Link href="/account/notifications">
            <a>
              <i>
                <AiOutlineBell />
              </i>
              Notifications
            </a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
