import React, { FC } from 'react'
import { Button } from '../Button'
import styles from './styles.scss'

export const EmptyPromotedTags: FC<{
  isAdmin: boolean
  onAddClick?: () => unknown
}> = ({ isAdmin, onAddClick }) => {
  return (
    <div className={styles.wrapper} data-testid="empty-promoted-tags">
      {!isAdmin && <p>No promoted tags :(</p>}
      {isAdmin &&
        new Array(8)
          .fill(null)
          .map((_, index) => (
            <div className={styles.emptyBox} key={`empty-box-${index}`} />
          ))}
      <div className={styles.btnWrapper}>
        {isAdmin && (
          <Button onClick={onAddClick} additionalStyles={styles.addButton}>
            Add a promoted tag
          </Button>
        )}
      </div>
    </div>
  )
}
