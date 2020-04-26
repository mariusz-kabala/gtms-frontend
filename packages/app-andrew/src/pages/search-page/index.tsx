import React from 'react'
import { NextPage, NextPageContext } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { initAuthSession } from '@gtms/commons/helpers/auth'
import { userQuery } from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { Overlay } from '@gtms/ui/Overlay'

export const SearchPage: NextPage<{}> = () => {
  const { t } = useTranslation('searchPage')

  return (
    <div
      className={styles.wrapper}
      data-testid="search-page"
      style={{ backgroundImage: `url('/images/temp_images/image-4.jpg')` }}
    >
      <div className={styles.searchInputMock}>{t('searchTempHeader')}</div>
      <Overlay additionalStyles={styles.overlay} opacity={0.75} />
    </div>
  )
}

SearchPage.getInitialProps = async (ctx: NextPageContext) => {
  await initAuthSession(ctx)

  if (!userQuery.isLogged()) {
    redirect('/login', ctx)
  }

  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
