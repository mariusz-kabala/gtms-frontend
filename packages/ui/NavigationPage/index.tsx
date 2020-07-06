import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Link } from '@gtms/commons/i18n'
// this is just a mock
// @todo remove it when no longer needed
import {
  IoIosNotifications,
  IoIosListBox,
  IoIosPricetags,
  IoIosFlame,
  IoIosPeople,
} from 'react-icons/io'

export const NavigationPage: FC<{}> = () => {
  // this is just a mock
  // @todo remove it when no longer needed
  const links1 = [
    {
      label: 'Popular',
      icon: <IoIosFlame />,
      url: '/',
    },
    {
      label: 'Latest',
      icon: <IoIosListBox />,
      url: '/',
    },
    {
      label: 'My posts',
      icon: <IoIosPeople />,
      url: '/',
    },
  ]

  const links2 = [
    {
      label: 'Berlin people',
      icon: <IoIosNotifications />,
      url: '/',
      active: true,
    },
    {
      label: 'Label of my filter',
      icon: <IoIosListBox />,
      url: '/',
    },
    {
      label: 'Another label',
      icon: <IoIosPricetags />,
      url: '/',
    },
    {
      label: 'Tennis Berlin',
      icon: <IoIosPeople />,
      url: '/',
    },
  ]

  const links3 = [
    {
      label: '#berlin',
      icon: <IoIosNotifications />,
      url: '/',
    },
    {
      label: '#gaming',
      icon: <IoIosListBox />,
      url: '/',
    },
    {
      label: '#counterstrike',
      icon: <IoIosPricetags />,
      url: '/',
    },
    {
      label: '#tennis',
      icon: <IoIosPeople />,
      url: '/',
    },
  ]

  return (
    <div className={styles.wrapper}>
      <div>
        <h2>Posts</h2>
        <ul className={styles.linksMock}>
          {links1.map((value, index) => {
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
      <div>
        <h2>My filters</h2>
        <ul className={styles.linksMock}>
          {links2.map((value, index) => {
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
      </div>
      <div>
        <h2>Popular tags</h2>
        <ul className={styles.linksMock}>
          {links3.map((value, index) => {
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
    </div>
  )
}
