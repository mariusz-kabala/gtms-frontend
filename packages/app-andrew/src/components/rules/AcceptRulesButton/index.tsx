import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
// styles
import css from './styles.scss'

export const AcceptRulesButton: FC<{}> = () => {
  const { t } = useTranslation('rules')

  return (
    <button type="button" className={css.button}>
      {t('rules:AcceptRulesButton.accept')}
    </button>
  )
}
