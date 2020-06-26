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
      label: 'Posts',
      icon: <IoIosNavigate />,
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
      <ul className={styles.navigationDot} data-testid="navigationDot">
        {groups.map((value, index) => (
          <li key={index}>
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
