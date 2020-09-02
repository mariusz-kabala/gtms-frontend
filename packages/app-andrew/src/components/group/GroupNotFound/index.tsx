import React, { FC } from 'react'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { IoIosArrowRoundForward } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import styles from './styles.scss'

export const GroupNotFound: FC = () => {
  const { t } = useTranslation('groupNotFoundComponent')

  return (
    <div className={styles.wrapper} data-testid="group-not-found">
      <ErrorWrapper
        buttons={
          <Button additionalStyles={styles.btn}>
            <i>
              <IoIosArrowRoundForward />
            </i>
            {t('btn')}
          </Button>
        }
      >
        <h2>{t('header')}</h2>
        <p>{t('subheader')}</p>
      </ErrorWrapper>
    </div>
  )
}
