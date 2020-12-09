import React, { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { PromotedTagNoImage } from 'enums'
import { truncateString } from '@gtms/commons/helpers'
import { generateSearchURL } from 'helpers'
// state
import { ITagsBarState, tagsBarState, tagsBarState$ } from './state.query'
import {
  loadGroupPromotedTags,
  loadRecentlyViewedTags,
  saveRecentlyViewedTag,
} from '@gtms/state-tag'
import { getGroupPosts } from '@gtms/state-post'
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
  const { i18n } = useTranslation('groupPage')

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
            {state.promoted.tags.map((tag) => {
              const url = generateSearchURL(`/group/${state.groupSlug}`, {
                tag: [tag.tag],
              })
              return (
                <li className={styles.item} key={`promotedTag-${tag.id}`}>
                  <Link href={url}>
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()

                        if (!state.groupId) {
                          return
                        }

                        window.history.pushState(
                          null,
                          '',
                          `/${i18n.language}${url}`
                        )

                        getGroupPosts({
                          group: state.groupId,
                          tags: [tag.tag],
                        })
                        saveRecentlyViewedTag(state.groupId, tag.tag)
                      }}
                    >
                      <Image
                        size={'35x35'}
                        {...(tag.logo as any)}
                        noImage={PromotedTagNoImage}
                      />
                      <p className={styles.desc}>
                        <h4>#{tag.tag}</h4>
                        <span>{truncateString(tag.description, 28)}</span>
                      </p>
                    </a>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

      {currentTab === Tabs.recentlyViewed &&
        !state.recentlyViewed.isLoading &&
        !state.recentlyViewed.errorOccured &&
        state.recentlyViewed.tags.length > 0 && (
          <ul className={styles.items}>
            {state.recentlyViewed.tags.map((tag) => (
              <li className={styles.item} key={`recently-viewed-${tag}`}>
                <a>
                  <p className={styles.desc}>
                    <h4>#{tag}</h4>
                  </p>
                </a>
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
