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
// components
import { GroupDescription } from 'components/groups/GroupDescription'
import { GroupNoAccess } from 'components/groups/GroupNoAccess'
import { GroupNotFound } from 'components/groups/GroupNotFound'
import { GroupAvatar } from 'components/groups/GroupAvatar'
import { FavsButton } from 'components/groups/FavsButton'
import { SettingsButton } from 'components/groups/SettingsButton'
import { JoinLeaveButton } from 'components/groups/JoinLeaveButton'
// ui
import { PromotedTags } from '@gtms/ui/PromotedTags'
import { ErrorInfo } from '@gtms/ui/ErrorInfo'
import { RecentlyAddedPosts } from '@gtms/ui/RecentlyAddedPosts'
import { Spinner } from '@gtms/ui/Spinner'
import { PostCreate } from '@gtms/ui/PostCreate'
// state
import { groupQuery, IGroupState, getGroup, initGroup } from '@gtms/state-group'
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
    const sub = groupPageState$.subscribe((value) => setState(value))

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.groupHeader}>
          <GroupAvatar
            additionalStyles={styles.groupAvatar}
            isEditAllowed={groupQuery.hasAdminRights()}
            files={groupQuery.getAvatar('200x200', state)}
            filesStatus={groupQuery.getAvatarFileStatus()}
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
          </div>
        </div>

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
          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.actionButtons}>
                <FavsButton group={state.group} />
                <JoinLeaveButton group={state.group} />
                <SettingsButton group={state.group} />
              </div>
              <section>
                <h2 className={styles.header}>{t('promotedTags')}</h2>
                <PromotedTags
                  tags={state.promotedTags.tags}
                  isLoading={state.promotedTags.isLoading}
                  noImage={PromotedTagNoImage}
                  isAdmin={groupQuery.hasAdminRights()}
                  onNoRecordsClick={() =>
                    router.push(`/group/${state.group?.slug}/settings#tags`)
                  }
                />
              </section>
            </div>
            <div className={styles.column}>
              <section>
                <h2 className={styles.header}>{t('recentlyAddedPosts')}</h2>
                {state.user && (
                  <PostCreate
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
              </section>
            </div>
          </div>
        )}
      </div>
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
