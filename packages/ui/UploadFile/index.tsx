import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useDropzone, DropEvent } from 'react-dropzone'
import { IoIosCloudUpload } from 'react-icons/io'
import { Spinner } from '../Spinner'

export const UploadFile: FC<{
  additionalStyles?: string
  onClick?: () => unknown
  isLoading?: boolean
  isError?: boolean
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
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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
              <>
                <p>Drop the files here ...</p>
              </>
            ) : (
              <p>Drag and drop some files here, or click to select files</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
