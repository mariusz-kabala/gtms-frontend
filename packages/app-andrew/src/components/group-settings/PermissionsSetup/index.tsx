import React, { FC, useState } from 'react'
import { IGroup } from '@gtms/commons/models'
import { GroupType, GroupVisibility } from '@gtms/commons/enums'
import { updateGroup } from '@gtms/state-group'
// ui
import { SwitchWrapper } from '@gtms/ui/SwitchWrapper'
import { Button } from '@gtms/ui/Button'
import { Spinner } from '@gtms/ui/Spinner'
// styles
import styles from './styles.scss'

export const PermissionsSetup: FC<{ group: IGroup }> = ({ group }) => {
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [settings, setSettings] = useState<{
    type: GroupType
    visibility: GroupVisibility
  }>({
    type: group.type,
    visibility: group.visibility,
  })

  const onSubmit = async () => {
    setIsSaving(true)

    try {
      await updateGroup(settings, group.slug)
    } finally {
      setIsSaving(false)
    }
  }
  return (
    <div data-testid="permissions-setup">
      <form method="post">
        <div className={styles.checkboxes}>
          <div className={styles.item}>
            <div>
              <SwitchWrapper
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    type: value ? GroupType.public : GroupType.private,
                  })
                }
                checked={settings.type === GroupType.public}
              />
              <label>Anyone can join</label>
            </div>
            <span>
              Any user can join the group. Joining does not require groups admin
              acceptation
            </span>
          </div>
          <div className={styles.item}>
            <div>
              <SwitchWrapper
                onChange={(value) =>
                  setSettings({
                    ...settings,
                    visibility: value
                      ? GroupVisibility.public
                      : GroupVisibility.private,
                  })
                }
                checked={settings.visibility === GroupVisibility.public}
              />
              <label>Group is public</label>
            </div>
            <span>
              If group is public, anyone can find it, and read its content. If
              not - only members can do that
            </span>
          </div>
        </div>
        {isSaving && <Spinner />}
        <Button
          type="submit"
          disabled={isSaving}
          onClick={onSubmit}
          additionalStyles={styles.btn}
        >
          Save
        </Button>
      </form>
    </div>
  )
}
