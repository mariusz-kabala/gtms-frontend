import React, { FC } from 'react'
import cx from 'classnames'
// ui
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import styles from './styles.scss'

export const Pagination: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  const renderDots = () => {
    return arr.map((value, index) => (
      <li className={styles.item} key={index}>
        <span>{value}</span>
      </li>
    ))
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid={'pagination'}
    >
      <ul className={styles.items}>
        <li className={styles.item}>
          <i className={styles.icon}>
            <GoChevronLeft />
          </i>
          prev
        </li>
        {renderDots()}

        {/* mock for active state */}
        <li className={cx(styles.item, styles.active)}>x</li>

        <li className={styles.item}>
          next
          <i>
            <GoChevronRight />
          </i>
        </li>
      </ul>
    </div>
  )
}
