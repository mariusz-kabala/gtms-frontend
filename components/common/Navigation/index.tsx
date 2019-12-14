import React, { FC } from 'react'
import styles from './styles.scss'
import { FaList } from 'react-icons/fa'

export const Navigation: FC<{}> = () => {
  const links = [
    {
      id: 0,
      label: 'Main Page',
      icon: <FaList />,
      url: '/',
    },
    {
      id: 0,
      label: 'Posts',
      icon: <FaList />,
      url: '/',
    },
    {
      id: 0,
      label: 'Users',
      icon: <FaList />,
      url: '/',
    },
    {
      id: 0,
      label: 'Settings',
      icon: <FaList />,
      url: '/',
    },
    {
      id: 0,
      label: 'Invite friends',
      icon: <FaList />,
      url: '/',
    },
  ]

  return (
    <nav className={styles.wrapper} data-testid="navigation">
      <ul>
        {links.map((value, index) => {
          return (
            <li className={styles.link} key={index}>
              <a>
                <i>
                  <FaList />
                </i>
                {value.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
