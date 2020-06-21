import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const NavigationTabs: FC<{
  additionalStyles?: string
  data?: obj
}> = ({
  additionalStyles, data
}) => {
  return data?.links.length > 0 ? (
    <div className={cx(styles.wrapper, additionalStyles)}>
      <h2 className={styles.header}>{data.header}</h2>
      <ul className={styles.elements}>
        {data.links.map((item) => <li className={styles.item} key={item.id}>{item.description}</li>)}
      </ul>
    </div>
  ) : null
}
