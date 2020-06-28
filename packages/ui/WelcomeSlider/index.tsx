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
      style={{
        backgroundImage: `url('/images/temp_images/cover-image-travel.png')`,
      }}
    >
      <Picture jpg={'/images/temp_images/cover-image-travel-text.png'} />
    </div>
  )
}
