import React, { useState } from 'react'
import { NextPage } from 'next'
import { useTranslation } from 'i18n'
import styles from './styles.scss'
import { Button } from 'components/common/Button'
import { EmailForm } from 'components/account/EmailForm'
import { NameSurnameForm } from 'components/account/NameSurnameForm'
import { Modal } from 'components/common/Modal'
import { NavigationDot } from 'components/common/NavigationDot'
import { PasswordChangeForm } from 'components/account/PasswordChangeForm'
import { Tag } from 'components/common/Tag'
import { TagGroup } from 'components/common/TagGroup'
import { ToggleCheckbox } from 'components/common/Forms/ToggleCheckbox'
import { UserAvatar } from 'components/common/UserAvatar'
import mockData from './mockData.json'

export const AccountPage: NextPage<{}> = () => {
  const { t } = useTranslation('account')
  const [modalState, setModalState] = useState<boolean>(false)

  return (
    <div className={styles.wrapper}>
      <p>{t('title')}</p>
      <UserAvatar
        image="https://www.bootdey.com/img/Content/avatar/avatar6.png"
        additionalStyles={styles.userAvatar}
        userName="Marty McFly"
      />
      <div>user images</div>
      <ul className={styles.userImages}>
        {mockData.data.map((value, index) => (
          <li key={index}>
            <img src={value.img} />
          </li>
        ))}
      </ul>
      <PasswordChangeForm />
      <NameSurnameForm />
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
      <div>gender born</div>
      <div>
        <span>Your current address email: marty.mcfly@gmail.com</span>
        <EmailForm />
      </div>
      <div>rodo privacy settings</div>
      <ToggleCheckbox
        lockerIcon
        labelChecked="checked"
        labelUnchecked="unchecked"
      />
      <br />
      <div>push notifications email notifications</div>
      <ToggleCheckbox labelChecked="checked" labelUnchecked="unchecked" />
      <Button
        onClick={() => {
          setModalState(true)
        }}
      >
        Delete Account
      </Button>
      {modalState && (
        <Modal onClick={() => setModalState(false)}>
          <h2>Are you sure youd like to delete your account?</h2>

          <Button onClick={() => null}>
            Nah, not, not really, just kiddin
          </Button>

          <Button onClick={() => null}>
            Yes, really. Its time to say good bye...
          </Button>
        </Modal>
      )}
      <NavigationDot />
    </div>
  )
}

AccountPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['account'] })
}

export default AccountPage
