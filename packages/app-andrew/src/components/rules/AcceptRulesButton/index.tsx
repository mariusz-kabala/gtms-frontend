import React, { FC } from 'react'
import css from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'

export const AcceptRulesButton: FC<{}> = () => {
  const { t } = useTranslation('rules')

  return (
    <button type="button" className={css.button}>
      {t('rules:AcceptRulesButton.accept')}
    </button>
  )
}
