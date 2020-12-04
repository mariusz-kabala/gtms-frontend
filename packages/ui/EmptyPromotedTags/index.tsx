import React, { FC } from 'react'
// ui
import { IoIosAddCircle } from 'react-icons/io'
import { Button } from '../Button'
import styles from './styles.scss'

export const EmptyPromotedTags: FC<{
  onAddClick?: () => unknown
}> = ({ onAddClick }) => {
  return (
    <div className={styles.wrapper} data-testid="empty-promoted-tags">
      {new Array(24).fill(null).map((_, index) => (
        <div className={styles.emptyBox} key={`empty-box-${index}`} />
      ))}
      <div className={styles.btnWrapper}>
        <Button onClick={onAddClick} additionalStyles={styles.addButton}>
          <i>
            <IoIosAddCircle />
          </i>
          Add a promoted tag
        </Button>
      </div>
    </div>
  )
}
