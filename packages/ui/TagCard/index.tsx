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
      {image && <img className={styles.avatar} src={image} alt="user avatar" />}
      <div className={styles.desc}>
        <h3 className={styles.title}>
          #dojazdy
          <span>124 posty</span>
        </h3>
        <p className={styles.text}>
          Id in veniam sunt labore. Adipisicing proident dolor nulla cillum
          cupidatat. Do sint labore cupidatat.
        </p>
      </div>
    </div>
  )
}
