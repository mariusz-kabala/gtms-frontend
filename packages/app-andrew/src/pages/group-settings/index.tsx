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
      <div>
        <ul>
          <li>
            <a>General Settings</a>
          </li>
          <li>
            <a>Members</a>
          </li>
          <li>
            <a>Lorem ipsum</a>
          </li>
          <li>
            <a>Dolor sit amet</a>
          </li>
          <li>
            <a>Voluptate minim</a>
          </li>
        </ul>
        <div className={styles.content}>
          <p>
            Mollit est irure duis id consectetur incididunt ullamco nostrud anim magna enim qui. Do qui et cupidatat ea tempor nisi quis occaecat culpa fugiat laborum consectetur pariatur dolor. Deserunt sit dolore consequat irure est eu fugiat elit minim culpa. Aliqua consequat reprehenderit duis sint culpa voluptate. Mollit exercitation magna nulla cupidatat qui ipsum do culpa. Qui aute incididunt voluptate aute excepteur quis aute mollit est adipisicing amet qui. Amet eu non minim sunt nulla dolore ut do excepteur veniam ea qui.
          </p>
          <p>
            Mollit est irure duis id consectetur incididunt ullamco nostrud anim magna enim qui. Do qui et cupidatat ea tempor nisi quis occaecat culpa fugiat laborum consectetur pariatur dolor. Deserunt sit dolore consequat irure est eu fugiat elit minim culpa. Aliqua consequat reprehenderit duis sint culpa voluptate. Mollit exercitation magna nulla cupidatat qui ipsum do culpa. Qui aute incididunt voluptate aute excepteur quis aute mollit est adipisicing amet qui. Amet eu non minim sunt nulla dolore ut do excepteur veniam ea qui.
          </p>
          <p>
            Mollit est irure duis id consectetur incididunt ullamco nostrud anim magna enim qui. Do qui et cupidatat ea tempor nisi quis occaecat culpa fugiat laborum consectetur pariatur dolor. Deserunt sit dolore consequat irure est eu fugiat elit minim culpa. Aliqua consequat reprehenderit duis sint culpa voluptate. Mollit exercitation magna nulla cupidatat qui ipsum do culpa. Qui aute incididunt voluptate aute excepteur quis aute mollit est adipisicing amet qui. Amet eu non minim sunt nulla dolore ut do excepteur veniam ea qui.
          </p>
        </div>
      </div>
      <Button additionalStyles={styles.btn}>See more</Button>
    </div>
  )
}

GroupSettingsPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupSettingsPage'] })
}

export default GroupSettingsPage
