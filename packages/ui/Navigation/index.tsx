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
    id: string
    label: string
    icon: JSX.Element
    onClick?: () => unknown
    url?: string
  }[]
  active?: string[]
  onLogout?: () => unknown
  avatar: IImage | null
}> = ({ menu, onLogout, avatar, active = [] }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navigation} data-testid="navigation">
        {avatar && (
          <Link href="/account">
            <a>
              <UserAvatar additionalStyles={styles.avatar} image={avatar} />
            </a>
          </Link>
        )}
        <ul>
          {menu.map((value, index) => {
            return (
              <li
                className={cx(styles.link, {
                  [styles.active]: active.includes(value.id),
                })}
                key={index}
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
          <li>
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
    </div>
  )
}
