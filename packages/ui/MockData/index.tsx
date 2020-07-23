import React, { FC } from 'react'
import cx from 'classnames'
import { FaRegLightbulb } from 'react-icons/fa'
import styles from './styles.scss'

const AvatarAndText: FC<{ index: number }> = ({ index }) => (
  <div className={styles.avatarAndText} key={index}>
    <div className={cx(styles.square, styles.sm)} />
    <div className={styles.textLines}>
      <div className={cx(styles.line, styles.lg)} />
      <div className={styles.twoLines}>
        <div className={cx(styles.line, styles.md)} />
        <div className={cx(styles.line, styles.md)} />
      </div>
      <div className={cx(styles.line, styles.sm)} />
    </div>
  </div>
)

export const MockData: FC<{
  additionalStyles?: string
  text?: string
  onClick?: () => unknown
  numberOfElements?: number
}> = ({ additionalStyles, numberOfElements, onClick, text }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid={'mock-data'}
    >
      {text ? (
        <div
          className={cx(styles.text, {
            [styles.clickable]: onClick,
          })}
        >
          <i>
            <FaRegLightbulb />
          </i>
          <p>{text}</p>
        </div>
      ) : (
        new Array(numberOfElements ? numberOfElements : 1)
          .fill(null)
          .map((_, index) => AvatarAndText(index))
      )}
    </div>
  )
}
