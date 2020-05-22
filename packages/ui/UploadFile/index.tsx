import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { useDropzone, DropEvent } from 'react-dropzone'
import { IoIosCloudUpload } from 'react-icons/io'
import { Spinner } from '../Spinner'

export const UploadFile: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  isLoading?: boolean
  isError?: boolean
  accept?: string[]
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
  accept = [],
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
              <p>{t('dropFilesHere')}</p>
            ) : (
              <p>{t('dragAndDropFilesHere')}</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
