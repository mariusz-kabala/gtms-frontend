import React from 'react'
import { NextPage } from 'next'
import { Logo } from 'components/common/Logo'
import commonCss from '../styles.scss'
import { ImageCover } from 'components/common/ImageCover'
import Link from 'next/link'
import { useTranslation } from 'i18n'
import { RemindPasswordForm } from 'components/remind-password/Form'

export const RemindPasswordPage: NextPage<{}> = () => {
  const { t } = useTranslation('remindPassword')

  return (
    <div className={commonCss.page}>
      <div className={commonCss.header}>
        <h1>{t('title')}</h1>
      </div>
      <Logo />
      <Link href={`login`}>
        <a>{t('goToLoginPage')}</a>
      </Link>
      <RemindPasswordForm />
      <ImageCover />
    </div>
  )
}

RemindPasswordPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['remindPassword'] })
}

export default RemindPasswordPage
