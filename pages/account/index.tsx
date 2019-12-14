import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'i18n'
import styles from './styles.scss'
import { DeleteAccount } from 'components/account/DeleteAccount'
import { ItemCarousel } from 'components/common/ItemCarousel'
import { NavigationDot } from 'components/common/NavigationDot'
import { PushNotifications } from 'components/account/PushNotfications'
import { Tag } from 'components/common/Tag'
import { TagGroup } from 'components/common/TagGroup'
import { UserAvatar } from 'components/common/UserAvatar'
import { UserEmail } from 'components/account/UserEmail'
import { UserName } from 'components/account/UserName'
import { UserPassword } from 'components/account/UserPassword'

import mockData from './mockData.json'

export const AccountPage: NextPage<{}> = () => {
  const { t } = useTranslation('account')

  return (
    <div className={styles.wrapper}>
      <section>
        <div>
          <p>{t('title')}</p>
          <UserAvatar
            image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
            additionalStyles={styles.userAvatar}
            userName="Marty McFly"
          />
        </div>
        <div>
          <div>user images</div>
          <ItemCarousel data={mockData} />
        </div>
      </section>

      <section>
        <UserEmail />
      </section>

      <section>
        <UserPassword />
      </section>

      <section>
        <UserName />
      </section>

      <section>
        <TagGroup additionalStyles={styles.promotedTags}>
          {/* @todo remove mock data */}
          <Tag label="Mechanik" />
          <Tag label="Oddam" />
          <Tag label="SerwisRowerowy" />
          <Tag label="Impreza" />
          <Tag label="DzienKobiet" />
          <Tag label="Znaleziono" />
          <Tag label="Polityka" />
        </TagGroup>
      </section>
      <section>
        <PushNotifications />
      </section>
      <DeleteAccount />
      <NavigationDot />
    </div>
  )
}

AccountPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['account'] })
}

export default AccountPage
