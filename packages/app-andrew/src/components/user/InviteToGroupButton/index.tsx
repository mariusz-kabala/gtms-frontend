import React, { FC, useState, useEffect } from 'react'
import { IGroup } from '@gtms/commons/models'
import { getImage } from '@gtms/commons/helpers'
import { useForm } from 'react-hook-form'
import { openLoginModal } from 'state'
import { userQuery, loadMyGroups } from '@gtms/state-user'
import { inviteToGroup } from '@gtms/state-group'
import {
  IInviteToGroupButtonState,
  inviteToGroupButtonState,
  inviteToGroupButtonState$,
} from './state.query'
import { GroupAvatarNoImage } from 'enums'
// ui
import { Button } from '@gtms/ui/Button'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Modal } from '@gtms/ui/Modal'
import { Picture } from '@gtms/ui/Picture'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

const GroupsList: FC<{
  groups: IGroup[]
  onClick: (group: IGroup) => unknown
}> = ({ groups, onClick }) => {
  return (
    <ul className={styles.groupList}>
      {groups.map((group) => (
        <li onClick={() => onClick(group)} key={`group-${group.id}`}>
          <Picture {...getImage('200x200', group.avatar, GroupAvatarNoImage)} />
          <h3>{group.name}</h3>
        </li>
      ))}
    </ul>
  )
}

const NoGroupsMatchingCritera: FC = () => <p>No groups machting criteria</p>

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
        <Modal onClose={() => setInternalState(getInitialInternalState())}>
          {externalState.isLoading && <Spinner />}
          {externalState.errorOccured && (
            <p>Can not fetch list of groups now, try later please</p>
          )}
          {externalState.isLoaded && internalState.step === Steps.start && (
            <div>
              <nav>
                <ul>
                  <li>
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
                  <li>
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
                  <li>
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
              </nav>
              <div className={styles.content}>
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
              </div>
            </div>
          )}

          {externalState.isLoaded === true &&
            internalState.step === Steps.invitation && (
              <section>
                <header>
                  <Picture
                    {...getImage(
                      '200x200',
                      internalState.selectedGroup?.avatar,
                      GroupAvatarNoImage
                    )}
                  />
                  <h3>{internalState.selectedGroup?.name}</h3>
                </header>
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
                    type="submit"
                    disabled={false}
                    additionalStyles={styles.btn}
                  >
                    Send invitation
                  </Button>
                </form>
              </section>
            )}
        </Modal>
      )}
      <button
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
        className={additionalStyles}
      >
        invite to a group
      </button>
    </>
  )
}
