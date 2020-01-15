import React, { FC } from 'react'
import styles from './styles.scss'
import useForm from 'react-hook-form'
import { useTranslation } from 'i18n'
import { IGroupCreateData } from 'api/group'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const GroupCreateForm: FC<{}> = () => {
  const { t } = useTranslation('groupCreate')
  // @todo add interface below for ex.  useForm<ILoginData>()
  const { register, handleSubmit, errors, setError } = useForm<
    IGroupCreateData
  >()
  const validate = (data: IGroupCreateData) => {
    let hasErrors = false
    if (!data.name) {
      setError('name', 'required')
      hasErrors = true
    }

    return !hasErrors
  }
  const onSubmit = async (data: IGroupCreateData) => {
    if (!validate(data)) {
      return
    }
  }

  return (
    <form
      className={styles.form}
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="group-create-form"
    >
      <Input
        type="text"
        placeholder={t('form.labels.name')}
        name="name"
        reference={register({ required: true })}
      />
      {errors.name && errors.name.type === 'required' && (
        <Error text={t('form.validation.name.isRequired')} />
      )}
      <Button type="submit" additionalStyles={styles.btnSubmit}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
