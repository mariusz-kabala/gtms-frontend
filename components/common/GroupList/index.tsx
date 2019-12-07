import React, { FC } from 'react'
import styles from './styles.scss'
import { ImageHolder } from 'components/common/ImageHolder'
import { TagGroup } from 'components/common/TagGroup'
import { Tag } from 'components/common/Tag'

const mockData = [
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/1692695/pexels-photo-1692695.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/1692695/pexels-photo-1692695.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
  },
]

export const GroupList: FC<{}> = () => (
  <div className={styles.wrapper}>
    <ul>
      {mockData.map((value, index) => (
        <li key={index}>
          <ImageHolder
            image={
              'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
            }
          />
          <div className={styles.desc}>
            <h3>Piracka wioska</h3>
            <p>{value.excerpt}</p>
          </div>
          <TagGroup>
            <Tag label="tag" />
            <Tag label="tag" />
            <Tag label="tag" />
            <Tag label="tag" />
          </TagGroup>
        </li>
      ))}
    </ul>
  </div>
)
