import React, { FC, useState } from 'react'
import cx from 'classnames'
// ui
import { BsCardImage } from 'react-icons/bs'
import { IoMdCloseCircle, IoIosAddCircle } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { UploadFile } from '@gtms/ui/UploadFile'
import styles from './styles.scss'

export const CoverImageGroup: FC<{
  additionalStyles?: string
  setShowCoverImage?: (value: boolean) => unknown
}> = ({ additionalStyles, setShowCoverImage }) => {
  const [isStepTwo, setIsStepTwo] = useState<boolean>(false)

  return (
    <div
      data-testid="cover-image-group"
      className={cx(styles.wrapper, additionalStyles)}
      // style={{
      //   backgroundImage: `url('/images/white-theme/spotted-bg-highschool.png')`,
      // }}
    >
      <div className={cx(styles.step, styles.one)}>
        <i className={styles.icon}>
          <BsCardImage />
        </i>
        <h2 className={styles.header}>You can add cover photo</h2>
        <div className={styles.buttons}>
          <Button
            additionalStyles={styles.btn}
            onClick={() => setShowCoverImage(false)}
          >
            <i>
              <IoMdCloseCircle />
            </i>
            No, thanks
          </Button>
          <Button
            additionalStyles={styles.btn}
            onClick={() => setIsStepTwo(true)}
          >
            <i>
              <IoIosAddCircle />
            </i>
            Lets add it
          </Button>
        </div>
      </div>
      <div
        className={cx(styles.step, styles.two, {
          [styles.active]: isStepTwo,
        })}
      >
        <Button
          additionalStyles={styles.btn}
          onClick={() => setShowCoverImage(false)}
        >
          <i>
            <IoMdCloseCircle />
          </i>
          Nah, I do not want cover image
        </Button>
        <h2 className={styles.header}>
          Great!
          <span className={styles.text}>
            Page with cover image looks soo much better!
          </span>
        </h2>
        <UploadFile
          additionalStyles={styles.fileUpload}
          onDrop={() => null}
          isLoading={false}
          isError={false}
        />
      </div>
    </div>
  )
}
