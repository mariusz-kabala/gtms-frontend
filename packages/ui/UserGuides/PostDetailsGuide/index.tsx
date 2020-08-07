import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Picture } from '@gtms/ui/Picture'

export const PostDetailsGuide: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      data-testid={'post-details-guide'}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <Picture
        jpg={'/images/white-theme/icon-click-post-and-read-full-content.png'}
      />
      <span>Click post and read full content here </span>
    </div>
  )
}
