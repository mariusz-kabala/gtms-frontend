import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'

// this is just a mock
// @todo remove it when no longer needed
import {
  IoIosNotifications,
  IoIosCart,
  IoIosCloudUpload,
  IoIosCompass,
} from 'react-icons/io'

export const NavigationPage: FC<{}> = () => {
  // this is just a mock
  // @todo remove it when no longer needed
  const links = [
    {
      label: 'Notifications',
      icon: <IoIosNotifications />,
      url: '/',
    },
    {
      label: 'Users',
      icon: <IoIosCart />,
      url: '/',
    },
    {
      label: 'Settings',
      icon: <IoIosCloudUpload />,
      url: '/',
    },
    {
      label: 'Invite friends',
      icon: <IoIosCompass />,
      url: '/',
    },
  ]

  return (
    <div className={styles.wrapper}>
      <ul className={styles.linksMock}>
        {links.map((value, index) => {
          // this is just a mock
          // @todo remove it when no longer needed

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
    </div>
  )
}
