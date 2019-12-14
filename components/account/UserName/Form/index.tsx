import React from 'react'
import styles from './styles.scss'
import useForm from 'react-hook-form'
import { NFC } from 'types/nfc.d'
import { useTranslation } from 'i18n'
import { Input } from 'components/common/Forms/Input'
import { Error } from 'components/common/Forms/Error'
import { Button } from 'components/common/Button'

export const UserNameChangeForm: NFC<{}> = () => {
  const { t } = useTranslation('registration')
  const { register, errors } = useForm()

  return (
    <form>
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

      <Button
        type="submit"
        disabled={false}
        additionalStyles={styles.btnSubmit}
      >
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
