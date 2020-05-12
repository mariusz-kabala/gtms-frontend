import React, { useState, useEffect } from 'react'
import styles from './styles.scss'
import { NextPage, NextPageContext } from 'next'
import { groupQuery, IGroupStore, getGroup, initGroup } from '@gtms/state-group'
import { useTranslation } from '@gtms/commons/i18n'
import { ErrorInfo } from '@gtms/ui/ErrorInfo'
import { RecentlyAddedPosts } from '@gtms/ui/RecentlyAddedPosts'
import { RecentlyCreatedGroups } from '@gtms/ui/RecentlyCreatedGroups'
import { Spinner } from '@gtms/ui/Spinner'
import { GroupDescription } from '../../components/groups/GroupDescription'
import { GroupNoAccess } from '../../components/groups/GroupNoAccess'
import { GroupNotFound } from '../../components/groups/GroupNotFound'
import { GroupAvatar } from '../../components/groups/GroupAvatar'
import { FavsButton } from '../../components/groups/FavsButton'
import ReactTooltip from 'react-tooltip'

type GroupPageProps = {
  namespacesRequired: readonly string[]
  group: IGroupStore
}

const GroupPage: NextPage<GroupPageProps> = (props) => {
  const { t } = useTranslation('groupPage')
  const [group, setGroup] = useState<IGroupStore>(props.group)

  useEffect(() => {
    initGroup(props.group)
    const groupSub = groupQuery.allState$.subscribe((value) => setGroup(value))

    return () => {
      groupSub.unsubscribe()
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
                group.group?.description === ''
                  ? groupQuery.hasAdminRights()
                    ? 'you did not add group description yet, click here to change it'
                    : ''
                  : group.group?.description || ''
              }
            />
            {groupQuery.hasAdminRights() && <ReactTooltip />}
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
              </div>
              <section>
                <h2 className={styles.header}>{t('recentlyCreatedGroups')}</h2>
                <RecentlyCreatedGroups />
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
