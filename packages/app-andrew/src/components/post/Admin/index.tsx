import React, { FC, useState, useCallback, useRef } from 'react'
import useKey from 'use-key-hook'
// commons
import { useOnClickOutside } from '@gtms/commons/hooks/onClickOutside'
// ui
import { AiOutlineForm } from 'react-icons/ai'
import { FcRemoveImage } from 'react-icons/fc'
import { IoIosMore } from 'react-icons/io'
import { IoMdTrash } from 'react-icons/io'
import { RiUserStarLine } from 'react-icons/ri'
// styles
import styles from './styles.scss'
import { Button } from '@gtms/ui'

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
    <div className={styles.postDropdown} ref={ref}>
      <button onClick={openMenu} className={styles.btnDropdown}>
        <i>
          <IoIosMore />
        </i>
      </button>
      {isVisible && (
        <ul className={styles.items}>
          <li className={styles.item}>
            <Button additionalStyles={styles.btn} onClick={onEdit}>
              <i>
                <AiOutlineForm />
              </i>
              Edit
            </Button>
          </li>
          <li className={styles.item}>
            <Button additionalStyles={styles.btn} onClick={onDelete}>
              <i>
                <IoMdTrash />
              </i>
              Delete
            </Button>
          </li>
          <li className={styles.item}>
            <Button additionalStyles={styles.btn} onClick={onReportAbuse}>
              <i>
                <RiUserStarLine />
              </i>
              Report abuse
            </Button>
          </li>
          <li className={styles.item}>
            <Button additionalStyles={styles.btn} onClick={onBlockUser}>
              <i>
                <FcRemoveImage />
              </i>
              Block user
            </Button>
          </li>
          <li className={styles.item}>
            <Button additionalStyles={styles.btn} onClick={onDropUserFromGroup}>
              <i>
                <FcRemoveImage />
              </i>
              Drop user from group
            </Button>
          </li>
        </ul>
      )}
    </div>
  )
}
