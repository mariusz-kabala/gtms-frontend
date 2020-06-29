import React, { useState, useCallback, useEffect } from 'react'
import styles from './styles.scss'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import { FileStatus } from '@gtms/commons/enums'
import { ChangePassword } from 'components/account/ChangePassword'
import { DeleteAccount } from 'components/account/DeleteAccount'
import { UserEmail } from 'components/account/UserEmail'
import { UserName } from 'components/account/UserName'
import { UserDescription } from 'components/account/UserDescription'
import { ImageEditor } from '@gtms/ui/ImageEditor'
import { NotificationsSettings } from 'components/account/NotificationsSettings'
import { Spinner } from '@gtms/ui/Spinner'
import { Picture } from '@gtms/ui/Picture'
import { TagsBar } from '@gtms/ui/TagsBar'
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
import { UserAvatarNoImage } from 'enums'
import { accountPageState, accountPageState$, IAccountPageState } from 'queries'

type AccountPageProps = {
  namespacesRequired: readonly string[]
}

export const AccountPage: NextPage<AccountPageProps> = () => {
  useInitState(markAsLoading)
  const { t } = useTranslation('account')
  const [isAvatarEditorVisible, setIsAvatarEditorVisible] = useState<boolean>(
    false
  )
  const [tags, setTags] = useState<string[]>([])
  const [state, setState] = useState<IAccountPageState>(accountPageState())
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
    })
    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="account-page">
      {state.isLoading && <Spinner additionalStyles={styles.spinner} />}
      {!state.isLoading && state.errorOccured && (
        <p>{t('Can not fetch account details right now, try later')}</p>
      )}
      {!state.isLoading && !state.errorOccured && (
        <div className={styles.content}>
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
          <UserName
            additionalStyles={styles.userName}
            name={state.name}
            surname={state.surname}
          />
          <br />
          <UserDescription description={state.description} />
          <br />
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
          <br />
          <ChangePassword />
          <br />
          <UserEmail email={state.email} additionalStyles={styles.userName} />
          <br />
          <DeleteAccount
            additionalStyles={styles.deleteAccount}
            onConfirm={() => null}
          />
          <br />
          <NotificationsSettings />
        </div>
      )}
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
