import React, { FC } from 'react'
import styles from './styles.scss'
import { UserAvatar } from 'components/common/UserAvatar'

const mockData = [
  {
    userName: 'Tim Cook',
    image: 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg',
  },
  {
    userName: 'Johny Ive',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    userName: 'John Malkovich',
    image: 'https://images.pexels.com/photos/1692695/pexels-photo-1692695.jpeg',
  },
  {
    userName: 'Geralt',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    userName: 'Johny Silverhand',
    image: 'https://images.pexels.com/photos/513044/pexels-photo-513044.jpeg',
  },
  {
    userName: 'Marty McFly',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    userName: 'Dr. Emmet Brown',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    userName: 'John Malkovich',
    image: 'https://images.pexels.com/photos/1692695/pexels-photo-1692695.jpeg',
  },
  {
    userName: 'Geralt',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
  },
  {
    userName: 'Johny Silverhand',
    image: 'https://images.pexels.com/photos/513044/pexels-photo-513044.jpeg',
  },
]

export const UsersList: FC<{}> = () => (
  <div className={styles.wrapper}>
    <ul>
      {mockData.map((value, index) => (
        <li key={index}>
          <UserAvatar image={value.image} />
          <span>{value.userName}</span>
        </li>
      ))}
    </ul>
  </div>
)
