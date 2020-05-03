import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import {useDropzone} from 'react-dropzone'
import { IoIosCloudUpload } from 'react-icons/io'

export const UploadFile: FC<{
  additionalStyles?: string
  onClick?: () => unknown
}> = ({ additionalStyles, onClick }) => {
  const {acceptedFiles, getRootProps, getInputProps, isDragActive} = useDropzone()

  return (
    <div
      data-testid="upload-file"
      onClick={onClick}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <div {...getRootProps()} className={styles.dropzone}>
        <input {...getInputProps()} />
        <i><IoIosCloudUpload /></i>
        {
          isDragActive ?
            <>
              <p>Drop the files here ...</p>
            </> :
            <p>Drag and drop some files here, or click to select files</p>
        }
      </div>
      {
        acceptedFiles.map(file => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ))
      }
    </div>
  )
}
