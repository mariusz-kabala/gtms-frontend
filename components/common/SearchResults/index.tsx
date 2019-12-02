import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Spinner } from 'components/common/Spinner'

// @todo remove mock
const movies = [
  {
    id: 1,
    image: 'static/images/temp_images/logo-patrol-1.png',
    title: '1983',
  },
  {
    id: 2,
    image: 'static/images/temp_images/logo-patrol-2.png',
    title: 'Russian doll',
  },
  {
    id: 3,
    image: 'static/images/temp_images/logo-sztab-1.png',
    title: 'The rain',
  },
  {
    id: 4,
    image: 'static/images/temp_images/logo-sztab-2.png',
    title: 'Sex education',
  },
  {
    id: 5,
    image: 'static/images/temp_images/logo-sztab-3.png',
    title: 'Elite',
  },
  {
    id: 6,
    image: 'static/images/temp_images/logo-uczymy-ratowac.png',
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
            <li key={index}>
              <img src={value.image} />
              <h3>{value.title}</h3>
            </li>
          )
        })}
      </ul>
    )}
  </div>
)
