import React, { FC } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
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
            <a>My profile card</a>
          </Link>
        </li>
        <li
          className={cx(styles.item, {
            [styles.current]: current === Tabs.security,
          })}
        >
          <Link href="/account/security">
            <a>Security</a>
          </Link>
        </li>
        <li
          className={cx(styles.item, {
            [styles.current]: current === Tabs.notifications,
          })}
        >
          <Link href="/account/notifications">
            <a>Notifications</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
