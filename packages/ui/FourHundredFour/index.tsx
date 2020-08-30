import React, { FC } from 'react'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { IoMdArrowBack } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { Picture } from '@gtms/ui/Picture'
import styles from './styles.scss'

export const FourHundredFour: FC<{ additionalStyles?: string }> = ({
  additionalStyles,
}) => {
  const { t } = useTranslation('page404')

  return (
    <div
      data-testid={'four-hundred-four'}
      className={cx(styles.wrapper, additionalStyles)}
    >
      <Picture
        additionalStyles={styles.image}
        jpg={'/images/white-theme/image404.jpg'}
      />
      <Button additionalStyles={styles.btn}>
        <i>
          <IoMdArrowBack />
        </i>
        Button
      </Button>
    </div>
  )
}
