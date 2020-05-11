import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { SearchBar } from '@gtms/ui/SearchBar'
import { Overlay } from '@gtms/ui/Overlay'

export const SearchPage: NextPage<{}> = () => {
  const { t } = useTranslation('searchPage')

  return (
    <div
      className={styles.wrapper}
      data-testid="search-page"
      style={{ backgroundImage: `url('/images/temp_images/image-4.jpg')` }}
    >
      {t('searchTempHeader')}
      <div className={styles.searchBarWrapper}>
        <SearchBar
          onTagAdd={() => null}
          onTagRemove={() => null}
          onLoadSuggestion={() => null}
          onQueryChange={() => null}
          onLoadSuggestionCancel={() => null}
          tags={['lorem', 'ipsum', 'punkciki', 'hello']}
        />
      </div>
      <Overlay additionalStyles={styles.overlay} opacity={0.75} />
    </div>
  )
}

SearchPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
