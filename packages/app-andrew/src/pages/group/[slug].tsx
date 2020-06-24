import React, { useState, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { PromotedTagNoImage, UserAvatarNoImage } from 'enums'
import {
  IGroupPageState,
  groupPageState,
  groupPageState$,
} from 'queries/groupPage.query'
import { useInitState } from '@gtms/commons/hooks'
import { useTranslation } from '@gtms/commons/i18n'
import { findTagsAPI } from '@gtms/api-tags'
// components
import { GroupDescription } from 'components/group/GroupDescription'
import { GroupNoAccess } from 'components/group/GroupNoAccess'
import { GroupNotFound } from 'components/group/GroupNotFound'
import { GroupAvatar } from 'components/group/GroupAvatar'
import { FavsButton } from 'components/group/FavsButton'
import { SettingsButton } from 'components/group/SettingsButton'
import { JoinLeaveButton } from 'components/group/JoinLeaveButton'
import { GroupMembers } from 'components/group/GroupMembers'
import { FollowButton } from 'components/group/FollowButton'
// ui
import { ErrorInfo } from '@gtms/ui/ErrorInfo'
import { NavigationTabs } from '@gtms/ui/NavigationTabs'
import { PostCreate } from '@gtms/ui/PostCreate'
import { PromotedGroups } from '@gtms/ui/PromotedGroups'
import { PromotedTags } from '@gtms/ui/PromotedTags'
import { RecentlyAddedPosts } from '@gtms/ui/RecentlyAddedPosts'
import { SearchBar } from '@gtms/ui/SearchBar'
import { Spinner } from '@gtms/ui/Spinner'
// state
import {
  groupQuery,
  IGroupState,
  getGroup,
  initGroup,
  getGroupMembers,
} from '@gtms/state-group'
import {
  promotedTagsQuery,
  loadGroupPromotedTags,
  IPromotedTagsState,
  initPromoted,
} from '@gtms/state-tag'
import {
  createNewPost,
  getGroupPosts,
  postsQuery,
  IPostsState,
  initPostsStore,
} from '@gtms/state-post'
//styles
import styles from './styles.scss'

type GroupPageProps = {
  namespacesRequired: readonly string[]
  group?: IGroupState
  posts?: IPostsState
  promoted?: IPromotedTagsState
}

const getInitData = ({ group, posts, promoted }: GroupPageProps) => () => {
  group && initGroup(group)
  posts && initPostsStore(posts)
  promoted && initPromoted(promoted)
}

const GroupPage: NextPage<GroupPageProps> = (props) => {
  useInitState(getInitData(props))

  const { t } = useTranslation('groupPage')
  const router = useRouter()
  const [state, setState] = useState<IGroupPageState>(groupPageState())

  useEffect(() => {
    if (state.group) {
      getGroupMembers(state.group.slug, 0, 8)
    }
    const sub = groupPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      {state.isLoading && <Spinner />}

      {state.errorOccured && (
        <ErrorInfo>
          <h1>ERROR OCCURED</h1>
          <p>
            Create a proper component that can be used here when 500 from BE
          </p>
        </ErrorInfo>
      )}

      {state.notFound && <GroupNotFound />}

      {state.hasNoAccess && <GroupNoAccess />}

      {state.group && (
        <>
          <div className={styles.searchWrapper}>
            <div className={styles.search}>
              <SearchBar
                onTagAdd={() => null}
                onTagRemove={() => null}
                onLoadSuggestion={() => null}
                onQueryChange={() => null}
                onLoadSuggestionCancel={() => null}
                tags={[]}
              />
            </div>
            <ul className={styles.watchedTags}>
              <li className={styles.item}>#dojazdy</li>
              <li className={styles.item}>#berlin</li>
              <li className={styles.item}>#polandRock</li>
              <li className={styles.item}>#sztaby</li>
            </ul>
          </div>
          <div className={styles.groupHeader}>
            <GroupAvatar
              additionalStyles={styles.groupAvatar}
              files={groupQuery.getAvatar('200x200', state)}
              filesStatus={groupQuery.getAvatarFileStatus()}
              isEditAllowed={groupQuery.hasAdminRights()}
            />
            <div>
              <h2 data-tip={t('click-here-to-edit')} data-type="dark">
                {state.group?.name}
              </h2>
              <GroupDescription
                isEditAllowed={groupQuery.hasAdminRights()}
                slug={state.group?.slug || ''}
                text={
                  !state.group?.description
                    ? groupQuery.hasAdminRights()
                      ? 'you did not add group description yet, click here to change it'
                      : ''
                    : state.group?.description || ''
                }
              />
              <div className={styles.actionButtons}>
                <FavsButton group={state.group} />
                <JoinLeaveButton group={state.group} />
                <SettingsButton group={state.group} />
                <FollowButton group={state.group} />
              </div>
            </div>
          </div>
          <div className={styles.columns}>
            <div>
              <NavigationTabs>
                <h2 className={styles.header}>Posts</h2>
                <ul className={styles.elements}>
                  <li className={styles.item}>popular posts</li>
                  <li className={styles.item}>latest posts</li>
                  <li className={styles.item}>favorites posts</li>
                  <li className={styles.item}>my posts</li>
                </ul>
              </NavigationTabs>
              {state.user && (
                <PostCreate
                  fetchTags={findTagsAPI}
                  user={state.user}
                  noImage={UserAvatarNoImage}
                  onSubmit={(text: string) => {
                    createNewPost({
                      group: state.group?.id || '',
                      text,
                    })
                  }}
                  additionalStyles={styles.postCreate}
                />
              )}
              <RecentlyAddedPosts
                noImage={UserAvatarNoImage}
                posts={state.posts}
              />
            </div>
            <div>
              <PromotedTags
                tags={state.promotedTags.tags}
                isLoading={state.promotedTags.isLoading}
                noImage={PromotedTagNoImage}
                isAdmin={groupQuery.hasAdminRights()}
                onNoRecordsClick={() =>
                  router.push(`/group/${state.group?.slug}/settings#tags`)
                }
              />
              <NavigationTabs>
                <h2 className={styles.header}>Recently registered</h2>
                <ul className={styles.elements}>
                  <li className={styles.item}>latest</li>
                  <li className={styles.item}>most popular</li>
                </ul>
              </NavigationTabs>
              <GroupMembers {...state.members} />
              <br /> {/* @todo remove it */}
              <PromotedGroups />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

GroupPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<GroupPageProps> => {
  const { slug } = ctx?.query

  await getGroup(slug as string)

  const id = groupQuery.getId() || ''

  return Promise.all([
    getGroupPosts(id).catch(() => null),
    loadGroupPromotedTags(id).catch(() => null),
  ]).then(() => {
    return {
      namespacesRequired: ['groupPage', 'postCreate'],
      group: groupQuery.getValue(),
      posts: postsQuery.getValue(),
      promoted: promotedTagsQuery.getValue(),
    }
  })
}

export default GroupPage
