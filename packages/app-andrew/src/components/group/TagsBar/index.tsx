import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
// commons
import { IImage } from '@gtms/commons/types/image'
import { getImage } from '@gtms/commons'
import { loadRecentlyViewedTags } from '@gtms/state-tag'
// state
import { ITagsBarState, tagsBarState, tagsBarState$ } from './state.query'
// ui
import { IoMdGrid } from 'react-icons/io'
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
      !state.recentlyViewed.isLoaded &&
      state.groupId
    ) {
      loadRecentlyViewedTags(state.groupId)
    }
  }, [currentTab, state.recentlyViewed, state.groupId])

  return (
    <>
      <div className={styles.nav}>
        <ul>
          <li
            className={cx({
              [styles.active]: currentTab === Tabs.promoted,
            })}
            onClick={() => setCurrentTab(Tabs.promoted)}
          >
            {/* h2 was here */}
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
                {/* <img src={`/images/avatars/${value.image}`} /> */}
                <div className={styles.desc}>
                  <h4>{tag.tag}</h4>
                  <span>{tag.description}</span>
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
          state.recentlyViewed.isLoading)) && <div>Loader here</div>}

      {((currentTab === Tabs.promoted && state.promoted.errorOccured) ||
        (currentTab === Tabs.recentlyViewed &&
          state.recentlyViewed.errorOccured)) && (
        <p>error occured, try later</p>
      )}
    </>
  )
}
