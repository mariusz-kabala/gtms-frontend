import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { useDropzone, DropEvent } from 'react-dropzone'
// ui
import { IoIosCloudUpload } from 'react-icons/io'
import { Spinner } from '../Spinner'
import styles from './styles.scss'

export const UploadFile: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  isLoading?: boolean
  isError?: boolean
  accept?: string[] | string
  placeholder?: string
  onDrop: (
    acceptedFiles: File[],
    rejectedFiles: File[],
    event: DropEvent
  ) => unknown
}> = ({
  additionalStyles,
  onClick,
  onDrop,
  isLoading = false,
  isError = false,
  placeholder = 'dragAndDropFilesHere',
  accept,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => unknown,
    accept,
  })
  const { t } = useTranslation('uploadFileComponent')

  return (
    <div
      data-testid="upload-file"
      onClick={onClick}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <div {...getRootProps()} className={styles.dropzone}>
        {isError && <div>Error occured</div>}
        {isLoading && !isError && <Spinner />}
        {!isLoading && !isError && (
          <>
            <input {...getInputProps()} />
            <i>
              <IoIosCloudUpload />
            </i>
            {isDragActive ? (
              <p className={styles.text}>{t('dropFilesHere')}</p>
            ) : (
              <p className={styles.text}>{t(placeholder)}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
