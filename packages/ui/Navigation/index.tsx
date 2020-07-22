import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { IImage } from '@gtms/commons/types/image'
import { UserAvatar } from '../UserAvatar'
import {
  IoIosAddCircle,
  IoIosLogOut,
  IoIosNotifications,
  IoIosSearch,
} from 'react-icons/io'

export const Navigation: FC<{
  onAvatarClick?: () => unknown
  onLogout?: () => unknown
  avatar: IImage | null
}> = ({ onAvatarClick, onLogout, avatar }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navigation} data-testid="navigation">
        {avatar && (
          <Link href="/account">
            <UserAvatar additionalStyles={styles.avatar} image={avatar} />
          </Link>
        )}
        <ul>
          {[
            {
              label: 'Notifications',
              icon: <IoIosNotifications />,
              onClick: onAvatarClick,
            },
            {
              label: 'Search',
              icon: <IoIosSearch />,
              url: '/search',
            },
            {
              label: 'Create your group',
              icon: <IoIosAddCircle />,
              url: '/group-create',
            },
          ].map((value, index) => {
            return (
              <li className={styles.link} key={index}>
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
