import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
// this is just a mock
// @todo remove it when no longer needed
import { IoIosListBox, IoIosFlame, IoIosPeople } from 'react-icons/io'

export const NavigationPage: FC<{}> = () => {
  // this is just a mock
  // @todo remove it when no longer needed
  const links = [
    {
      label: 'Posts',
      icon: <IoIosFlame />,
      url: '/',
    },
    {
      active: true,
      label: 'Tags',
      icon: <IoIosListBox />,
      url: '/',
    },
    {
      label: 'Users',
      icon: <IoIosPeople />,
      url: '/',
    },
  ]

  return (
    <ul className={styles.wrapper}>
      {links.map((value, index) => {
        // this is just a mock
        // @todo remove it when no longer needed

        return (
          <li
            className={cx(styles.link, {
              [styles.active]: value.active,
            })}
            key={index}
          >
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
  )
}
