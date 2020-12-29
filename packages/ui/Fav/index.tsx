import React, { FC, useState, useCallback, useEffect } from 'react'
import cx from 'classnames'
import { IoMdStar, IoMdStarOutline } from 'react-icons/io'
import styles from './styles.scss'

export const Fav: FC<{
  additionalStyles?: string
  isChecked: boolean
  onClick: (checked: boolean) => unknown
}> = ({ additionalStyles, isChecked, onClick }) => {
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

  useEffect(() => setChecked(isChecked), [isChecked])

  return (
    <div
      className={cx(styles.favIcon, additionalStyles)}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <a onClick={onFavClick}>{checked ? <IoMdStar /> : <IoMdStarOutline />}</a>
    </div>
  )
}
