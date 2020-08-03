import React from 'react'
import { NextPage } from 'next'
import cx from 'classnames'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Button } from '@gtms/ui/Button'
import { MockData } from '@gtms/ui/MockData'
import { Picture } from '@gtms/ui/Picture'
import { SearchBar } from '@gtms/ui/SearchBar'
import { IoMdGrid } from 'react-icons/io'
import styles from './styles.scss'

export const SearchPage: NextPage<{}> = () => {
  const { t } = useTranslation('searchPage')

  return (
    <div className={styles.pageWrapper} data-testid="search-page">
      <div className={styles.wrapper}>
        {/* @todo add text header instead of text on the image below */}
        <div className={styles.coverImage}>
          <Picture
            additionalStyles={styles.coverImage}
            jpg={'/images/white-theme/search-cover-image.png'}
          />
          <h2 className={styles.header}>
            {t('searchHeader1')}
            <span>{t('searchHeader2')}</span>
          </h2>
        </div>
        <div className={styles.searchBarWrapper}>
          <Button
            additionalStyles={cx(styles.btnTags, {
              [styles.active]: true,
            })}
          >
            <i>
              <IoMdGrid />
            </i>
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
        <div className={styles.noRecords}>
          <MockData theme="dark" />
          <MockData
            theme="dark"
            onClick={() => null}
            text="Couldn't find any post, maybe try..."
          />
          <MockData theme="dark" numberOfElements={4} />
        </div>
      </div>
    </div>
  )
}

SearchPage.getInitialProps = () => {
  return Promise.resolve({ namespacesRequired: ['searchPage'] })
}

export default SearchPage
