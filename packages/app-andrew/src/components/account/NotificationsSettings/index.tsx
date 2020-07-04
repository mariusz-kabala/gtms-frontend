import React, { FC, useState, useEffect } from 'react'
import styles from './styles.scss'
import {
  INotificationsSettingsState,
  notificationsSettingsState,
  notificationsSettingsState$,
} from './state.query'
import {
  subscribe,
  unsubscribe,
  saveNotificationsSettings,
  updateNotificationsSettings,
  loadNotificationsSettings,
} from '@gtms/state-notification'
import { Button } from '@gtms/ui/Button'
import Switch from 'react-switch'
import { SwitchWrapper } from '@gtms/ui/SwitchWrapper'

export const NotificationsSettings: FC<{
  additionalStyles?: string
}> = ({ additionalStyles }) => {
  const [state, setState] = useState<INotificationsSettingsState>(
    notificationsSettingsState()
  )

  useEffect(() => {
    loadNotificationsSettings()
    const sub = notificationsSettingsState$.subscribe((value) =>
      setState(value)
    )

    return () => {
      sub && !sub.closed && sub.unsubscribe()
    }
  }, [])

  if (!state.isSupported) {
    return (
      <div data-testid="notifications-settings">
        <p>
          Sorry, but your browser does not support push notification, we can not
          enable it for you. Try to update your browser
        </p>
      </div>
    )
  }

  if (state.errorOccured) {
    return (
      <p data-testid="notifications-settings">
        Sorry, but we can not fetch your settings right now, please - try later!
      </p>
    )
  }

  return (
    <div className={additionalStyles} data-testid="notifications-settings">
      <ul className={styles.items}>
        <li className={styles.item}>
          <SwitchWrapper
            onChange={(value) => {
              if (value) {
                return subscribe()
              }

              unsubscribe()
            }}
            checked={state.isEnabled}
          />
          <h2>Enable</h2>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                invitation: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.invitation}
          />
          <h3>Notifiy when someone invites me to a group</h3>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                newPostInOwnedGroup: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.newPostInOwnedGroup}
          />
          <h3>Notifiy when new post appears in groups which I own</h3>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                newPostInAdminnedGroup: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.newPostInAdminnedGroup}
          />
          <h3>Notifiy when new post appears in groups which I admining</h3>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                newMembershipRequestInOwnedGroup: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.newMembershipRequestInOwnedGroup}
          />
          <h3>
            Notifiy when new membership request pops up in groups which I own
          </h3>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                newMembershipRequestInAdminnedGroup: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.newMembershipRequestInAdminnedGroup}
          />
          <h3>
            Notifiy when new membership request pops up in groups which I
            admining
          </h3>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                newMemberInOwnedGroup: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.newMemberInOwnedGroup}
          />
          <h3>
            Notifiy when a new member joins groups which
            <strong> I own</strong>
          </h3>
        </li>
        <li className={styles.item}>
          <Switch
            onChange={(value) =>
              updateNotificationsSettings({
                newMemberInAdminnedGroup: value,
              })
            }
            disabled={!state.isEnabled || state.isLoading}
            checked={state.newMemberInAdminnedGroup}
          />
          <h3>
            Notifiy when a new member joins groups which
            <strong> I admining</strong>
          </h3>
        </li>
      </ul>
      <Button
        additionalStyles={styles.btnSubmit}
        disabled={state.isLoading}
        onClick={saveNotificationsSettings}
      >
        Save changes
      </Button>
    </div>
  )
}
