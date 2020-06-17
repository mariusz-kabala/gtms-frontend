import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import { IGroup, FileStatus } from '@gtms/commons'

// this is just a mock
// @todo remove it when no longer needed
import {
  IoIosTennisball,
  IoIosNavigate,
  IoIosCart,
  IoIosCloudUpload,
  IoIosCompass,
  IoIosFingerPrint,
} from 'react-icons/io'

export const NavigationDots: FC<{ groups: IGroup[] }> = ({ groups }) => {
  if (groups.length === 0) {
    return null
  }

  // this is just a mock
  // @todo remove it when no longer needed
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
    <div className={styles.wrapper}>
      <ul className={styles.navigationDot} data-testid="navigationDot">
        {groups.map((value) => (
          <li key={value.id}>
            <Link href={`/group/${value.slug}`}>
              <div
                className={styles.item}
                style={{
                  backgroundImage: `url(${
                    value.avatar &&
                    value.avatar.status === FileStatus.ready &&
                    value.avatar.files['200x200']
                      ? value.avatar?.files['200x200'].jpg
                      : 'http://via.placeholder.com/50x50'
                  })`,
                }}
              />
            </Link>
          </li>
        ))}
      </ul>
      <ul className={styles.linksMock}>
        {links.map((value, index) => {
          // this is just a mock
          // @todo remove it when no longer needed

          return (
            <li className={styles.link} key={index}>
              <Link href={value.url}>
                <a>
                  <i>{value.icon}</i>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
