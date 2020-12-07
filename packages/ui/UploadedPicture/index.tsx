import React, { FC } from 'react'
import cx from 'classnames'
// ui
import { IoMdRefreshCircle } from 'react-icons/io'
import { Picture } from '../Picture'
import { Spinner } from '../Spinner'
// styles
import styles from './styles.scss'

export const UploadedPicture: FC<{
  additionalStyles?: string
  jpg?: string
  onReload?: () => unknown
  webp?: string
}> = ({ additionalStyles, jpg, onReload, webp }) => (
  <div className={cx(styles.wrapper, additionalStyles)}>
    <div className={styles.spinnerAndReload}>
      <Spinner size="sm" />
      {onReload && (
        <a onClick={onReload} title="Click to reload">
          <i>
            <IoMdRefreshCircle />
          </i>
        </a>
      )}
    </div>
    <Picture jpg={jpg} webp={webp} />
  </div>
)
