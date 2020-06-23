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
  IoMdPerson,
} from 'react-icons/io'

export const Navigation: FC<{
  onAvatarClick?: () => unknown
  onLogout?: () => unknown
  avatar: { jpg: string; webp?: string } | null
}> = ({ onAvatarClick, onLogout, avatar }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.navigation} data-testid="navigation">
        {avatar && (
          <UserAvatar additionalStyles={styles.avatar} image={avatar} />
        )}
        <ul>
          {[
            {
              label: 'Search',
              icon: <IoIosNotifications />,
              onClick: onAvatarClick,
            },
            {
              label: 'Search',
              icon: <IoIosSearch />,
              url: '/search',
            },
            {
              label: 'Account',
              icon: <IoMdPerson />,
              url: '/account',
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
