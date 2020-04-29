import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { useAuth } from '@gtms/commons/hooks/auth'
import { UserAvatar } from '@gtms/ui/UserAvatar'

import {
  IoIosTennisball,
  IoIosNavigate,
  IoIosCart,
  IoIosCloudUpload,
  IoIosCompass,
  IoIosFingerPrint,
} from 'react-icons/io'

export const Navigation: FC<{}> = () => {
  const links = [
    {
      id: 0,
      label: 'Main Page',
      icon: <IoIosTennisball />,
      url: '/account',
    },
    {
      id: 1,
      label: 'Posts',
      icon: <IoIosNavigate />,
      url: '/group/owsiak',
    },
    {
      id: 2,
      label: 'Users',
      icon: <IoIosCart />,
      url: '/group-members',
    },
    {
      id: 3,
      label: 'Settings',
      icon: <IoIosCloudUpload />,
      url: '/group-settings',
    },
    {
      id: 4,
      label: 'Invite friends',
      icon: <IoIosCompass />,
      url: '/group-tags',
    },
    {
      id: 5,
      label: 'Invite friends',
      icon: <IoIosFingerPrint />,
      url: '/search',
    },
  ]

  const { isLogged } = useAuth()

  return !isLogged ? (
    <div className={styles.wrapper}>
      <Link href="/account">
        <UserAvatar
          additionalStyles={styles.avatar}
          image="/images/temp_images/avatar-1.png"
        />
      </Link>
      <nav className={styles.navigation} data-testid="navigation">
        <ul>
          {links.map((value, index) => {
            return (
              <li className={styles.link} key={index}>
                <Link href={value.url}>
                  <a>
                    <i>{value.icon}</i>
                    <span>{value.label}</span>
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  ) : null
}
