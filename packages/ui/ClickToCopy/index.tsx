import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'
import useClipboard from 'react-use-clipboard'

export const ClickToCopy: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [isCopied, setCopied] = useClipboard(
    'http://jedziemyna.pl/openerfestival'
  )
  const { t } = useTranslation('clickToCopyUiComponent')

  return (
    <>
      <div
        className={cx(styles.wrapper, additionalStyles)}
        data-testid="click-to-copy"
      >
        <h2>{t('header')}</h2>
        <Button
          additionalStyles={styles.btn}
          onClick={setCopied}
        >
          {!isCopied && t('copyLink')}
          {isCopied && t('copied')}
        </Button>
      </div>
    </>
  )
}