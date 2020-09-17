import React, { FC, useState, useCallback, useRef } from 'react'
// commons
import { useOnClickOutside } from '@gtms/commons/hooks/onClickOutside'
// ui
import { IoIosMore } from 'react-icons/io'
// styles
import styles from './styles.scss'

export const PostAdmin: FC<{}> = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const openMenu = useCallback(() => setIsVisible(true), [])
  const closeMenu = useCallback(() => setIsVisible(false), [])
  useOnClickOutside(ref, closeMenu)

  return (
    <div className={styles.wrapper} ref={ref}>
      <button onClick={openMenu} className={styles.button}>
        <i>
          <IoIosMore />
        </i>
      </button>
      {isVisible && (
        <ul>
          <li>
            <a>Edit</a>
          </li>
          <li>
            <a>Delete</a>
          </li>
          <li>
            <a>Report User</a>
          </li>
          <li>
            <a>Block user</a>
          </li>
          <li>
            <a>Drop user from group</a>
          </li>
        </ul>
      )}
    </div>
  )
}
