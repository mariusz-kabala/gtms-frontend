import React, { FC, useState, useCallback } from 'react'
import { IImage } from '@gtms/commons/types/image'
import { Picture } from '../Picture'
import { UploadedPicture } from '../UploadedPicture'
import { FileStatus } from '@gtms/commons/enums'

export const Image: FC<{
  size: string
  files:
    | {
        [size: string]: IImage
      }
    | string[]
  status?: FileStatus
  noImage?: {
    [size: string]: IImage
  }
  additionalStyles?: string
}> = ({ size, files, status, noImage, additionalStyles }) => {
  const hasNoImage = !(!noImage || !noImage[size])
  const [hide, setHide] = useState<boolean>(false)
  const [showNoImage, setShowNoImage] = useState<boolean>(false)
  const onError = useCallback(() => {
    hasNoImage ? setShowNoImage(true) : setHide(true)
  }, [hasNoImage])

  if (hide) {
    return null
  }

  if (showNoImage && noImage && noImage[size]) {
    return <Picture {...noImage[size]} additionalStyles={additionalStyles} />
  }

  if (!status && !hasNoImage) {
    return null
  }

  if (Array.isArray(files) || status !== FileStatus.ready) {
    if (files.length === 0) {
      return noImage && noImage[size] ? (
        <Picture {...noImage[size]} additionalStyles={additionalStyles} />
      ) : null
    }

    return <UploadedPicture jpg={(files as string[])[0]} />
  }

  if (!files[size] && (!noImage || !noImage[size])) {
    return null
  }

  if (status !== FileStatus.ready && !Array.isArray(files)) {
    return <UploadedPicture jpg={files[size].jpg} />
  }

  if (files[size]) {
    return (
      <Picture
        onError={onError}
        {...files[size]}
        additionalStyles={additionalStyles}
      />
    )
  }

  if (noImage && noImage[size]) {
    return <Picture {...noImage[size]} additionalStyles={additionalStyles} />
  }

  return null
}
