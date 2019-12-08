import React from 'react'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
// @todo create method like that
// import { nameSurnameChange } from 'state/user'
import { IAccountNameSurnameData } from 'api/auth'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const NameSurnameForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  const { register, handleSubmit, errors } = useForm<
    // const { register, handleSubmit, errors, setError } = useForm<
    IAccountNameSurnameData
  >()
  const onSubmit = async (data: IAccountNameSurnameData) => {
    // const { password, passwordConfirmation } = data
    // if (password !== passwordConfirmation) {
    //   setError(
    //     'passwordConfirmation',
    //     'notMatch',
    //     t('form.validation.passwordConfirmation.notMatch')
    //   )
    //   return
    // }
    // try {
    //  @todo put here sth like
    // await changePasswordUserAccount(data)
    // } catch (err) {}
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        name="name"
        placeholder={t('form.labels.name')}
        reference={register}
      />
      {errors.name && <Error text={t('form.validation.name.isRequired')} />}

      <Input
        type="text"
        name="surname"
        placeholder={t('form.labels.surname')}
        reference={register}
      />
      {errors.surname && <Error text={t('form.validation.name.isRequired')} />}

      <Button type="submit" disabled={false}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
