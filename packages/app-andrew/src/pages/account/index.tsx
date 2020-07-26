import React, { useState, useCallback, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation, Link } from '@gtms/commons/i18n'
import { FileStatus } from '@gtms/commons/enums'
import { UserEmail } from 'components/account/UserEmail'
import { UserName } from 'components/account/UserName'
import { UserDescription } from 'components/account/UserDescription'
import { ImageEditor } from '@gtms/ui/ImageEditor'
import {
  userQuery,
  markAsLoading,
  hasAuthSessionCookies,
  getAccountDetails,
  updateAccountDetails,
  updateAccountAvatar,
} from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { useInitState } from '@gtms/commons/hooks'
import { findTagsAPI } from '@gtms/api-tags'
import { UserAvatarNoImage, GroupAvatarNoImage } from 'enums'
import { accountPageState, accountPageState$, IAccountPageState } from 'queries'
// ui
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
import { TagsBar } from '@gtms/ui/TagsBar'
import { UserGroups } from '@gtms/ui/UserGroups'
import { IoIosAddCircle, IoMdTrash, IoIosSettings } from 'react-icons/io'
import styles from './styles.scss'

type AccountPageProps = {
  namespacesRequired: readonly string[]
}

export const AccountPage: NextPage<AccountPageProps> = () => {
  useInitState(markAsLoading)
  const { t } = useTranslation('account')
  const [isAvatarEditorVisible, setIsAvatarEditorVisible] = useState<boolean>(
    false
  )
  const [state, setState] = useState<IAccountPageState>(accountPageState())
  const [tags, setTags] = useState<string[]>(state.tags || [])
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [tagsHints, setTagsHints] = useState<{
    isLoading: boolean
    tags: string[]
  }>({
    isLoading: false,
    tags: [],
  })
  const onTagAdd = useCallback(
    (tag: string) => {
      if (tags.indexOf(tag) === -1) {
        setTags([...tags, tag])
      }
    },
    [tags]
  )
  const onTagRemove = useCallback(
    (tag: string) => {
      const index = tags.indexOf(tag)

      if (index > -1) {
        tags.splice(index, 1)
        setTags([...tags])
      }
    },
    [tags]
  )
  const onLoadTagsHints = useCallback((query: string) => {
    setTagsHints({
      isLoading: true,
      tags: [],
    })

    findTagsAPI(query)
      .then((tags: string[]) => {
        setTagsHints({
          isLoading: false,
          tags,
        })
      })
      .catch(() => {
        setTagsHints({
          isLoading: false,
          tags: [],
        })
      })
  }, [])

  const onTagsSave = useCallback(() => {
    setIsSaving(true)
    return updateAccountDetails({ tags }).then(() => {
      setIsSaving(false)
    })
  }, [tags])

  useEffect(() => {
    getAccountDetails()
    const sub = accountPageState$.subscribe((value) => {
      setState(value)

      if (value.tags && value.tags.length > 0) {
        setTags(value.tags)
      }
    })
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.pageWrapper} data-testid="account-page">
      <div className={styles.wrapper}>
        {state.isLoading && <Spinner additionalStyles={styles.spinner} />}
        {!state.isLoading && state.errorOccured && (
          <ErrorWrapper>
            <h2>{t('Can not fetch account details right now, try later')}</h2>
          </ErrorWrapper>
        )}
        {!state.isLoading && !state.errorOccured && (
          <>
            <div className={styles.navigation}>
              <h2>My profile</h2>
              <ul>
                <li>
                  <Link href="/account">
                    <a>My profile card</a>
                  </Link>
                </li>
                <li>
                  <Link href="/account/security">
                    <a>Security</a>
                  </Link>
                </li>
                <li>
                  <Link href="/account/notifications">
                    <a>Notifications</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.hint}>
              That is how other people can see your profile
              <span>You can edit your profile here, show and hide things</span>
            </div>
            <div className={styles.userHeader}>
              <ImageEditor
                isVisible={isAvatarEditorVisible}
                onSave={(file: File) => {
                  updateAccountAvatar(file)
                  setIsAvatarEditorVisible(false)
                }}
                onClose={() => setIsAvatarEditorVisible(false)}
              />
              <div className={styles.avatarWrapper}>
                <a onClick={() => setIsAvatarEditorVisible(true)}>
                  {[FileStatus.uploaded, FileStatus.processing].includes(
                    state.avatar.status
                  ) && <Spinner />}
                  <Picture
                    additionalStyles={styles.avatar}
                    {...(userQuery.hasAvatar('200x200')
                      ? userQuery.getAvatar('200x200')
                      : UserAvatarNoImage['200x200'])}
                  />
                </a>
              </div>
              <div className={styles.userNameSurnameLogin}>
                <UserName name={state.name} surname={state.surname} />
                <UserEmail
                  email={state.email}
                  additionalStyles={styles.userName}
                />
                <span className={styles.login}>@{state.username}</span>
              </div>
              <div className={styles.desc}>
                <span className={styles.aboutMeLabel}>About me:</span>
                <UserDescription description={state.description} />
              </div>
            </div>
            <ul className={styles.links}>
              <li className={styles.item}>
                <Button additionalStyles={styles.btn}>
                  <i>
                    <IoIosAddCircle />
                  </i>
                  Like
                </Button>
              </li>
              <li className={styles.item}>
                <Button additionalStyles={styles.btn}>
                  <i>
                    <IoMdTrash />
                  </i>
                  Fav
                </Button>
              </li>
              <li className={styles.item}>
                <Button additionalStyles={styles.btn}>
                  <i>
                    <IoIosSettings />
                  </i>
                  Send msg
                </Button>
              </li>
            </ul>
            <div className={styles.userTags}>
              <span>My TAGS:</span>
              <TagsBar
                tags={tags}
                isSaving={isSaving}
                isLoading={tagsHints.isLoading}
                suggestions={tagsHints.tags}
                onLoadSuggestion={onLoadTagsHints}
                onLoadSuggestionCancel={() => null}
                onTagAdd={onTagAdd}
                onTagRemove={onTagRemove}
                onSave={onTagsSave}
              />
            </div>
            <ul className={styles.userStats}>
              <li className={styles.item}>
                <span>{state.postsCounter}</span>
                Posts
              </li>
              <li className={styles.item}>
                <span>{state.memberedGroupsCounter}</span>
                Group(s) member
              </li>
              <li className={styles.item}>
                <span>{state.ownedGroupsCounter}</span>
                Group(s) owner
              </li>
              <li className={styles.item}>
                <span>{state.favsGroupsCounter}</span>
                Fav group(s)
              </li>
            </ul>
            <div className={styles.userGroups}>
              <span>I am member of groups:</span>
              <UserGroups groups={state.groups} noImage={GroupAvatarNoImage} />
            </div>
            <div className={styles.userLastPosts}>
              <span>My last posts:</span>
              <ul>
                <li />
                <li />
                <li />
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

AccountPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!hasAuthSessionCookies(ctx)) {
    redirect('/login', ctx)
  }

  return Promise.resolve({
    namespacesRequired: ['account'],
  })
}

export default AccountPage
