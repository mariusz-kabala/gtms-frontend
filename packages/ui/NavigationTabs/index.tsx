import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const NavigationTabs: FC<{
  additionalStyles?: string
}> = ({
  additionalStyles,
}) => {
  const mock = {
    header: 'Posts',
    links: [
      {
        id: 0,
        description: 'Promoted tags',
      },
      {
        id: 1,
        description: 'Hot tags',
      },
      {
        id: 2,
        description: 'Favorites tags',
      },
      {
        id: 3,
        description: 'Favorites tags',
      }
    ]
  }

  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      <h2 className={styles.header}>Posts</h2>
      <ul className={styles.elements}>
        {mock?.links.length > 0 && (
          mock?.links.map((item) => <li className={styles.item} key={item.id}>{item.description}</li>)
        )}
      </ul>
    </div>
  )
}
