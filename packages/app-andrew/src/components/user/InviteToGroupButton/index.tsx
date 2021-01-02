import React, { FC, useState, useEffect } from 'react'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { useForm } from 'react-hook-form'
import { openLoginModal } from '@app/state'
import { userQuery, loadMyGroups } from '@gtms/state-user'
import { inviteToGroup } from '@gtms/state-group'
import {
  IInviteToGroupButtonState,
  inviteToGroupButtonState,
  inviteToGroupButtonState$,
} from './state.query'
import { GroupAvatarNoImage } from '@app/enums'
// ui
import { AiOutlineUserAdd } from 'react-icons/ai'
import { Button } from '@gtms/ui/Button'
import { ErrorWrapper } from '@gtms/ui/ErrorWrapper'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

const GroupsList: FC<{
  groups: IGroup[]
  onClick: (group: IGroup) => unknown
}> = ({ groups, onClick }) => {
  return (
    <ul className={styles.groupList}>
      {groups.map((group) => (
        <li
          className={styles.item}
          onClick={() => onClick(group)}
          key={`group-${group.id}`}
        >
          <Picture {...getImage('200x200', group.avatar, GroupAvatarNoImage)} />
          <h2 className={styles.header}>{group.name}</h2>
        </li>
      ))}
    </ul>
  )
}

const NoGroupsMatchingCritera: FC = () => (
  <h3 className={styles.noGroupsFound}>No groups machting criteria</h3>
)

enum Tabs {
  groupsMember,
  groupsAdmin,
  groupsOwner,
}

enum Steps {
  start,
  invitation,
}

const getInitialInternalState = () => ({
  isModalOpen: false,
  isSending: false,
  currentTab: Tabs.groupsMember,
  selectedGroup: null,
  step: Steps.start,
})

export const InviteToGroupButton: FC<{
  additionalStyles?: string
  userId: string
}> = ({ additionalStyles, userId }) => {
  const [externalState, setExternalState] = useState<IInviteToGroupButtonState>(
    inviteToGroupButtonState()
  )
  const [internalState, setInternalState] = useState<{
    isModalOpen: boolean
    isSending: boolean
    step: Steps
    currentTab: Tabs
    selectedGroup: IGroup | null
  }>(getInitialInternalState())

  const selectGroup = (group: IGroup) => {
    setInternalState({
      isModalOpen: true,
      isSending: false,
      currentTab: internalState.currentTab,
      selectedGroup: group,
      step: Steps.invitation,
    })
  }

  useEffect(() => {
    const sub = inviteToGroupButtonState$.subscribe((value) =>
      setExternalState(value)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  const { register, handleSubmit } = useForm<{ description?: string }>()
  const onSubmit = (data: { description?: string }) => {
    setInternalState({
      ...internalState,
      isSending: true,
    })
    inviteToGroup(
      {
        ...data,
        user: userId,
      },
      internalState.selectedGroup?.slug || ''
    ).finally(() => setInternalState(getInitialInternalState()))
  }

  return (
    <>
      {internalState.isModalOpen && (
        <Modal
          additionalStyles={styles.wrapperModal}
          onClose={() => setInternalState(getInitialInternalState())}
        >
          {externalState.isLoading && <Spinner />}
          {externalState.errorOccured && (
            <ErrorWrapper>
              <h2>Can not fetch list of groups now, try later please</h2>
            </ErrorWrapper>
          )}
          {externalState.isLoaded && (
            <ul className={styles.navigation}>
              <li className={styles.item}>
                <a
                  onClick={() =>
                    setInternalState({
                      ...getInitialInternalState(),
                      isModalOpen: true,
                      currentTab: Tabs.groupsMember,
                    })
                  }
                >
                  my groups
                </a>
              </li>
              <li className={styles.item}>
                <a
                  onClick={() =>
                    setInternalState({
                      ...getInitialInternalState(),
                      isModalOpen: true,
                      currentTab: Tabs.groupsAdmin,
                    })
                  }
                >
                  as admin
                </a>
              </li>
              <li className={styles.item}>
                <a
                  onClick={() =>
                    setInternalState({
                      ...getInitialInternalState(),
                      isModalOpen: true,
                      currentTab: Tabs.groupsOwner,
                    })
                  }
                >
                  as owner
                </a>
              </li>
            </ul>
          )}
          <div className={styles.content}>
            {externalState.isLoaded && internalState.step === Steps.start && (
              <>
                {internalState.currentTab === Tabs.groupsMember &&
                  externalState.member.length > 0 && (
                    <GroupsList
                      groups={externalState.member}
                      onClick={selectGroup}
                    />
                  )}
                {internalState.currentTab === Tabs.groupsMember &&
                  externalState.member.length === 0 && (
                    <NoGroupsMatchingCritera />
                  )}

                {internalState.currentTab === Tabs.groupsAdmin &&
                  externalState.admin.length > 0 && (
                    <GroupsList
                      groups={externalState.admin}
                      onClick={selectGroup}
                    />
                  )}
                {internalState.currentTab === Tabs.groupsAdmin &&
                  externalState.admin.length === 0 && (
                    <NoGroupsMatchingCritera />
                  )}

                {internalState.currentTab === Tabs.groupsOwner &&
                  externalState.owner.length > 0 && (
                    <GroupsList
                      groups={externalState.owner}
                      onClick={selectGroup}
                    />
                  )}
                {internalState.currentTab === Tabs.groupsOwner &&
                  externalState.owner.length === 0 && (
                    <NoGroupsMatchingCritera />
                  )}
              </>
            )}

            {externalState.isLoaded === true &&
              internalState.step === Steps.invitation && (
                <>
                  <div className={styles.groupAvatar}>
                    <Picture
                      additionalStyles={styles.image}
                      {...getImage(
                        '200x200',
                        internalState.selectedGroup?.avatar,
                        GroupAvatarNoImage
                      )}
                    />
                    <h3 className={styles.header}>
                      {internalState.selectedGroup?.name}
                    </h3>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <ExpandingTextarea
                      placeholder={
                        'Optionally you can write a custom invitation here'
                      }
                      name="description"
                      defaultValue={''}
                      reference={register({ required: false })}
                    />
                    <Button
                      additionalStyles={styles.btn}
                      type="submit"
                      disabled={false}
                    >
                      Send invitation
                    </Button>
                  </form>
                </>
              )}
          </div>
        </Modal>
      )}
      <button
        className={additionalStyles}
        onClick={() => {
          if (!userQuery.isLogged()) {
            return openLoginModal()
          }
          !externalState.isLoaded && loadMyGroups()
          setInternalState({
            ...getInitialInternalState(),
            isModalOpen: true,
          })
        }}
      >
        <i>
          <AiOutlineUserAdd />
        </i>
        invite to a group
      </button>
    </>
  )
}
