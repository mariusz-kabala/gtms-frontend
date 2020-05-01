import React, { FC, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import ReactAvatarEditor from 'react-avatar-editor'

export const AvatarEditor: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [image, setImage] = useState('avatar.jpg')
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [preview, setPreview] = useState(null)
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })
  const editorRef = React.useRef(null)

  const handleNewImage = e => {
    setImage(e.target.files[0])
  }

  const handleSave = () => {
    const editor = editorRef.current
    const img = editor.getImageScaledToCanvas().toDataURL()
    const rect = editor.getCroppingRect()

    setPreview({
      img,
      rect,
      scale: scale,
      width: 100,
      height: 100,
      borderRadius: 50,
    })
  }

  const handleScale = e => {
    const scale = parseFloat(e.target.value)
    setScale(scale)
  }

  const rotateLeft = e => {
    e.preventDefault()
    setRotate(rotate - 90)
  }

  const rotateRight = e => {
    e.preventDefault()
    setRotate(rotate + 90)
  }

  return (
    <div
      data-testid="avatar-editor"
      className={cx(styles.wrapper, additionalStyles)}
    >
      <ReactAvatarEditor
        ref={editorRef}
        image={image}
        scale={scale}
        rotate={0}
        width={100}
        height={100}
        position={position}
        onPositionChange={setPosition}
        borderRadius={50}
        border={[125, 50]}
        color={[0, 0, 0, 0.8]}
        className="editor-canvas"
      />

      <br />
      New File:
      <input name="newImage" type="file" onChange={handleNewImage} />

      <br />
      Zoom:
      <input
        name="scale"
        type="range"
        onChange={handleScale}
        min="1"
        max="2"
        step="0.01"
        defaultValue="1"
      />

      <br />
      Rotate:
      <button onClick={rotateLeft}>Left</button>
      <button onClick={rotateRight}>Right</button>
      <br />
      <br />
      <input type="button" onClick={handleSave} value="Preview" />
      <br />
      {!!preview && <img src={preview.img} alt="avatar" />}
    </div>
  )
}
