import React, { FC } from 'react'
import cx from 'classnames'
import { FaRegLightbulb } from 'react-icons/fa'
import { BsFillImageFill } from 'react-icons/bs'
import styles from './styles.scss'

const Line: FC<{
  size: string
}> = ({ size }) => (
  <div
    className={cx(styles.line, {
      [styles.sm]: size == 'sm',
      [styles.md]: size == 'md',
      [styles.lg]: size == 'lg',
    })}
  >
    <div className={cx(styles.bar, styles.bar1)}>
      <div className={cx(styles.bar, styles.bar2)} />
    </div>
  </div>
)

const AvatarAndText: FC<{
  index?: number
}> = ({ index }) => (
  <div className={styles.avatarAndText} key={index}>
    <div className={cx(styles.square, styles.sm)} />
    <div className={styles.textLines}>
      <Line size="lg" />
      <div className={styles.twoLines}>
        <Line size="md" />
        <Line size="md" />
      </div>
      <Line size="sm" />
    </div>
  </div>
)

const User: FC<{
  index?: number
}> = ({ index }) => (
  <div className={styles.user} key={index}>
    <i>
      <BsFillImageFill />
    </i>
    <div className={styles.textLines}>
      <Line size="md" />
      <Line size="sm" />
      <Line size="sm" />
    </div>
  </div>
)

export const MockData: FC<{
  additionalStyles?: string
  text?: string
  onClick?: () => unknown
  numberOfElements?: number
  theme?: string
}> = ({ additionalStyles, numberOfElements, onClick, text, theme }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid={'mock-data'}
    >
      {text ? (
        <div
          onClick={onClick}
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
          .map((_, index) => AvatarAndText({ index }))
      )}
    </div>
  )
}

export const MockUsers: FC<{
  additionalStyles?: string
  numberOfElements?: number
  theme?: string
}> = ({ additionalStyles, numberOfElements }) => {
  return (
    <div
      className={cx(styles.wrapper, additionalStyles)}
      data-testid={'mock-users'}
    >
      {new Array(numberOfElements ? numberOfElements : 1)
        .fill(null)
        .map((_, index) => User({ index }))}
    </div>
  )
}
