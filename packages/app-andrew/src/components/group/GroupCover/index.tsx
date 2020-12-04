import React, { FC, useState, useCallback, useEffect } from 'react'
import cx from 'classnames'
import { IGroup } from '@gtms/commons/models'
import { GroupCoverType, FileStatus } from '@gtms/commons/enums'
import { getImage } from '@gtms/commons/helpers'
import { updateGroup } from '@gtms/state-group'
import { uploadGroupCover } from '@gtms/api-group'
// ui
import { CoverImageGroup } from '@gtms/ui/CoverImageGroup'
import { GoSettings } from 'react-icons/go'
// styles
import styles from './styles.scss'

const COVERS = [
  {
    className: styles.cover1,
    cover: GroupCoverType.cover1,
  },
  {
    className: styles.cover2,
    cover: GroupCoverType.cover2,
  },
  {
    className: styles.cover3,
    cover: GroupCoverType.cover3,
  },
  {
    className: styles.cover4,
    cover: GroupCoverType.cover4,
  },
  {
    className: styles.cover5,
    cover: GroupCoverType.cover5,
  },
  {
    className: styles.cover6,
    cover: GroupCoverType.cover6,
  },
  {
    className: styles.cover7,
    cover: GroupCoverType.cover7,
  },
  {
    className: styles.cover8,
    cover: GroupCoverType.cover8,
  },
  {
    className: styles.cover9,
    cover: GroupCoverType.cover9,
  },
  {
    className: styles.cover10,
    cover: GroupCoverType.cover10,
  },
  {
    className: styles.cover11,
    cover: GroupCoverType.cover11,
  },
  {
    className: styles.cover12,
    cover: GroupCoverType.cover12,
  },
  {
    className: styles.cover13,
    cover: GroupCoverType.cover13,
  },
  {
    className: styles.cover14,
    cover: GroupCoverType.cover14,
  },
]

export const GroupCover: FC<{
  group: IGroup
  isEditAllowed: boolean
  additionalStyles?: string
}> = ({ additionalStyles, group, isEditAllowed }) => {
  const [editorState, setEditorState] = useState<{
    show: boolean
    isStepTwo: boolean
  }>({
    show: isEditAllowed && group.coverType === GroupCoverType.unknown,
    isStepTwo: false,
  })
  const [fileUploadState, setfileUploadState] = useState<{
    isLoading: boolean
    isError: boolean
    file: ArrayBuffer | string | null
  }>({
    isLoading: false,
    isError: false,
    file: null,
  })
  const [activeCover, setActiveCover] = useState<string | undefined>(
    group.coverType
  )
  const onClose = useCallback(
    () =>
      setEditorState({
        show: false,
        isStepTwo: false,
      }),
    []
  )
  const onSave = useCallback(async () => {
    let coverType: string | undefined = activeCover

    if (!coverType && fileUploadState.file) {
      coverType = GroupCoverType.file
    }

    if (!coverType) {
      coverType = GroupCoverType.noCover
    }

    await updateGroup(
      {
        coverType: coverType as GroupCoverType,
      },
      group.slug
    )
  }, [fileUploadState, activeCover])
  const onImageDrop = useCallback(
    async (acceptedFiles) => {
      setfileUploadState((state) => ({
        ...state,
        isError: false,
        isLoading: true,
      }))

      const file = acceptedFiles[0]

      try {
        await uploadGroupCover(group.id, file)
        const reader = new FileReader()

        reader.onload = (e) => {
          setfileUploadState((state) => ({
            ...state,
            file: e.target ? e.target.result : null,
          }))

          setEditorState((state) => ({
            ...state,
            isStepTwo: true,
          }))
          setActiveCover(undefined)
        }

        reader.readAsDataURL(file)

        setfileUploadState((state) => ({
          ...state,
          isError: false,
          isLoading: false,
        }))
      } catch (err) {
        setfileUploadState((state) => ({
          ...state,
          isError: true,
          isLoading: false,
        }))
      }
    },
    [group]
  )
  const onSetActiveCover = useCallback((cover: string) => {
    setActiveCover(cover)
    setfileUploadState({
      isLoading: false,
      isError: false,
      file: null,
    })
  }, [])

  useEffect(() => {
    setEditorState({
      show: isEditAllowed && group.coverType === GroupCoverType.unknown,
      isStepTwo: false,
    })
  }, [group, isEditAllowed])

  if (
    !editorState.show &&
    ![GroupCoverType.unknown, GroupCoverType.noCover].includes(group.coverType)
  ) {
    return (
      <div
        data-testid="group-cover-view"
        className={cx(styles.wrapper, additionalStyles)}
      >
        <div
          className={cx(styles.cover, {
            [styles.cover1]: group.coverType === GroupCoverType.cover1,
            [styles.cover2]: group.coverType === GroupCoverType.cover2,
            [styles.cover3]: group.coverType === GroupCoverType.cover3,
            [styles.cover4]: group.coverType === GroupCoverType.cover4,
            [styles.cover5]: group.coverType === GroupCoverType.cover5,
            [styles.cover6]: group.coverType === GroupCoverType.cover6,
            [styles.cover7]: group.coverType === GroupCoverType.cover7,
            [styles.cover8]: group.coverType === GroupCoverType.cover8,
            [styles.cover9]: group.coverType === GroupCoverType.cover9,
            [styles.cover10]: group.coverType === GroupCoverType.cover10,
            [styles.cover11]: group.coverType === GroupCoverType.cover11,
            [styles.cover12]: group.coverType === GroupCoverType.cover12,
            [styles.cover13]: group.coverType === GroupCoverType.cover13,
            [styles.cover14]: group.coverType === GroupCoverType.cover14,
          })}
          style={
            group.coverType === GroupCoverType.file &&
            group.cover.status === FileStatus.ready
              ? {
                  background: `url(${
                    getImage('685x300', group.cover).jpg
                  }) no-repeat top center`,
                }
              : undefined
          }
        >
          {group.coverType === GroupCoverType.file &&
            group.cover.status !== FileStatus.ready && (
              <div data-testid="group-cover-processing-msg">
                Group cover image is being process, will be available soon
              </div>
            )}
          {isEditAllowed && (
            <button
              className={styles.btn}
              onClick={() =>
                setEditorState({
                  show: true,
                  isStepTwo: true,
                })
              }
            >
              <i>
                <GoSettings />
              </i>
              Change cover image
            </button>
          )}
        </div>
      </div>
    )
  }

  if (!editorState.show) {
    return null
  }

  return (
    <div className={cx(styles.wrapper, additionalStyles)}>
      <CoverImageGroup
        activeCover={activeCover}
        cover={group.coverType}
        onClose={onClose}
        onSave={onSave}
        options={COVERS}
        setActiveCover={onSetActiveCover}
        stepTwo={editorState.isStepTwo}
        upload={{
          ...fileUploadState,
          onDrop: onImageDrop,
        }}
      />
    </div>
  )
}
