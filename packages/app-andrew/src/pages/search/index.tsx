import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
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

SearchPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
