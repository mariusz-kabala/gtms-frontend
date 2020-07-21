import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { Picture } from '../Picture'

export const WelcomeSlider: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  return (
    <div
      data-testid="welcome-slider"
      className={cx(styles.wrapper, additionalStyles)}
    >
      <Picture jpg={'/images/temp_images/cover-image-travel.png'} />
    </div>
  )
}
