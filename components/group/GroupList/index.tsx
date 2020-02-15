import React, { FC } from 'react'
import styles from './styles.scss'
import { ImageHolder } from 'components/common/ImageHolder'
import { TagGroup } from 'components/common/TagGroup'
import { Tag } from 'components/common/Tag'

const mockData = [
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2013/07/13/01/12/witch-155291__480.png',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2015/11/15/21/31/lego-1044891__480.jpg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2016/01/19/17/56/concert-1149979__480.jpg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432__480.jpg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image: 'https://images.pexels.com/photos/1763067/pexels-photo-1763067.jpeg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2016/01/20/23/10/bowie-1152551__480.png',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2014/07/31/23/37/motorbike-407186__480.jpg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2017/06/02/17/47/friendship-2366955__480.jpg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2016/01/19/17/56/concert-1149979__480.jpg',
  },
  {
    excerpt: 'Consectetur veniam cupidatat ut reprehenderit minim cupidatat ',
    image:
      'https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432__480.jpg',
  },
]

export const GroupList: FC<{}> = () => (
  <div className={styles.wrapper}>
    <ul>
      {mockData.map((value, index) => (
        <li key={index}>
          {/* @todo remove ImageHolder here - it's only for showing how this components works */}
          <ImageHolder src={value.image} additionalStyles={styles.image} />
          <div className={styles.desc}>
            <h3>Group title</h3>
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
