import React, { FC, useState, useCallback, useRef, useEffect } from 'react'
import { UploadFile } from '../UploadFile'
import { Modal } from '../Modal'
import ReactAvatarEditor from 'react-avatar-editor'
import styles from './styles.scss'

enum EditorSteps {
  upload,
  edit,
}

export const ImageEditor: FC<{
  isVisible: boolean
  title?: string
  onClose: () => unknown
  onSave: (file: File) => unknown
}> = ({ isVisible, onClose, onSave, title = 'Avatar Editor' }) => {
  const [state, setState] = useState<{
    step: EditorSteps
    image?: File
    scale: number
    rotate: number
    position: {
      x: number
      y: number
    }
  }>({
    step: EditorSteps.upload,
    scale: 1,
    rotate: 0,
    position: {
      x: 0.5,
      y: 0.5,
    },
  })

  const editorRef = useRef<ReactAvatarEditor>(null)

  const onAvatarDrop = useCallback(
    (acceptedFiles) => {
      setState({
        ...state,
        step: EditorSteps.edit,
        image: acceptedFiles[0],
      })
    },
    [state]
  )

  useEffect(() => {
    if (!isVisible) {
      setState({
        ...state,
        step: EditorSteps.upload,
      })
    }
  }, [isVisible])

  if (!isVisible) {
    return null
  }

  return (
    <Modal additionalStyles={styles.wrapper} onClose={onClose}>
      <div>{title}</div>
      {state.step === EditorSteps.upload && (
        <section>
          <UploadFile
            accept={['image/png', 'image/jpeg']}
            onDrop={onAvatarDrop}
            isLoading={false}
            isError={false}
          />
        </section>
      )}
      {state.step === EditorSteps.edit && (
        <section className={styles.editor}>
          <div className={styles.preview}>
            <ReactAvatarEditor
              ref={editorRef}
              image={state.image}
              scale={state.scale}
              rotate={state.rotate}
              width={300}
              height={300}
              position={state.position}
              onPositionChange={(position: { x: number; y: number }) =>
                setState({
                  ...state,
                  position,
                })
              }
              borderRadius={50}
              border={[125, 50] as any} // types are fucked
              color={[0, 0, 0, 0.8]}
            />
          </div>
          <div className={styles.tools}>
            <div className={styles.option}>
              <label>Change file</label>
              <input
                type="file"
                onChange={(e) => {
                  if (e?.target?.files && e.target.files.length > 0) {
                    setState({
                      ...state,
                      image: e.target.files[0],
                    })
                  }
                }}
              />
            </div>

            <div className={styles.option}>
              <label>Zoom</label>
              <input
                name="scale"
                type="range"
                onChange={(e) =>
                  setState({
                    ...state,
                    scale: parseFloat(e.target.value),
                  })
                }
                min="1"
                max="2"
                step="0.01"
                defaultValue="1"
              />
            </div>
            <div className={styles.option}>
              <label>Rotate</label>
              <button
                onClick={() =>
                  setState({
                    ...state,
                    rotate: state.rotate - 90,
                  })
                }
              >
                Left
              </button>
              <button
                onClick={() =>
                  setState({
                    ...state,
                    rotate: state.rotate + 90,
                  })
                }
              >
                Right
              </button>
            </div>
            <div className={styles.option}>
              <button
                className={styles.btn}
                onClick={() => {
                  if (!editorRef.current) {
                    return
                  }

                  editorRef.current.getImageScaledToCanvas().toBlob((blob) => {
                    if (!blob) {
                      return
                    }

                    const file = new File([blob], 'user-avatar.jpg', {
                      type: 'image/jpeg',
                    })

                    onSave(file)
                  }, 'image/jpeg')
                }}
              >
                Save
              </button>
            </div>
          </div>
        </section>
      )}
    </Modal>
  )
}
