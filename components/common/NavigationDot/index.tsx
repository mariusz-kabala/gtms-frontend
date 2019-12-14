import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from 'i18n'

/* @todo remove mock */
const mockData = [
  {
    id: 0,
    img: '/images/temp_images/avatar-1.png',
  },
  {
    id: 1,
    img: '/images/temp_images/logo-kreciolatv.png',
  },
  {
    id: 2,
    img: '/images/temp_images/logo-patrol-1.png',
  },
  {
    id: 3,
    img: '/images/temp_images/logo-patrol-2.png',
  },
  {
    id: 4,
    img: '/images/temp_images/logo-kreciolatv.png',
  },
  {
    id: 5,
    img: '/images/temp_images/logo-patrol-1.png',
  },
  {
    id: 6,
    img: '/images/temp_images/logo-patrol-2.png',
  },
]

export const NavigationDot: FC = () => (
  <>
    <style global jsx>{`
      body {
        padding-left: 70px;
      }
    `}</style>
    <div className={styles.navigationDot} data-testid="navigationDot">
      <ul className={styles.row}>
        {mockData.map(value => (
          <li key={value.id}>
            <Link href="/remind-password">
              <div
                className={styles.circle}
                style={{ backgroundImage: `url(${value.img})` }}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </>
)
