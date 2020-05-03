import React, { useState, useEffect } from 'react'
import styles from './styles.scss'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { PostCreate } from '@gtms/ui/PostCreate'
import { PostSingle } from '@gtms/ui/PostSingle'
import { UserCardMini } from '@gtms/ui/UserCardMini'
import { groupQuery, IGroupStore, getGroup, initGroup } from '@gtms/state-group'
import { Spinner } from '@gtms/ui'
import { GroupDescription } from '../../components/groups/GroupDescription'
import { useAuth } from '@gtms/commons/hooks/auth'
import { initAuthSession } from '@gtms/commons/helpers/auth'

type GroupPageProps = {
  namespacesRequired: readonly string[]
  group: IGroupStore
  auth?: {
    accessToken?: string
    refreshToken?: string
  }
}

const GroupPage: NextPage<GroupPageProps> = (props) => {
  const { t } = useTranslation('groupPage')
  const [group, setGroup] = useState<IGroupStore>(props.group)
  const { isLogged } = useAuth(props.auth)

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
          <h2>{group.group?.name}</h2>
          <GroupDescription
            isEditAllowed={isLogged && groupQuery.hasAdminRights()}
            slug={group.group?.slug || ''}
            text={group.group?.description || ''}
          />
        </div>
        {group.isLoading && <Spinner />}
        {group.errorOccured && (
          <div>
            <h1>ERROR OCCURED</h1>
            <p>
              Create a proper component that can be used here when 500 from BE
            </p>
          </div>
        )}

        {group.notFound && (
          <div>
            <h1>GROUP NOT FOUND!</h1>
            <p>
              Create a separate component for that - it should allow to search
              for groups, maybe show recommended, or something like that
            </p>
          </div>
        )}

        {group.hasNoAccess && (
          <div>
            <h1>ACCESS DENY</h1>
            <p>You have no access to see this group, fuck off</p>
          </div>
        )}

        {group.group && (
          <>
            <div className={styles.columns}>
              <div className={styles.column}>
                <section>
                  <h2 className={styles.header}>{t('recently-added-posts')}</h2>
                  <div className={styles.grid}>
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-patrol-1.png'}
                    />
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-patrol-2.png'}
                    />
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-sztab-1.png'}
                    />
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-sztab-2.png'}
                    />
                  </div>
                </section>
                <section>
                  <h2 className={styles.header}>Ostatnio dodane posty</h2>
                  <div className={styles.grid}>
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-sztab-3.png'}
                    />
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-uczymy-ratowac.png'}
                    />
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-wielki-mecz.png'}
                    />
                    <UserCardMini
                      name="Johnny Silverhand"
                      image={'/images/temp_images/logo-zbc.png'}
                    />
                  </div>
                </section>
              </div>
              <div className={styles.column}>
                <section>
                  <h2 className={styles.header}>Ostatnio dodane posty</h2>
                  <PostCreate additionalStyles={styles.postCreate} />
                  <PostSingle additionalStyles={styles.post} />
                  <PostSingle additionalStyles={styles.post} />
                  <PostSingle additionalStyles={styles.post} />
                  <PostSingle additionalStyles={styles.post} />
                  <PostSingle additionalStyles={styles.post} />
                  <PostSingle additionalStyles={styles.post} />
                </section>
              </div>
            </div>

            <div className={styles.column}>
              <h2 className={styles.header}>Ostatnio dodane posty</h2>
              <PostCreate additionalStyles={styles.postCreate} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
              <PostSingle additionalStyles={styles.post} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

GroupPage.getInitialProps = (
  ctx: NextPageContext
): Promise<{
  namespacesRequired: string[]
  auth: {
    accessToken?: string
    refreshToken?: string
  }
  group: IGroupStore
}> => {
  const { slug } = ctx?.query

  return Promise.all([initAuthSession(ctx), getGroup(slug as string)]).then(
    (results) => {
      const [auth] = results

      return {
        namespacesRequired: ['groupPage', 'postCreate'],
        auth,
        group: groupQuery.getValue(),
      }
    }
  )
}

export default GroupPage
