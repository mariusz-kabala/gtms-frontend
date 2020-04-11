import React, { FC } from 'react'
import styles from './styles.scss'

export const TagCard: FC<{
  image?: string
}> = ({ image }) => {
  {
    /* @this component is just a mock */
  }

  return (
    <div className={styles.wrapper} data-testid="tag-card">
      <img className={styles.avatar} src={image} alt="tag avatar" />
      <div className={styles.desc}>
        <h2 className={styles.tag}>#dojazdy</h2>
        <p className={styles.desc}>
          Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
          cupidatat. Do sint labore cupidatat.
        </p>
      </div>
    </div>
  )
}
