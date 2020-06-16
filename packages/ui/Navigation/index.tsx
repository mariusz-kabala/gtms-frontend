import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import {
  IoIosSearch,
  IoMdPerson,
  IoIosAddCircle,
  IoIosKeypad,
  IoIosLogOut,
} from 'react-icons/io'

export const Navigation: FC<{
  onAvatarClick?: () => unknown
  onLogout?: () => unknown
  avatar: { jpg: string; webp?: string } | null
}> = ({ onAvatarClick, onLogout, avatar }) => {
  return (
    <div className={styles.wrapper}>
      <style global jsx>{`
        body {
          padding-left: 45px;
        }
      `}</style>
      {avatar && (
        <UserAvatar
          additionalStyles={styles.avatar}
          image={avatar}
          onClick={onAvatarClick}
        />
      )}
      <nav className={styles.navigation} data-testid="navigation">
        <ul>
          {[
            {
              id: 4,
              label: 'Search',
              icon: <IoIosSearch />,
              url: '/search',
            },
            {
              id: 0,
              label: 'Account',
              icon: <IoMdPerson />,
              url: '/account',
            },
            {
              id: 1,
              label: 'Create group',
              icon: <IoIosAddCircle />,
              url: '/group-create',
            },
            {
              id: 2,
              label: 'My groups',
              icon: <IoIosKeypad />,
              url: '/my-groups',
            },
          ].map((value, index) => {
            return (
              <li className={styles.link} key={index}>
                <Link href={value.url}>
                  <a>
                    <i
                      data-tip={value.label}
                      data-background-color="black"
                      data-text-color="white"
                    >
                      {value.icon}
                    </i>
                    <span>{value.label}</span>
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
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
