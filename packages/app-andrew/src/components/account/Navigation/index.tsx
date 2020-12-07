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
  return (
    <div className={styles.navigation}>
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
              User card
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
