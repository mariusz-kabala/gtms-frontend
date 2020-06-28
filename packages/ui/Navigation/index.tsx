import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import {
  IoIosAddCircle,
  IoIosKeypad,
  IoIosLogOut,
  IoIosNotifications,
  IoIosSearch,
} from 'react-icons/io'

export const Navigation: FC<{
  onLogout?: () => unknown
  avatar: { jpg: string; webp?: string } | null
}> = ({ onLogout, avatar }) => {
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
              label: 'Search',
              icon: <IoIosNotifications />,
            },
            {
              label: 'Search',
              icon: <IoIosSearch />,
              url: '/search',
            },
            {
              label: 'Create group',
              icon: <IoIosAddCircle />,
              url: '/group-create',
            },
            {
              label: 'My groups',
              icon: <IoIosKeypad />,
              url: '/my-groups',
            },
          ].map((value, index) => {
            return (
              <li className={styles.link} key={index}>
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
