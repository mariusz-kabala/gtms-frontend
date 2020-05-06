import React, { FC } from 'react'
import styles from './styles.scss'
import { Link } from '@gtms/commons/i18n'
import image1 from './temp/avatar-1.png'
import image2 from './temp/logo-kreciolatv.png'
import image3 from './temp/logo-patrol-1.png'
import image4 from './temp/logo-patrol-2.png'

/* @todo remove mock */
const mockData = [
  {
    id: 0,
    img: image1,
    url: '/group/owsiak'
  },
  {
    id: 1,
    img: image2,
    url: '/group/my-private-group'
  },
  {
    id: 2,
    img: image3,
    url: '/group/private-group'
  },
  {
    id: 3,
    img: image4,
    url: '/group/owsiak'
  },
  {
    id: 4,
    img: image1,
    url: '/group/my-private-group'
  },
  {
    id: 5,
    img: image2,
    url: '/group/private-group'

  },
  {
    id: 6,
    img: image3,
    url: '/group/owsiak'
  },
]

export const NavigationDot: FC = () => (
  <ul className={styles.navigationDot} data-testid="navigationDot">
    {mockData.map((value) => (
      <li key={value.id}>
        <Link href={value.url}>
          <div
            className={styles.circle}
            style={{ backgroundImage: `url(${value.img})` }}
          />
        </Link>
      </li>
    ))}
  </ul>
)
