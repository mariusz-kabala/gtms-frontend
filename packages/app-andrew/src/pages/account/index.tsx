import React, { useState, useCallback, useEffect } from 'react'
import { NextPage, NextPageContext } from 'next'
import { useTranslation } from '@gtms/commons/i18n'
import styles from './styles.scss'
import { ChangePassword } from '../../components/account/ChangePassword'
import { DeleteAccount } from '../../components/account/DeleteAccount'
import { UserEmail } from '../../components/account/UserEmail'
import { UserName } from '../../components/account/UserName'
import { ImageWithLightbox } from '@gtms/ui/ImageWithLightbox'
import { TagsBar } from '@gtms/ui/TagsBar'
import {
  userQuery,
  getAccountDetails,
  IAccountDetails,
  updateAccountDetails,
  initAccountDetails,
} from '@gtms/state-user'
import { redirect } from '@gtms/commons/helpers/redirect'
import { findTagsAPI } from '@gtms/api-tags'

type AccountPageProps = {
  namespacesRequired: readonly string[]
  accountDetails: IAccountDetails
}

export const AccountPage: NextPage<AccountPageProps> = ({ accountDetails }) => {
  const { t } = useTranslation('account')
  const [tags, setTags] = useState<string[]>(accountDetails.tags)
  const [details, setDetails] = useState<IAccountDetails>(accountDetails)
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
    initAccountDetails(accountDetails)
  }, [accountDetails])

  useEffect(() => {
    const sub = userQuery.accountDetails$.subscribe((value) => {
      setDetails(value)
    })
    return () => {
      sub.unsubscribe()
    }
  }, [])

  return (
    <div className={styles.wrapper} data-testid="account-page">
      <div className={styles.content}>
        <div
          data-testid="account-page-public"
          className={styles.visibleForEveryone}
        >
          <span className={styles.visibilityLabel}>
            This part is visible for EVERYONE
          </span>
          <ImageWithLightbox
            additionalStyles={styles.userImage}
            src="/images/temp_images/avatar-1.png"
          />
          <p className={styles.desc}>
            {t('title')}
            Dolore tempor reprehenderit dolor deserunt et. Consequat occaecat
            sit est ipsum eu nisi nostrud consectetur est magna enim sit. Aute
            velit et cupidatat quis labore in labore aute excepteur proident
            aliqua id.
          </p>
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
        <div className={styles.divider} />
        <div
          data-testid="account-page-private"
          className={styles.visibleForOwner}
        >
          <span className={styles.visibilityLabel}>
            This part is visible ONLY FOR YOU
          </span>
          <ChangePassword />
          <UserName
            additionalStyles={styles.userName}
            name={details.name}
            surname={details.surname}
          />
          <UserEmail email={details.email} additionalStyles={styles.userName} />
          <DeleteAccount
            additionalStyles={styles.deleteAccount}
            onConfirm={() => null}
          />
        </div>
      </div>
    </div>
  )
}

AccountPage.getInitialProps = async (ctx: NextPageContext) => {
  if (!userQuery.isLogged()) {
    redirect('/login', ctx)
  }

  await getAccountDetails()

  return {
    namespacesRequired: ['account'],
    accountDetails: userQuery.accountDetails(),
  }
}

export default AccountPage
