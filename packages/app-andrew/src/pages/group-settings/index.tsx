import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { Button } from '@gtms/ui/Button'

export const GroupSettingsPage: NextPage<{}> = () => {
  const { t } = useTranslation('groupSettingsPage')

  return (
    <div className={styles.wrapper} data-testid="group-settings-page">
      <h2 className={styles.header}>{t('header')}</h2>
      <p>
        Eiusmod anim Lorem fugiat voluptate minim sint id occaecat nostrud dolor. Exercitation mollit duis id excepteur tempor. Ut veniam in adipisicing laborum Lorem fugiat reprehenderit magna excepteur in labore tempor fugiat ad. Lorem irure incididunt esse dolor eu dolore enim Lorem dolore. Excepteur irure qui fugiat est ea incididunt enim.
      </p>
      <p>
        Eiusmod anim Lorem fugiat voluptate minim sint id occaecat nostrud dolor. Exercitation mollit duis id excepteur tempor. Ut veniam in adipisicing laborum Lorem fugiat reprehenderit magna excepteur in labore tempor fugiat ad. Lorem irure incididunt esse dolor eu dolore enim Lorem dolore. Excepteur irure qui fugiat est ea incididunt enim.
      </p>
      <p>
        Eiusmod anim Lorem fugiat voluptate minim sint id occaecat nostrud dolor. Exercitation mollit duis id excepteur tempor. Ut veniam in adipisicing laborum Lorem fugiat reprehenderit magna excepteur in labore tempor fugiat ad. Lorem irure incididunt esse dolor eu dolore enim Lorem dolore. Excepteur irure qui fugiat est ea incididunt enim.
      </p>
      <Button additionalStyles={styles.btn}>See more</Button>
    </div>
  )
}

GroupSettingsPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupSettingsPage'] })
}

export default GroupSettingsPage
