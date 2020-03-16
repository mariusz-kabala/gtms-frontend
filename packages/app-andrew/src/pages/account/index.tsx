import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import styles from './styles.scss'
import { DeleteAccount } from '../../components/account/DeleteAccount'
import { ImageHolder } from '@gtms/ui/ImageHolder'
import { PushNotificationsSwitcher } from '../../components/account/PushNotificationsSwitcher'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { UserName } from '../../components/account/UserName'

export const AccountPage: NextPage<{}> = () => {
  const { t } = useTranslation('account')

  return (
    <div className={styles.wrapper} data-testid="account-page">
      <div className={styles.content}>
        <div
          data-testid="account-page-public"
          className={styles.visibleForEveryone}
        >
          <span className={styles.visibilityLabel}>
            This part is visible for EVERYONE
          </span>
          <ImageHolder
            additionalStyles={styles.userImage}
            src="https://images.unsplash.com/photo-1464863979621-258859e62245"
          />
          <p className={styles.desc}>
            {t('title')}
            Dolore tempor reprehenderit dolor deserunt et. Consequat occaecat
            sit est ipsum eu nisi nostrud consectetur est magna enim sit. Aute
            velit et cupidatat quis labore in labore aute excepteur proident
            aliqua id.
          </p>
          <TagGroup additionalStyles={styles.userTags}>
            <Tag label="Mechanik" />
            <Tag label="Oddam" />
            <Tag label="SerwisRowerowy" />
            <Tag label="Impreza" />
            <Tag label="DzienKobiet" />
            <Tag label="Znaleziono" />
            <Tag label="Polityka" />
          </TagGroup>
        </div>
        <div className={styles.divider} />
        <div
          data-testid="account-page-private"
          className={styles.visibleForOwner}
        >
          <span className={styles.visibilityLabel}>
            This part is visible ONLY FOR YOU
          </span>
          <UserName />
          <PushNotificationsSwitcher />
          <span className={styles.placeholder}>==== USER NAME ====</span>
          <span className={styles.placeholder}>==== USER PASSWORD ====</span>
          <span className={styles.placeholder}>==== USER EMAIL ====</span>
          <DeleteAccount onConfirm={() => null} />
          <span className={styles.placeholder}>
            ==== LINK TO RULES PAGE ===-
          </span>
        </div>
      </div>
    </div>
  )
}

AccountPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['account'] })
}

export default AccountPage
