import React, { FC, useState, useEffect, useCallback } from 'react'
import cx from 'classnames'
import { findTagsAPI, fetchSuggestedTagsAPI } from '@gtms/api-tags'
import { findbyUsernameAPI } from '@gtms/api-auth'
import { uploadPostImage } from '@gtms/api-post'
import { deleteTmpFileAPI } from '@gtms/api-file'
import { UserAvatarNoImage } from '@app/enums'
import { openLoginModal } from '@app/state'
import {
  IPostCreateState,
  postCreateState,
  postCreateState$,
} from './state.query'
import { createNewPost } from '@gtms/state-post'
// ui
import { PostCreate as PostCreateUI } from '@gtms/ui/PostCreate'
import { Button } from '@gtms/ui/Button'
import { UploadFile } from '@gtms/ui/UploadFile'
import { IoIosCloseCircle, IoMdSend } from 'react-icons/io'
import { BsFillImageFill } from 'react-icons/bs'
// styles
import styles from './styles.scss'

export const PostCreate: FC<{
  additionalStyles?: string
  groupId: string
}> = ({ additionalStyles, groupId }) => {
  const [state, setState] = useState<IPostCreateState>(postCreateState())
  const [value, setValue] = useState<string>('')
  const [showSendButton, setShowSendButton] = useState<boolean>(false)
  const [fileUploadState, setfileUploadState] = useState<{
    isVisible: boolean
    isLoading: boolean
    isError: boolean
    files: { url: string; id: string; file: string | ArrayBuffer | null }[]
  }>({
    isVisible: false,
    isLoading: false,
    isError: false,
    files: [],
  })

  const closeUploadArea = useCallback(() => {
    setfileUploadState({
      isVisible: false,
      isLoading: false,
      isError: false,
      files: [],
    })
  }, [])

  const onRemoveUploadedImage = useCallback((index: number) => {
    setfileUploadState((state) => {
      const { files } = state
      const deletedFile = files[index]

      deleteTmpFileAPI(deletedFile.id)

      files.splice(index, 1)

      return {
        ...state,
        files: [...files],
      }
    })
  }, [])

  const onImageDrop = useCallback(async (acceptedFiles) => {
    setfileUploadState((state) => ({
      ...state,
      isError: false,
      isLoading: true,
    }))

    Promise.all(
      acceptedFiles.map(
        (file: File) =>
          new Promise(async (resolve, reject) => {
            try {
              const { url, id } = await uploadPostImage(file)
              const reader = new FileReader()

              reader.onload = (e) => {
                setfileUploadState((state) => ({
                  ...state,
                  files: [
                    ...state.files,
                    {
                      url,
                      id,
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
        setfileUploadState((state) => ({
          ...state,
          isError: false,
          isLoading: false,
        }))
      })
      .catch(() => {
        setfileUploadState((state) => ({
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
    <div
      onClick={() => setShowSendButton(true)}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <PostCreateUI
        fetchSuggestedTags={fetchSuggestedTagsAPI}
        fetchTags={findTagsAPI}
        fetchUsers={findbyUsernameAPI}
        noImage={UserAvatarNoImage}
        onLoginRequest={openLoginModal}
        setValue={setValue}
        user={state.user}
        value={value}
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
        <div className={styles.attachedImages}>
          {fileUploadState.files.map((file, index) => (
            <div key={`image-${index}`} className={styles.item}>
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

      {showSendButton && (
        <div className={styles.buttons}>
          <Button
            additionalStyles={cx(styles.btn, styles.btnImages)}
            type="submit"
            onClick={() =>
              setfileUploadState((state) => ({
                ...state,
                isVisible: !state.isVisible,
              }))
            }
          >
            <i>
              <BsFillImageFill />
            </i>
            add images
          </Button>
          <Button
            additionalStyles={styles.btn}
            type="submit"
            disabled={value === ''}
            onClick={() => {
              if (!state.user) {
                openLoginModal()
                return
              }

              createNewPost({
                group: groupId,
                text: value,
                files: fileUploadState.files.map((file) => ({
                  id: file.id,
                  url: file.url,
                })),
              })
              setValue('')
            }}
          >
            send
            <i>
              <IoMdSend />
            </i>
          </Button>
        </div>
      )}
    </div>
  )
}
