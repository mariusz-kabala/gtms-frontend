import React, { FC } from 'react'
// ui
import { IoIosAddCircle } from 'react-icons/io'
import { Button } from '../Button'
import { Picture } from '../Picture'
import styles from './styles.scss'

export const EmptyPromotedTags: FC<{
  isAdmin: boolean
  onAddClick?: () => unknown
}> = ({ isAdmin, onAddClick }) => {
  return (
    <div className={styles.wrapper} data-testid="empty-promoted-tags">
      {!isAdmin && (
        <div className={styles.noPostsFound}>
          <div>
            <div>
              <h3 className={styles.header}>
                <span>Ooops</span>, wygląda na to, że nikt nie dodał jeszcze
                żadnych polecanych tagów.
              </h3>
            </div>
            <Picture
              additionalStyles={styles.image}
              jpg={'/images/white-theme/no-posts-yet.png'}
            />
          </div>
        </div>
      )}
      <div className={styles.tags}>
        {isAdmin &&
          new Array(8)
            .fill(null)
            .map((_, index) => (
              <div className={styles.emptyBox} key={`empty-box-${index}`} />
            ))}
        <div className={styles.btnWrapper}>
          {isAdmin && (
            <Button onClick={onAddClick} additionalStyles={styles.addButton}>
              <i>
                <IoIosAddCircle />
              </i>
              Add a promoted tag
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
