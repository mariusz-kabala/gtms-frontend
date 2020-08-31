import React, { FC, useState, useEffect, useCallback } from 'react'
import { findTagsAPI, fetchSuggestedTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { uploadPostImage } from '@gtms/api-post'
import { UserAvatarNoImage } from 'enums'
import { openLoginModal } from 'state'
import {
  IPostCreateState,
  postCreateState,
  postCreateState$,
} from './state.query'
import { createNewPost } from '@gtms/state-post'
// ui
import { PostCreate as PostCreateUI } from '@gtms/ui/PostCreate'
import { UploadFile } from '@gtms/ui/UploadFile'
import { IoIosCloseCircle } from 'react-icons/io'
// styles
import styles from './styles.scss'

export const PostCreate: FC<{ groupId: string }> = ({ groupId }) => {
  const [state, setState] = useState<IPostCreateState>(postCreateState())
  const [fileUploadState, sefileUploadState] = useState<{
    isVisible: boolean
    isLoading: boolean
    isError: boolean
    files: { url: string; file: string | ArrayBuffer | null }[]
  }>({
    isVisible: false,
    isLoading: false,
    isError: false,
    files: [],
  })

  const closeUploadArea = useCallback(() => {
    sefileUploadState({
      isVisible: false,
      isLoading: false,
      isError: false,
      files: [],
    })
  }, [])

  const onRemoveUploadedImage = useCallback((index: number) => {
    sefileUploadState((state) => {
      const { files } = fileUploadState
      files.splice(index, 1)

      return {
        ...state,
        files: [...files],
      }
    })
  }, [])

  const onImageDrop = useCallback(async (acceptedFiles) => {
    sefileUploadState((state) => ({
      ...state,
      isError: false,
      isLoading: true,
    }))

    Promise.all(
      acceptedFiles.map(
        (file: File) =>
          new Promise(async (resolve, reject) => {
            try {
              const { url } = await uploadPostImage(file)
              const reader = new FileReader()

              reader.onload = (e) => {
                sefileUploadState((state) => ({
                  ...state,
                  files: [
                    ...state.files,
                    {
                      url,
                      file: e.target ? e.target.result : null,
                    },
                  ],
                }))

                resolve()
              }

              reader.readAsDataURL(file)
            } catch (err) {
              reject(err)
            }
          })
      )
    )
      .then(() => {
        sefileUploadState((state) => ({
          ...state,
          isError: false,
          isLoading: false,
        }))
      })
      .catch(() => {
        sefileUploadState((state) => ({
          ...state,
          isError: true,
          isLoading: false,
        }))
      })
  }, [])

  useEffect(() => {
    const sub = postCreateState$.subscribe((value) => {
      setState(value)
    })

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])
  return (
    <div className={styles.wrapper}>
      <PostCreateUI
        fetchTags={findTagsAPI}
        fetchUsers={findbyUsernameAPI}
        fetchSuggestedTags={fetchSuggestedTagsAPI}
        onFocus={() =>
          sefileUploadState((state) => ({
            ...state,
            isVisible: true,
          }))
        }
        user={state.user}
        noImage={UserAvatarNoImage}
        onSubmit={(text: string) => {
          createNewPost({
            group: groupId,
            text,
          })
        }}
        onLoginRequest={openLoginModal}
      />
      {fileUploadState.isVisible && fileUploadState.files.length < 5 && (
        <div className={styles.uploadWrapper}>
          <a className={styles.close} onClick={closeUploadArea}>
            <i>
              <IoIosCloseCircle />
            </i>
          </a>
          <UploadFile
            accept="image/*"
            placeholder="uploadPostImages"
            onDrop={onImageDrop}
            isLoading={fileUploadState.isLoading}
            isError={fileUploadState.isError}
          />
        </div>
      )}
      {fileUploadState.files.length > 0 && (
        <div className={styles.gallery}>
          {fileUploadState.files.map((file, index) => (
            <div key={`image-${index}`} className={styles.img}>
              <a
                className={styles.close}
                onClick={() => onRemoveUploadedImage(index)}
              >
                <i>
                  <IoIosCloseCircle />
                </i>
              </a>
              <img src={file.file as string} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
