import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { useAuth } from '@gtms/commons/hooks/auth'
import { UserAvatar } from '@gtms/ui/UserAvatar'
import { useRouter } from 'next/router'
import { userQuery } from '@gtms/state-user'
import {
  IoIosTennisball,
  IoIosNavigate,
  IoIosCart,
  IoIosCompass,
  IoIosFingerPrint,
} from 'react-icons/io'

export const Navigation: FC<{}> = () => {
  const { isLogged } = useAuth()
  const router = useRouter()

  return isLogged ? (
    <div className={styles.wrapper}>
      <UserAvatar
        additionalStyles={styles.avatar}
        image={userQuery.getAvatar('50x50')}
        onClick={() => {
          router.push('/account')
        }}
      />
      <nav className={styles.navigation} data-testid="navigation">
        <ul>
          {[
            {
              id: 4,
              label: 'Search',
              icon: <IoIosCompass />,
              url: '/search',
            },
            {
              id: 0,
              label: 'Account',
              icon: <IoIosTennisball />,
              url: '/account',
            },
            {
              id: 1,
              label: 'Create group',
              icon: <IoIosNavigate />,
              url: '/group-create',
            },
            {
              id: 2,
              label: 'My groups',
              icon: <IoIosCart />,
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
            <a href="/logout">
              <i>
                <IoIosFingerPrint />
              </i>
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  ) : null
}
