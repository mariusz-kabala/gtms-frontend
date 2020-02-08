import React, { FC } from 'react'
import styles from './styles.scss'
import { UserAvatar } from 'components/common/UserAvatar'

const mockData = [
  {
    userName: 'Johny Ive',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    message: 'Andrzeeeeejjjjjjjjjjjjjj',
  },
  {
    userName: 'John Malkovich',
    image: 'https://images.pexels.com/photos/1692695/pexels-photo-1692695.jpeg',
    message: 'Andrzejjuuuuu',
  },
  {
    userName: 'Geralt',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    message: 'Andrzeeeeejjjjjjjjjjjjjj',
  },
  {
    userName: 'Johny Silverhand',
    image: 'https://images.pexels.com/photos/513044/pexels-photo-513044.jpeg',
    message: 'Andzzzzzzeeeeej',
  },
  {
    userName: 'Dr. Emmet Brown',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    message: 'Andrzejjuuuuu',
  },
]

export const ZawolajAdnrzeja: FC<{}> = () => (
  <div className={styles.wrapper}>
    <ul>
      {mockData.map((value, index) => (
        <li key={index}>
          <div className={styles.item}>
            {/* <UserAvatar image={value.image} /> */}
            <span>{value.userName}</span>
          </div>
          <p>{value.message}</p>
        </li>
      ))}
    </ul>
    <div
      style={{
        background: 'gray',
        padding: '10px',
        marginTop: '20px',
        fontSize: '0.7em',
      }}
    >
      @todo here goes input
    </div>
  </div>
)
