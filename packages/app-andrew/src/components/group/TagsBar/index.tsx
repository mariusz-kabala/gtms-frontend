import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import { PromotedTagNoImage } from 'enums'
import { truncateString } from '@gtms/commons/helpers'
// state
import { loadRecentlyViewedTags } from '@gtms/state-tag'
import { ITagsBarState, tagsBarState, tagsBarState$ } from './state.query'
import { loadGroupPromotedTags } from '@gtms/state-tag'
// ui
import { IoMdGrid } from 'react-icons/io'
import { Image } from '@gtms/ui/Image'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

enum Tabs {
  promoted,
  favorites,
  recentlyViewed,
}

export const TagsBar: FC<{}> = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.promoted)
  const [state, setState] = useState<ITagsBarState>(tagsBarState())

  useEffect(() => {
    const sub = tagsBarState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (
      currentTab === Tabs.recentlyViewed &&
      !state.recentlyViewed.isLoading &&
      !state.recentlyViewed.isLoaded &&
      state.groupId
    ) {
      loadRecentlyViewedTags(state.groupId)
    }

    if (
      currentTab === Tabs.promoted &&
      !state.promoted.isLoading &&
      !state.promoted.errorOccured &&
      !state.promoted.isLoaded &&
      state.groupId
    ) {
      loadGroupPromotedTags(state.groupId)
    }
  }, [currentTab, state.recentlyViewed, state.groupId])

  return (
    <div className={styles.wrapper}>
      <div className={styles.nav}>
        <ul>
          <li
            className={cx({
              [styles.active]: currentTab === Tabs.promoted,
            })}
            onClick={() => setCurrentTab(Tabs.promoted)}
          >
            <i>
              <IoMdGrid />
            </i>
            Tags
          </li>
          <li
            onClick={() => setCurrentTab(Tabs.favorites)}
            className={cx({
              [styles.active]: currentTab === Tabs.favorites,
            })}
          >
            <i>
              <IoMdGrid />
            </i>
            Favorites
          </li>
          <li
            className={cx({
              [styles.active]: currentTab === Tabs.recentlyViewed,
            })}
            onClick={() => setCurrentTab(Tabs.recentlyViewed)}
          >
            <i>
              <IoMdGrid />
            </i>
            last viewed
          </li>
        </ul>
      </div>

      {currentTab === Tabs.promoted &&
        !state.promoted.isLoading &&
        !state.promoted.errorOccured &&
        state.promoted.tags.length > 0 && (
          <ul className={styles.items}>
            {state.promoted.tags.map((tag) => (
              <li className={styles.item} key={`promotedTag-${tag.id}`}>
                <Image
                  size={'35x35'}
                  {...(tag.logo as any)}
                  noImage={PromotedTagNoImage}
                />
                <div className={styles.desc}>
                  <h4>#{tag.tag}</h4>
                  <span>{truncateString(tag.description, 28)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

      {currentTab === Tabs.recentlyViewed &&
        !state.recentlyViewed.isLoading &&
        !state.recentlyViewed.errorOccured &&
        state.recentlyViewed.tags.length > 0 && (
          <ul className={styles.items}>
            {state.recentlyViewed.tags.map((tag) => (
              <li className={styles.item} key={`recently-viewed-${tag}`}>
                <div className={styles.desc}>
                  <h4>{tag}</h4>
                </div>
              </li>
            ))}
          </ul>
        )}

      {((currentTab === Tabs.promoted && state.promoted.isLoading) ||
        (currentTab === Tabs.recentlyViewed &&
          state.recentlyViewed.isLoading)) && (
        <Spinner additionalStyles={styles.spinner} size="sm" />
      )}

      {((currentTab === Tabs.promoted && state.promoted.errorOccured) ||
        (currentTab === Tabs.recentlyViewed &&
          state.recentlyViewed.errorOccured)) && (
        <p>error occured, try later</p>
      )}

      {((currentTab === Tabs.promoted &&
        state.promoted.isLoading === false &&
        state.promoted.tags.length === 0) ||
        (currentTab === Tabs.recentlyViewed &&
          state.recentlyViewed.isLoaded === true &&
          state.recentlyViewed.tags.length === 0)) && (
        <p className={styles.noRecords}>No records</p>
      )}
    </div>
  )
}
