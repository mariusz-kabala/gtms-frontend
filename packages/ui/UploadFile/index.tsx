import React, { FC, useCallback } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import {useDropzone} from 'react-dropzone'
import { IoIosTennisball } from 'react-icons/io'

export const UploadFile: FC<{
  additionalStyles?: string
  onClick?: () => unknown
}> = ({ additionalStyles, onClick }) => {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    // @mariusz?
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div
      data-testid="upload-file"
      onClick={onClick}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <>
              <IoIosCloudUpload />
              <p>Drop the files here ...</p>
            </> :
            <p>Drag and drop some files here, or click to select files</p>
        }
      </div>
    </div>
  )
}
