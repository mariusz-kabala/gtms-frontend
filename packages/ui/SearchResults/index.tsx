import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Spinner } from '../Spinner'
import image1 from './tmp/logo-patrol-1.png'
import image2 from './tmp/logo-patrol-2.png'
import image3 from './tmp/logo-sztab-1.png'
import image4 from './tmp/logo-sztab-2.png'
import image5 from './tmp/logo-sztab-3.png'
import image6 from './tmp/logo-uczymy-ratowac.png'

// @todo remove mock
const movies = [
  {
    id: 1,
    image: image1,
    title: '1983',
  },
  {
    id: 2,
    image: image2,
    title: 'Russian doll',
  },
  {
    id: 3,
    image: image3,
    title: 'The rain',
  },
  {
    id: 4,
    image: image4,
    title: 'Sex education',
  },
  {
    id: 5,
    image: image5,
    title: 'Elite',
  },
  {
    id: 6,
    image: image6,
    title: 'Black mirror',
  },
]

export const SearchResults: FC<{ tempActive?: boolean }> = ({ tempActive }) => (
  <div
    data-testid="searchResults"
    className={cx(styles.wrapper, {
      [styles.active]: tempActive,
    })}
  >
    <Spinner />
    {tempActive && (
      <ul className={styles.list}>
        {// @todo create group card element that will be reusable in places like this one
        movies.map((value, index) => {
          return (
            <li
              data-testid={`search-result-${index}`}
              key={`search-result-${index}`}
            >
              <img src={value.image} />
              <h3>{value.title}</h3>
            </li>
          )
        })}
      </ul>
    )}
  </div>
)
