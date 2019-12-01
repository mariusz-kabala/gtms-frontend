import React, { FC } from 'react'
import styles from './styles.scss'
import { Button } from 'components/common/Button'
import { useTranslation } from 'i18n'

export const ShareGroup: FC<{}> = () => {
  const { t } = useTranslation('shareGroup')

  return (
    <div className={styles.container} data-testid="share-group-component">
      <h2>{t('textOne')}</h2>
      {/* @todo create invite component */}
      <br />
      <br />
      {t('textTwo')}
      <br />
      <br />
      <Button>{t('textThree')}</Button>
    </div>
  )
}
