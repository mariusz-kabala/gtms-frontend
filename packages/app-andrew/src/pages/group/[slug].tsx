import React, { useState, useEffect } from 'react'
import styles from './styles.scss'
import { NextPage, NextPageContext } from 'next'
import { groupQuery, IGroupStore, getGroup, initGroup } from '@gtms/state-group'
import { useTranslation } from '@gtms/commons/i18n'
import { IPromotedTag } from '@gtms/commons/models'
import { ErrorInfo } from '@gtms/ui/ErrorInfo'
import { RecentlyAddedPosts } from '@gtms/ui/RecentlyAddedPosts'
import { Spinner } from '@gtms/ui/Spinner'
import { GroupDescription } from '../../components/groups/GroupDescription'
import { GroupNoAccess } from '../../components/groups/GroupNoAccess'
import { GroupNotFound } from '../../components/groups/GroupNotFound'
import { GroupAvatar } from '../../components/groups/GroupAvatar'
import { FavsButton } from '../../components/groups/FavsButton'
import { SettingsButton } from '../../components/groups/SettingsButton'
import { JoinLeaveButton } from '../../components/groups/JoinLeaveButton'
import { PromotedTags } from '@gtms/ui/PromotedTags'
import { promotedTagsQuery, loadGroupPromotedTags } from '@gtms/state-tag'
import { PromotedTagNoImage } from '../../enums'
import { useRouter } from 'next/router'

type GroupPageProps = {
  namespacesRequired: readonly string[]
  group: IGroupStore
}

const GroupPage: NextPage<GroupPageProps> = (props) => {
  const { t } = useTranslation('groupPage')
  const router = useRouter()
  const [group, setGroup] = useState<IGroupStore>(props.group)
  const [promoted, setPromoted] = useState<IPromotedTag[]>(
    promotedTagsQuery.getAll()
  )
  const [isLoadingPromotedTags, setIsLoadingPromotedTags] = useState<boolean>(
    false
  )

  useEffect(() => {
    initGroup(props.group)

    if (props.group.group?.id) {
      loadGroupPromotedTags(props.group.group.id)
    }

    const groupSub = groupQuery.allState$.subscribe((value) => setGroup(value))
    const promotedSub = promotedTagsQuery
      .selectAll()
      .subscribe((value) => setPromoted(value))

    const promotedLoadingSub = promotedTagsQuery
      .selectLoading()
      .subscribe((value) => {
        setIsLoadingPromotedTags(value)
      })

    return () => {
      groupSub.unsubscribe()
      promotedSub.unsubscribe()
      promotedLoadingSub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.groupHeader}>
          <GroupAvatar
            additionalStyles={styles.groupAvatar}
            isEditAllowed={groupQuery.hasAdminRights()}
            files={groupQuery.getAvatar('200x200', group)}
            filesStatus={groupQuery.getAvatarFileStatus()}
          />
          <div>
            <h2 data-tip={t('click-here-to-edit')} data-type="dark">
              {group.group?.name}
            </h2>
            <GroupDescription
              isEditAllowed={groupQuery.hasAdminRights()}
              slug={group.group?.slug || ''}
              text={
                !group.group?.description
                  ? groupQuery.hasAdminRights()
                    ? 'you did not add group description yet, click here to change it'
                    : ''
                  : group.group?.description || ''
              }
            />
          </div>
        </div>

        {group.isLoading && <Spinner />}

        {group.errorOccured && (
          <ErrorInfo>
            <h1>ERROR OCCURED</h1>
            <p>
              Create a proper component that can be used here when 500 from BE
            </p>
          </ErrorInfo>
        )}
        {group.notFound && <GroupNotFound />}
        {group.hasNoAccess && <GroupNoAccess />}

        {group.group && (
          <div className={styles.columns}>
            <div className={styles.column}>
              <div className={styles.actionButtons}>
                <FavsButton group={group.group} />
                <JoinLeaveButton group={group.group} />
                <SettingsButton group={group.group} />
              </div>
              <section>
                <h2 className={styles.header}>{t('promotedTags')}</h2>
                <PromotedTags
                  tags={promoted}
                  isLoading={isLoadingPromotedTags}
                  noImage={PromotedTagNoImage}
                  isAdmin={groupQuery.hasAdminRights()}
                  onNoRecordsClick={() =>
                    router.push(`/group/${group.group?.slug}/settings#tags`)
                  }
                />
              </section>
            </div>
            <div className={styles.column}>
              <section>
                <h2 className={styles.header}>{t('recentlyAddedPosts')}</h2>
                <RecentlyAddedPosts />
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
): Promise<{
  namespacesRequired: string[]
  group: IGroupStore
}> => {
  const { slug } = ctx?.query

  await getGroup(slug as string)

  return {
    namespacesRequired: ['groupPage', 'postCreate'],
    group: groupQuery.getValue(),
  }
}

export default GroupPage
