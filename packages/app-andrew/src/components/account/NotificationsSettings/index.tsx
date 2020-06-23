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
import { ToggleCheckbox } from '@gtms/ui/Forms/ToggleCheckbox'

export const NotificationsSettings: FC<{}> = () => {
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
      <div data-testid="notifications-settings">
        <p>
          Sorry, but we can not fetch your settings right now, please - try
          later!
        </p>
      </div>
    )
  }

  return (
    <div className={styles.wrapper} data-testid="notifications-settings">
      <h2>Enable</h2>
      <ToggleCheckbox
        onChange={(value) => {
          if (value) {
            return subscribe()
          }

          unsubscribe()
        }}
        checked={state.isEnabled}
      />

      <h3>Notifiy when someone invites me to a group</h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            invitation: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.invitation}
      />

      <h3>Notifiy when new post appears in groups which I own</h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            newPostInOwnedGroup: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.newPostInOwnedGroup}
      />

      <h3>Notifiy when new post appears in groups which I admining</h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            newPostInAdminnedGroup: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.newPostInAdminnedGroup}
      />

      <h3>Notifiy when new membership request pops up in groups which I own</h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            newMembershipRequestInOwnedGroup: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.newMembershipRequestInOwnedGroup}
      />

      <h3>
        Notifiy when new membership request pops up in groups which I admining
      </h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            newMembershipRequestInAdminnedGroup: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.newMembershipRequestInAdminnedGroup}
      />

      <h3>
        Notifiy when a new member joins groups which <strong> I own</strong>
      </h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            newMemberInOwnedGroup: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.newMemberInOwnedGroup}
      />

      <h3>
        Notifiy when a new member joins groups which<strong> I admining</strong>
      </h3>
      <ToggleCheckbox
        onChange={(value) =>
          updateNotificationsSettings({
            newMemberInAdminnedGroup: value,
          })
        }
        disabled={!state.isEnabled || state.isLoading}
        checked={state.newMemberInAdminnedGroup}
      />

      <Button disabled={state.isLoading} onClick={saveNotificationsSettings}>
        Save changes
      </Button>
    </div>
  )
}
