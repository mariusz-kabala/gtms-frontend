import React, { FC } from 'react'
import styles from './styles.scss'
import {
  IoIosTennisball,
  IoIosNavigate,
  IoIosCart,
  IoIosCloudUpload,
  IoIosCompass,
  IoIosFingerPrint,
} from 'react-icons/io'
import { useAuth } from 'hooks/auth'
import { Logout } from 'components/common/Logout'
import { UserAvatar } from 'components/common/UserAvatar'

export const Navigation: FC<{}> = () => {
  const { isLogged } = useAuth()

  const links = [
    {
      id: 0,
      label: 'Main Page',
      icon: <IoIosTennisball />,
      url: '/',
    },
    {
      id: 1,
      label: 'Posts',
      icon: <IoIosNavigate />,
      url: '/',
    },
    {
      id: 2,
      label: 'Users',
      icon: <IoIosCart />,
      url: '/',
    },
    {
      id: 3,
      label: 'Settings',
      icon: <IoIosCloudUpload />,
      url: '/',
    },
    {
      id: 4,
      label: 'Invite friends',
      icon: <IoIosCompass />,
      url: '/',
    },
    {
      id: 5,
      label: 'Invite friends',
      icon: <IoIosFingerPrint />,
      url: '/',
    },
  ]

  return (
    <nav className={styles.wrapper} data-testid="navigation">
      <UserAvatar
        additionalStyles={styles.userAvatar}
        image="/images/temp_images/pl-rock-logo.png"
        responsive
      />

      {/* here to avoid <> fragment */}
      {/* @todo check if it can be placed in scss file */}
      <style global jsx>
        {`
          body {
            padding-left: 40px;
          }
        `}
      </style>

      <ul>
        {links.map((value, index) => {
          return (
            <li className={styles.link} key={index}>
              <a>
                <i>{value.icon}</i>
                <span>{value.label}</span>
              </a>
            </li>
          )
        })}
        <li>{isLogged && <Logout />}</li>
      </ul>
    </nav>
  )
}
