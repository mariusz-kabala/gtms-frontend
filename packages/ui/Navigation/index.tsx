import React, { FC } from 'react'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
import { IImage } from '@gtms/commons/types/image'
// ui
import styles from './styles.scss'
import { UserAvatar } from '../UserAvatar'
import { IoIosLogOut } from 'react-icons/io'

export const Navigation: FC<{
  menu: {
    icon: JSX.Element
    id: string
    label: string
    onClick?: () => unknown
    url?: string
  }[]
  active?: string[]
  onLogout?: () => unknown
  avatar: IImage | null
}> = ({ active, avatar, menu, onLogout = [] }) => {
  return (
    <nav className={styles.navigation} data-testid="navigation">
      {avatar && (
        <Link href="/account">
          <a>
            <UserAvatar
              additionalStyles={styles.avatar}
              image={avatar}
              size="sm"
            />
          </a>
        </Link>
      )}
      <ul className={styles.items}>
        {menu.map((value, index) => {
          return (
            <li
              className={cx(styles.item, {
                [styles.active]: active.includes(value.id),
              })}
              key={index}
              data-testid={`navigation-item-${value.id}`}
            >
              {value?.onClick && (
                <a
                  onClick={() =>
                    value.onClick === undefined ? null : value.onClick()
                  }
                >
                  <i
                    data-tip={value.label}
                    data-background-color="black"
                    data-text-color="white"
                  >
                    {value.icon}
                  </i>
                </a>
              )}
              {!value.onClick && (
                <Link href={value.url || '#'}>
                  <a>
                    <i
                      data-tip={value.label}
                      data-background-color="black"
                      data-text-color="white"
                    >
                      {value.icon}
                    </i>
                  </a>
                </Link>
              )}
            </li>
          )
        })}
        <li className={styles.item}>
          <a
            onClick={() => {
              onLogout && onLogout()
            }}
            href="/logout"
          >
            <i>
              <IoIosLogOut />
            </i>
          </a>
        </li>
      </ul>
    </nav>
  )
}
