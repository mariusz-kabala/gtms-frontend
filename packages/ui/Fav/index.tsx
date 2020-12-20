import React, { FC, useState, useCallback } from 'react'
import { IoMdStar, IoMdStarOutline } from 'react-icons/io'
import styles from './styles.scss'

export const Fav: FC<{
  isChecked: boolean
  onClick: (checked: boolean) => unknown
}> = ({ isChecked, onClick }) => {
  const [checked, setChecked] = useState<boolean>(isChecked)
  const onHover = useCallback(() => setChecked((checked) => !checked), [])
  const onFavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault()
      e.stopPropagation()

      onClick(checked)
    },
    [checked]
  )

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <a onClick={onFavClick}>{checked ? <IoMdStar /> : <IoMdStarOutline />}</a>
    </div>
  )
}
