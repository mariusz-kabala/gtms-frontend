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
      <section
        style={{
          // @todo remove it soon
          position: 'relative',
          background: 'black',
          padding: '20px',
          zIndex: 1,
        }}
      >
        <div className={commonCss.header}>
          <p>{t('subtitle')}</p>
          <h1>{t('title')}</h1>
        </div>
        <Logo />
        <RemindPasswordForm />
        <Link href={`login`}>
          <a>{t('goToLoginPage')}</a>
        </Link>
      </section>
      <ImageCover />
    </div>
  )
}

RemindPasswordPage.getInitialProps = async () => {
  return Promise.resolve({ namespacesRequired: ['remindPassword'] })
}

export default RemindPasswordPage
