import React, { FC } from 'react'
import cx from 'classnames'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { IImage } from '@gtms/commons/types/image'
// ui
import styles from './styles.scss'
import { Button } from '@gtms/ui/Button'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'

export const UserGroups: FC<{
  additionalStyles?: string
  isLoading?: boolean
  groups: IGroup[]
  noImage: { [key: string]: IImage }
}> = ({ additionalStyles, groups, noImage, isLoading = false }) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {isLoading && <Spinner />}
      {groups.length > 0 && (
        <>
          <ul className={styles.items}>
            {groups.map((group) => (
              <li className={styles.item} key={`group-${group.id}`}>
                <Picture
                  additionalStyles={styles.image}
                  maxHeight={250}
                  {...getImage('200x200', group.avatar, noImage)}
                />
                <div className={styles.desc}>
                  <h3>{group.name}</h3>
                  <p>{group.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.btnWrapper}>
            <Button type="submit" additionalStyles={styles.btn}>
              show more...
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
