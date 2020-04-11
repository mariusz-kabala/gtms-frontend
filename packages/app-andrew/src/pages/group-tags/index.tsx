import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
// import { Button } from '@gtms/ui/Button'
import { TagCard } from '@gtms/ui/TagCard'

export const GroupTagsPage: NextPage<{}> = () => {
  const { t } = useTranslation('groupTags')

  return (
    <div className={styles.wrapper} data-testid="group-tags-page">
      <h2 className={styles.header}>{t('Tags')}</h2>
      {/* <Button>Do stuff</Button> */}
      <div className={styles.grid}>
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
        <TagCard image={'images/temp_images/logo-patrol-2.png'} />
      </div>
    </div>
  )
}

GroupTagsPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['groupTags'] })
}

export default GroupTagsPage
