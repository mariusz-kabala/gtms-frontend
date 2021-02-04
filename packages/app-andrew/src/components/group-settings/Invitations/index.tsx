import React, { FC, useState, useEffect } from 'react'
import { IGroup } from '@gtms/commons/models'
import {
  groupInvitationsQuery,
  getGroupInvitations,
  IGroupInvitations,
  deleteGroupInvitation,
} from '@gtms/state-group'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { getImage, getDisplayName } from '@gtms/commons/helpers'
import { UserAvatarNoImage } from '@app/enums'
// ui
import { IoIosCloseCircle, IoIosCheckbox } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { Modal } from '@gtms/ui/Modal'
import { Spinner } from '@gtms/ui/Spinner'
import { UserAvatar } from '@gtms/ui/UserAvatar'
// styles
import styles from './styles.scss'

const RECORDS_PER_PAGE = 25

export const InvitationsSettings: FC<{ group: IGroup }> = ({ group }) => {
  const [state, setState] = useState<IGroupInvitations>(
    groupInvitationsQuery.getGroupInvitations()
  )
  const [isShowModal, setIsShowModal] = useState<boolean>(false)

  useEffect(() => {
    getGroupInvitations(group.slug, 0, RECORDS_PER_PAGE)
    const sub = groupInvitationsQuery.getGroupInvitations$.subscribe((values) =>
      setState(values)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  return (
    <div data-testid="group-invitation-settings">
      {state.isLoading && <Spinner additionalStyles={styles.spinner} />}
      {!state.isLoading && state.errorOccured && (
        <ErrorWrapper>
          <h2>Can not fetch invitations, try later</h2>
        </ErrorWrapper>
      )}
      {!state.isLoading && state.records.length === 0 && (
        <ErrorWrapper>
          <h2>No invitations, no one likes you, you stupid fuck</h2>
        </ErrorWrapper>
      )}
      {!state.isLoading && state.records.length > 0 && (
        <>
          <h2 className={styles.mainHeader}>Invitations</h2>
          <ul className={styles.list}>
            {state.records.map((invitation) => (
              <li
                className={styles.invitation}
                key={`invitation-${invitation.id}`}
              >
                <div className={styles.when}>
                  <h3>
                    Sent at:{' '}
                    {formatDistance(
                      new Date(invitation.createdAt),
                      new Date(),
                      {
                        locale: pl,
                      }
                    )}{' '}
                    to:
                  </h3>
                  <div className={styles.user}>
                    <UserAvatar
                      additionalStyles={styles.userAvatar}
                      image={getImage(
                        '50x50',
                        invitation.user.avatar,
                        UserAvatarNoImage
                      )}
                    />
                    <h4>{getDisplayName(invitation.user)}</h4>
                  </div>
                </div>
                <div>
                  {invitation.from && (
                    <div className={styles.user}>
                      <UserAvatar
                        additionalStyles={styles.userAvatar}
                        image={getImage(
                          '50x50',
                          invitation.from.avatar,
                          UserAvatarNoImage
                        )}
                      />
                      <div>
                        <h4>{getDisplayName(invitation.from)}</h4>
                        <p className={styles.msg}>
                          {invitation.description || 'No message'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  additionalStyles={styles.btn}
                  onClick={() => setIsShowModal(true)}
                >
                  remove invitation
                </Button>

                {isShowModal && (
                  <Modal
                    additionalStyles={styles.modalContent}
                    onClose={() => setIsShowModal(false)}
                  >
                    <h2 className={styles.header}>header</h2>
                    <p className={styles.desc}>
                      Eteu in occaecat occaecat consectetur et laboris aliquip.
                    </p>
                    <div className={styles.buttons}>
                      <Button
                        additionalStyles={styles.btn}
                        onClick={() => setIsShowModal(false)}
                        testid="post-single-delete-post-canel"
                      >
                        <i>
                          <IoIosCloseCircle />
                        </i>
                        noBtn
                      </Button>
                      <Button
                        additionalStyles={styles.btn}
                        onClick={() => deleteGroupInvitation(invitation.id)}
                        testid="delete-account-confirm"
                      >
                        <i>
                          <IoIosCheckbox />
                        </i>
                        yesBtn
                      </Button>
                    </div>
                  </Modal>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
