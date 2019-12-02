import React, { FC, ReactNode, useState } from 'react'
import styles from './styles.scss'
import cx from 'classnames'
import { SearchResults } from 'components/common/SearchResults'
import { Input } from 'components/common/Forms/Input'

export const SearchBar: FC<{
  children?: ReactNode
}> = ({ children }) => {
  const [tempState, setTempState] = useState<boolean>(false)

  return (
    <div data-testid="searchBar" className={cx(styles.searchBar)}>
      <Input onClick={() => setTempState(true)} />
      {/* remove tempState */}
      {tempState && (
        <SearchResults tempActive={tempState}>{children}</SearchResults>
      )}
    </div>
  )
}
