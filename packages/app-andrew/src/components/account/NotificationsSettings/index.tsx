import React, { FC, useState, useEffect } from 'react'
import {
  INotificationsSettingsState,
  notificationsSettingsState,
  notificationsSettingsState$,
} from './state.query'
import { subscribe, unsubscribe } from '@gtms/state-notification'
import { Button } from '@gtms/ui/Button'
import Switch from 'react-switch'

export const NotificationsSettings: FC<{}> = () => {
  const [state, setState] = useState<INotificationsSettingsState>(
    notificationsSettingsState()
  )
  // this will be moved to API after BE is ready
  const [notificationTypes, setNotificationTypes] = useState<{
    invitation: boolean
    newPostInOwnedGroup: boolean
    newMembershipRequestInOwnedGroup: boolean
    newMemberInOwnedGroup: boolean
    newPostInAdminnedGroup: boolean
    newMembershipRequestInAdminnedGroup: boolean
    newMemberInAdminnedGroup: boolean
  }>({
    invitation: false,
    newPostInOwnedGroup: false,
    newMembershipRequestInOwnedGroup: false,
    newMemberInOwnedGroup: false,
    newPostInAdminnedGroup: false,
    newMembershipRequestInAdminnedGroup: false,
    newMemberInAdminnedGroup: false,
  })

  useEffect(() => {
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
                setNotificationTypes({
                  ...notificationTypes,
                  invitation: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.invitation}
            />
          </label>
        </section>

        <section>
          <label>
            <h3>Notifiy when new post appears in groups which I own</h3>
            <Switch
              onChange={(value) =>
                setNotificationTypes({
                  ...notificationTypes,
                  newPostInOwnedGroup: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.newPostInOwnedGroup}
            />
          </label>
          <label>
            <h3>Notifiy when new post appears in groups which I admining</h3>
            <Switch
              onChange={(value) =>
                setNotificationTypes({
                  ...notificationTypes,
                  newPostInAdminnedGroup: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.newPostInAdminnedGroup}
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
                setNotificationTypes({
                  ...notificationTypes,
                  newMembershipRequestInOwnedGroup: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.newMembershipRequestInOwnedGroup}
            />
          </label>
          <label>
            <h3>
              Notifiy when new membership request pops up in groups which I
              admining
            </h3>
            <Switch
              onChange={(value) =>
                setNotificationTypes({
                  ...notificationTypes,
                  newMembershipRequestInAdminnedGroup: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.newMembershipRequestInAdminnedGroup}
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
                setNotificationTypes({
                  ...notificationTypes,
                  newMemberInOwnedGroup: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.newMemberInOwnedGroup}
            />
          </label>
          <label>
            <h3>
              Notifiy when a new member joins groups which
              <strong> I admining</strong>
            </h3>
            <Switch
              onChange={(value) =>
                setNotificationTypes({
                  ...notificationTypes,
                  newMemberInAdminnedGroup: value,
                })
              }
              disabled={!state.isEnabled}
              checked={notificationTypes.newMemberInAdminnedGroup}
            />
          </label>
        </section>

        <Button>Save changes</Button>
      </div>
    </div>
  )
}
