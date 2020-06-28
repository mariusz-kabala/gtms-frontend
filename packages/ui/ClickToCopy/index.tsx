import React, { FC } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'
import useClipboard from 'react-use-clipboard'

export const ClickToCopy: FC<{
  additionalStyles?: string
  text: string
}> = ({ additionalStyles, text }) => {
  const { t } = useTranslation('clickToCopyUiComponent')
  const [isCopied, setCopied] = useClipboard(text)

  return (
    <Button
      additionalStyles={cx(styles.btn, additionalStyles)}
      onClick={setCopied}
      testid="click-to-copy"
    >
      {!isCopied && t('copyLink')}
      {isCopied && t('copied')}
    </Button>
  )
}
