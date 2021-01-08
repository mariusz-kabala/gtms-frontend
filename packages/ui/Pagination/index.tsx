import React, { FC, useCallback } from 'react'
import cx from 'classnames'
// ui
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import styles from './styles.scss'

export const Pagination: FC<{
  additionalStyles?: string
  getCurrentUrl?: (page: number) => string
  limit: number
  offset: number
  onClick: (page: number) => unknown
  total: number
}> = ({ additionalStyles, getCurrentUrl, limit, offset, onClick, total }) => {
  const pages = new Array(Math.ceil(total / limit)).fill(null)
  const currentPage = offset / limit + 1
  const onGoNextClick = useCallback(() => {
    const next = currentPage + 1

    if (next > pages.length) {
      return
    }

    onClick(next)
  }, [currentPage, pages])

  const onGoPrevClick = useCallback(() => {
    const prev = currentPage - 1

    if (prev < 1) {
      return
    }

    onClick(prev)
  }, [currentPage])

  if (total <= limit) {
    return null
  }

  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid={'pagination'}
    >
      <ul className={styles.items}>
        <li className={styles.item} onClick={onGoPrevClick}>
          <i className={styles.icon}>
            <GoChevronLeft />
          </i>
          prev
        </li>
        {pages.map((_, index) => (
          <li
            onClick={() => onClick(index + 1)}
            className={cx(styles.item, {
              [styles.active]: index + 1 === currentPage,
            })}
            key={index}
          >
            <a href={getCurrentUrl ? getCurrentUrl(index + 1) : '#'}>
              <span>{index + 1}</span>
            </a>
          </li>
        ))}

        <li className={styles.item} onClick={onGoNextClick}>
          next
          <i className={styles.icon}>
            <GoChevronRight />
          </i>
        </li>
      </ul>
    </div>
  )
}
