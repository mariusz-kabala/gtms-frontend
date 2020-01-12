import React from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'i18n'
import styles from './styles.scss'
import { Tag } from 'components/common/Tag'
import { TagGroup } from 'components/common/TagGroup'

import { DeleteAccount } from 'components/account/DeleteAccount'
import { ItemCarousel } from 'components/common/ItemCarousel'
import { NavigationDot } from 'components/common/NavigationDot'
import { PushNotifications } from 'components/account/PushNotfications'
import { UserAvatar } from 'components/common/UserAvatar'
import { UserEmail } from 'components/account/UserEmail'
import { UserName } from 'components/account/UserName'
import { UserPassword } from 'components/account/UserPassword'

import mockData from './mockData.json'

export const AccountPage: NextPage<{}> = () => {
  const { t } = useTranslation('account')

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.visibleForEveryone}>
          <span className={styles.visibilityLabel}>
            this part is visible for everyone
          </span>
          <div
            className={styles.userImage}
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1464863979621-258859e62245')`,
            }}
          >
            <span className={styles.userName}>Larry Ellison</span>
          </div>
          <ul className={styles.images}>
            <li>
              <img src="https://i.picsum.photos/id/1029/536/354.jpg" />
            </li>
            <li>
              <img src="https://i.picsum.photos/id/1029/536/354.jpg" />
            </li>
            <li>
              <img src="https://i.picsum.photos/id/1029/536/354.jpg" />
            </li>
            <li>
              <img src="https://i.picsum.photos/id/1029/536/354.jpg" />
            </li>
            <li>
              <img src="https://i.picsum.photos/id/1029/536/354.jpg" />
            </li>
          </ul>
          <p className={styles.desc}>
            Dolore tempor reprehenderit dolor deserunt et. Consequat occaecat
            sit est ipsum eu nisi nostrud consectetur est magna enim sit. Aute
            velit et cupidatat quis labore in labore aute excepteur proident
            aliqua id.
          </p>
          <TagGroup additionalStyles={styles.userTags}>
            {/* @todo remove mock data */}
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
        <div className={styles.visibleForOwner}>
          <span className={styles.visibilityLabel}>
            this part is visible ONLY FOR YOU
          </span>
          <UserName />
          <UserEmail />
          <UserPassword />
          <PushNotifications />
          <DeleteAccount />
        </div>
      </div>
    </div>
  )
}

AccountPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['account'] })
}

export default AccountPage
