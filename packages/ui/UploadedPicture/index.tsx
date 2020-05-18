import React, { FC } from 'react'
import { Picture } from '../Picture'
import styles from './styles.scss'
import cn from 'classnames'
import { IoMdRefreshCircle } from 'react-icons/io'

export const UploadedPicture: FC<{
  jpg?: string
  webp?: string
  onReload?: () => unknown
  additionalStyles?: string
}> = ({ jpg, webp, additionalStyles, onReload }) => (
  <div className={cn(styles.container, additionalStyles)}>
    <p>
      <span>Processing</span>
      {onReload && (
        <i onClick={onReload} title="Click to reload">
          <IoMdRefreshCircle />
        </i>
      )}
    </p>
    <Picture jpg={jpg} webp={webp} />
  </div>
)
