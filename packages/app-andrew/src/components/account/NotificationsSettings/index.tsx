import React, { FC, useState, useEffect } from 'react'
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
    <div data-testid="notifications-settings">
      <h1>Notifications settings</h1>
      <label>
        <h2>Enable</h2>
        <Switch
          onChange={(value) => {
            if (value) {
              return subscribe()
            }

            unsubscribe()
          }}
          checked={state.isEnabled}
        />
      </label>
      <div>
        {/* similar notifications group by <section></section> */}
        <section>
          <label>
            <h3>Notifiy when someone invites me to a group</h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  invitation: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.invitation}
            />
          </label>
        </section>

        <section>
          <label>
            <h3>Notifiy when new post appears in groups which I own</h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  newPostInOwnedGroup: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.newPostInOwnedGroup}
            />
          </label>
          <label>
            <h3>Notifiy when new post appears in groups which I admining</h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  newPostInAdminnedGroup: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.newPostInAdminnedGroup}
            />
          </label>
        </section>

        <section>
          <label>
            <h3>
              Notifiy when new membership request pops up in groups which I own
            </h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  newMembershipRequestInOwnedGroup: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.newMembershipRequestInOwnedGroup}
            />
          </label>
          <label>
            <h3>
              Notifiy when new membership request pops up in groups which I
              admining
            </h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  newMembershipRequestInAdminnedGroup: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.newMembershipRequestInAdminnedGroup}
            />
          </label>
        </section>

        <section>
          <label>
            <h3>
              Notifiy when a new member joins groups which
              <strong> I own</strong>
            </h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  newMemberInOwnedGroup: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.newMemberInOwnedGroup}
            />
          </label>
          <label>
            <h3>
              Notifiy when a new member joins groups which
              <strong> I admining</strong>
            </h3>
            <Switch
              onChange={(value) =>
                updateNotificationsSettings({
                  newMemberInAdminnedGroup: value,
                })
              }
              disabled={!state.isEnabled || state.isLoading}
              checked={state.newMemberInAdminnedGroup}
            />
          </label>
        </section>

        <Button disabled={state.isLoading} onClick={saveNotificationsSettings}>
          Save changes
        </Button>
      </div>
    </div>
  )
}
