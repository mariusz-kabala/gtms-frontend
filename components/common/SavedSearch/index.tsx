import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

/* @todo remove mock */
const mockData = [
  {
    isActive: false,
    tags: ['dojazdy', 'katowice', 'kostrzyn'],
    locations: ['katowice', 'kostrzyn'],
    groups: ['jedziemy na woodstock'],
  },
  {
    isActive: true,
    tags: ['dojazdy', 'warszawa', 'kostrzyn'],
    locations: ['warszawa', 'kostrzyn'],
    groups: ['jedziemy na woodstock'],
  },
  {
    isActive: false,
    tags: ['dojazdy', 'poznań', 'kostrzyn'],
    locations: ['poznań', 'kostrzyn'],
    groups: ['jedziemy na woodstock'],
  },
  {
    isActive: true,
    tags: ['dojazdy', 'warszawa', 'kostrzyn'],
    locations: ['warszawa', 'kostrzyn'],
    groups: ['jedziemy na woodstock'],
  },
  {
    isActive: false,
    tags: ['dojazdy', 'poznań', 'kostrzyn'],
    locations: ['poznań', 'kostrzyn'],
    groups: ['jedziemy na woodstock'],
  },
]

export const SavedSearch: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => (
  <ul className={additionalStyles}>
    {mockData &&
      mockData.length > 0 &&
      mockData.map((search, index) => (
        <li
          className={cx(styles.search, {
            [styles.active]: search.isActive,
          })}
          key={index}
        >
          {search && search.tags && (
            <ul className={styles.tags}>
              {search.tags.map((tag, tagIndex) => {
                return (
                  <li className={styles.tag} key={tagIndex}>
                    #{tag}
                  </li>
                )
              })}
            </ul>
          )}

          {search && search.locations && (
            <ul className={styles.locations}>
              {search.locations.map((location, locationIndex) => {
                return (
                  <li className={styles.location} key={locationIndex}>
                    {location}
                  </li>
                )
              })}
            </ul>
          )}

          {search && search.groups && (
            <ul className={styles.groups}>
              {search.groups.map((group, groupIndex) => {
                return (
                  <li className={styles.group} key={groupIndex}>
                    {group}
                  </li>
                )
              })}
            </ul>
          )}
        </li>
      ))}
  </ul>
)
