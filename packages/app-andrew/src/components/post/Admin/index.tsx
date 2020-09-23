import React, { FC, useState, useCallback, useRef } from 'react'
import useKey from 'use-key-hook'
// commons
import { useOnClickOutside } from '@gtms/commons/hooks/onClickOutside'
// ui
import { IoIosMore } from 'react-icons/io'
// styles
import styles from './styles.scss'

export const PostAdmin: FC<{
  postId: string
  onEditClick?: (postId: string) => unknown
  onDeleteClick?: (postId: string) => unknown
  onReportAbuseClick?: (postId: string) => unknown
  onBlockUserClick?: (postId: string) => unknown
  onDropUserFromGroupClick?: (postId: string) => unknown
}> = ({
  postId,
  onEditClick,
  onDeleteClick,
  onReportAbuseClick,
  onBlockUserClick,
  onDropUserFromGroupClick,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)
  const openMenu = useCallback(() => setIsVisible(true), [])
  const closeMenu = useCallback(() => setIsVisible(false), [])

  const onEdit = useCallback(() => {
    closeMenu()
    onEditClick && onEditClick(postId)
  }, [onEditClick, postId])

  const onDelete = useCallback(() => {
    closeMenu()
    onDeleteClick && onDeleteClick(postId)
  }, [onDeleteClick, postId])

  const onReportAbuse = useCallback(() => {
    closeMenu()
    onReportAbuseClick && onReportAbuseClick(postId)
  }, [onReportAbuseClick, postId])

  const onBlockUser = useCallback(() => {
    closeMenu()
    onBlockUserClick && onBlockUserClick(postId)
  }, [onBlockUserClick, postId])

  const onDropUserFromGroup = useCallback(() => {
    closeMenu()
    onDropUserFromGroupClick && onDropUserFromGroupClick(postId)
  }, [onDropUserFromGroupClick, postId])

  useOnClickOutside(ref, closeMenu)

  useKey(
    () => {
      closeMenu()
    },
    {
      detectKeys: [27],
    }
  )

  return (
    <div className={styles.wrapper} ref={ref}>
      <button onClick={openMenu} className={styles.btn}>
        <i>
          <IoIosMore />
        </i>
      </button>
      {isVisible && (
        <ul className={styles.items}>
          <li className={styles.item}>
            <a onClick={onEdit}>Edit</a>
          </li>
          <li className={styles.item}>
            <a onClick={onDelete}>Delete</a>
          </li>
          <li className={styles.item}>
            <a onClick={onReportAbuse}>Report abuse</a>
          </li>
          <li className={styles.item}>
            <a onClick={onBlockUser}>Block user</a>
          </li>
          <li className={styles.item}>
            <a onClick={onDropUserFromGroup}>Drop user from group</a>
          </li>
        </ul>
      )}
    </div>
  )
}
