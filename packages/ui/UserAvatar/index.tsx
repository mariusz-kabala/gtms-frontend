import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'

export const UserAvatar: FC<{
  additionalStyles?: string
  image: string
  onClick?: () => unknown
  testId?: string
}> = ({ additionalStyles, image, onClick, testId }) => (
  <div
    data-testid={testId ?? 'user-avatar'}
    onClick={onClick}
    className={cx(styles.container, additionalStyles)}
  >
    <img data-testid="user-avatar-image" src={image} alt="user avatar" />
  </div>
)
