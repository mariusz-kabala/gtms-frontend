import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { GroupType, GroupVisibility } from '@gtms/commons/enums'
import { IGroup } from '@gtms/commons/models'
import { updateGroup } from '@gtms/state-group'
import { BasicInfoSetup } from '../BasicInfoSetup'
// ui
import { IoIosHelpCircle } from 'react-icons/io'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { SwitchWrapper } from '@gtms/ui/SwitchWrapper'
import { Button } from '@gtms/ui/Button'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

interface IFormData {
  name?: string
  description?: string
}

export const BasicSettings: FC<{
  group: IGroup
}> = ({ group }) => {
  const { t } = useTranslation('groupSettings')
  const { register, handleSubmit, errors, setError } = useForm<IFormData>()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [settings, setSettings] = useState<{
    type: GroupType
    visibility: GroupVisibility
  }>({
    type: group.type,
    visibility: group.visibility,
  })
  const validate = (data: IFormData) => {
    let hasErrors = false

    if (!data.name) {
      setError('name', 'required')
      hasErrors = true
    }

    return !hasErrors
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = async (data: IFormData) => {
    if (!validate(data)) {
      return
    }

    setIsSaving(true)

    try {
      await updateGroup(
        {
          ...data,
          ...settings,
        },
        group.slug
      )
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div data-testid="group-settings-basic">
      <BasicInfoSetup group={group} />
      <form onSubmit={handleSubmit(onSubmit)} method="post">
        <div className={styles.toremove}>
          <Input
            type="text"
            name="name"
            defaultValue={name}
            placeholder={t('form.labels.name')}
            reference={register}
          />
          {errors.name && <Error text={t('form.validation.name.isRequired')} />}
          <ExpandingTextarea
            placeholder={t('form.labels.description')}
            name="description"
            defaultValue={group.description}
            reference={register({ required: true })}
          />
        </div>
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
        <Button type="submit" disabled={isSaving} additionalStyles={styles.btn}>
          Save
        </Button>
      </form>
    </div>
  )
}
