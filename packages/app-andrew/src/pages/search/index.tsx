import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import { useTranslation } from '@gtms/commons/i18n'
import { SearchBar } from '@gtms/ui/SearchBar'

export const SearchPage: NextPage<{}> = () => {
  const { t } = useTranslation('searchPage')

  return (
    <div className={styles.wrapper} data-testid="search-page">
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
    </div>
  )
}

SearchPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
