import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import Switch from 'react-switch'
import styles from './styles.scss'
import { IoIosHelpCircle } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { GroupType, GroupVisibility } from '@gtms/commons/enums'

export const BasicSettings: FC<{
  name: string
  description?: string
  type: GroupType
  visibility: GroupVisibility
}> = ({ name, description, type, visibility }) => {
  const { t } = useTranslation('groupSettings')
  const { register, handleSubmit, errors } = useForm<{
    email: string
  }>()

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onSubmit = async () => {}

  return (
    <div data-testid="group-settings-basic">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="text"
          defaultValue={name}
          placeholder={t('form.labels.name')}
          reference={register}
        />
        {errors.email && <Error text={t('form.validation.email.isRequired')} />}
        <ExpandingTextarea
          placeholder={t('form.labels.description')}
          name="description"
          defaultValue={description}
          reference={register({ required: true })}
        />
        <div className={styles.bools}>
          <div className={styles.element}>
            <div className={styles.help}>
              <i
                data-tip={
                  "Any user can join the group. Joining does not require group's admin acceptation"
                }
                data-place="right"
                data-background-color="black"
                data-text-color="white"
              >
                <IoIosHelpCircle />
              </i>
            </div>
            <div className={styles.label}>
              <label>Anyone can join</label>
            </div>
            <div className={styles.formEl}>
              <Switch
                onChange={() => null}
                checked={type === GroupType.public}
              />
            </div>
          </div>

          <div className={styles.element}>
            <div className={styles.help}>
              <i
                data-tip={
                  "If group is public, anyone can find it, and read it's content. If not - only members can do that"
                }
                data-place="right"
                data-background-color="black"
                data-text-color="white"
              >
                <IoIosHelpCircle />
              </i>
            </div>
            <div className={styles.label}>
              <label>Group is public</label>
            </div>
            <div className={styles.formEl}>
              <Switch
                onChange={() => null}
                checked={visibility === GroupVisibility.public}
              />
            </div>
          </div>
        </div>
        <Button additionalStyles={styles.btn}>Save</Button>
      </form>
    </div>
  )
}
