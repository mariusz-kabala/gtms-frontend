import React, { FC } from 'react'
import cx from 'classnames'
import { IPromotedTag } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
// ui
import { GridCard } from '@gtms/ui/GridCard'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

export const TagsGrid: FC<{
  additionalStyles?: string
  isLoading: boolean
  tags: IPromotedTag[]
}> = ({ additionalStyles, isLoading, tags }) => {
  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      {isLoading && <Spinner />}
      {tags.length > 0 && (
        <>
          <ul className={styles.items}>
            {tags.map((item) => (
              <li className={styles.item} key={item.id}>
                <GridCard
                  name={item.tag}
                  desc={item.description}
                  image={getImage('200x200', item.logo)}
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
