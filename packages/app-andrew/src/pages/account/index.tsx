import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import styles from './styles.scss'
import { DeleteAccount } from '../../components/account/DeleteAccount'
import { UserName } from '../../components/account/UserName'
import { ImageHolder } from '@gtms/ui/ImageHolder'
import { Tag } from '@gtms/ui/Tag'
import { TagGroup } from '@gtms/ui/TagGroup'
import { userQuery, getAccountDetails } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'

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
            src="/images/temp_images/avatar-1.png"
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
          <DeleteAccount onConfirm={() => null} />
        </div>
      </div>
    </div>
  )
}

AccountPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!userQuery.isLogged()) {
    redirect('/login', ctx)
  }
  await getAccountDetails()

  return { namespacesRequired: ['account'] }
}

export default AccountPage
