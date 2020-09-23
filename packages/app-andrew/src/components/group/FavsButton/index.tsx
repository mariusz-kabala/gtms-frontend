import React, { FC, useState, useEffect } from 'react'
import {
  favGroupsQuery,
  IFavRecordStatus,
  addToFavs,
  removeFromFavs,
  userQuery,
} from '@gtms/state-user'
import cx from 'classnames'
import { openLoginModal } from 'state'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroup } from '@gtms/commons/models'
//ui
import { Button } from '@gtms/ui/Button'
import { Spinner } from '@gtms/ui/Spinner'
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'
import styles from './styles.scss'

export const FavsButton: FC<{ group: IGroup }> = ({ group }) => {
  const { t } = useTranslation('groupPage')
  const [status, setStatus] = useState<IFavRecordStatus>(
    favGroupsQuery.getRecordStatus(group.id)
  )

  useEffect(() => {
    const statusSub = favGroupsQuery
      .getRecordStatus$(group.id)
      .subscribe((value) => {
        setStatus(value)
      })

    return () => {
      statusSub && !statusSub.closed && statusSub.unsubscribe()
    }
  }, [group])

  if (status.errorOccurred) {
    return (
      <button disabled={true} className={styles.btn}>
        {t('error')}
      </button>
    )
  }

  return (
    <Button
      additionalStyles={cx(styles.btn, {
        [styles.isLoading]: status.isLoading && userQuery.isLogged(),
      })}
      onClick={() => {
        if (!userQuery.isLogged()) {
          return openLoginModal()
        }

        if (status.isInFavs) {
          removeFromFavs(group)
        } else {
          addToFavs(group)
        }
      }}
    >
      {status.isLoading && userQuery.isLogged() && (
        <>
          <Spinner size="xsm" type="withoutIcon" />
          {t('favs')}
        </>
      )}
      {((!status.isLoading && !status.isInFavs) || !userQuery.isLogged()) && (
        <>
          <i>
            <IoIosHeartEmpty />
          </i>{' '}
          {t('add-to-favs')}
        </>
      )}
      {!status.isLoading && status.isInFavs && (
        <>
          <i>
            <IoIosHeart />
          </i>{' '}
          {t('remove-from-favs')}
        </>
      )}
    </Button>
  )
}
