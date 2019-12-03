import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

/* @todo remove mock */
const mockData = [
  {
    _id: 1,
    isActive: false,
    tags: [
      {
        _id: 124443,
        label: 'dojazdy',
      },
      {
        _id: 144123,
        label: 'katowice',
      },
      {
        _id: 123423,
        label: 'kostrzyn',
      },
    ],
    locations: [
      {
        _id: 323123,
        label: 'katowice',
      },
      {
        _id: 12223,
        label: 'kostrzyn',
      },
    ],
    groups: [
      {
        _id: 123123,
        label: 'jedziemy na woodstock',
      },
    ],
  },
  {
    _id: 2,
    isActive: true,
    tags: [
      {
        _id: 124443,
        label: 'dojazdy',
      },
      {
        _id: 144123,
        label: 'katowice',
      },
      {
        _id: 123423,
        label: 'kostrzyn',
      },
    ],
    locations: [
      {
        _id: 323123,
        label: 'katowice',
      },
      {
        _id: 12223,
        label: 'kostrzyn',
      },
    ],
    groups: [
      {
        _id: 123123,
        label: 'jedziemy na woodstock',
      },
    ],
  },
]

export const SavedSearch: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => (
  <ul className={additionalStyles}>
    {mockData &&
      mockData.length > 0 &&
      mockData.map(search => (
        <li
          className={cx(styles.search, {
            [styles.active]: search.isActive,
          })}
          key={search._id}
        >
          {search && search.tags && (
            <ul className={styles.tags}>
              {search.tags.map(tag => {
                return (
                  <li className={styles.tag} key={tag._id}>
                    #{tag.label}
                  </li>
                )
              })}
            </ul>
          )}

          {search && search.locations && (
            <ul className={styles.locations}>
              {search.locations.map(location => {
                return (
                  <li className={styles.location} key={location._id}>
                    {location.label}
                  </li>
                )
              })}
            </ul>
          )}

          {search && search.groups && (
            <ul className={styles.groups}>
              {search.groups.map(group => {
                return (
                  <li className={styles.group} key={group._id}>
                    {group.label}
                  </li>
                )
              })}
            </ul>
          )}
        </li>
      ))}
  </ul>
)
