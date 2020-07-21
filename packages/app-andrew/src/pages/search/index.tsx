import React from 'react'
import { NextPage } from 'next'
import styles from './styles.scss'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Button } from '@gtms/ui/Button'
import { Picture } from '@gtms/ui/Picture'
import { SearchBar } from '@gtms/ui/SearchBar'
import { UserGroups } from '@gtms/ui/UserGroups'

export const SearchPage: NextPage<{}> = () => {
  const { t } = useTranslation('searchPage')

  return (
    <div className={styles.pageWrapper} data-testid="search-page">
      <div className={styles.wrapper}>
        {/* @todo add text header instead of text on the image below */}
        <h2>{t('searchTempHeader')}</h2>
        <Picture
          additionalStyles={styles.coverImage}
          jpg={'/images/white-theme/search-cover-image.png'}
        />
        <div className={styles.searchBarWrapper}>
          <Button
            additionalStyles={cx(styles.btnTags, {
              [styles.active]: true,
            })}
          >
            Tags
          </Button>
          <SearchBar
            onTagAdd={() => null}
            onTagRemove={() => null}
            onLoadSuggestion={() => null}
            onQueryChange={() => null}
            onLoadSuggestionCancel={() => null}
            tags={['lorem', 'ipsum', 'punkciki', 'hello']}
          />
        </div>
        <UserGroups />
      </div>
    </div>
  )
}

SearchPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
