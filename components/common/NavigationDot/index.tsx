import React, { FC } from 'react'
import styles from './styles.scss'

/* @todo remove mock */
const mockData = [
  {
    img: '/images/temp_images/logo-kreciolatv.png',
  },
  {
    img: '/images/temp_images/logo-patrol-1.png',
  },
  {
    img: '/images/temp_images/logo-patrol-2.png',
  },
  {
    img: '/images/temp_images/avatar-1.png',
  },
  {
    img: '/images/temp_images/logo-kreciolatv.png',
  },
  {
    img: '/images/temp_images/logo-patrol-1.png',
  },
  {
    img: '/images/temp_images/avatar-1.png',
  },
]

export const NavigationDot: FC = () => (
  <div className={styles.navigationDot}>
    <ul className={styles.row}>
      {/* @todo remove key mock, apply normal key */}
      <li key={23423}>
        <a>
          <div
            className={styles.circle}
            style={{ backgroundImage: `url(${mockData[0].img})` }}
          />
        </a>
      </li>
      {mockData.map((value, index) => (
        <li key={index}>
          <a>
            <div
              className={styles.circle}
              style={{ backgroundImage: `url(${value.img})` }}
            />
          </a>
        </li>
      ))}
    </ul>
  </div>
)
