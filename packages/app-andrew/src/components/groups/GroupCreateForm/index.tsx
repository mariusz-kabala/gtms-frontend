import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { IGroupCreateData } from '@gtms/api-group'
import { NFC } from '@gtms/commons/types/nfc.d'
import { Input } from '@gtms/ui/Forms/Input'
import { Textarea } from '@gtms/ui/Forms/Textarea'
import { Button } from '@gtms/ui/Button'

export const GroupCreateForm: NFC<{}> = () => {
  const { t } = useTranslation('groupCreate')
  const { register } = useForm<IGroupCreateData>()

  return (
    <form>
      {/* @todo remove temporary <br /> elements everywhere in this file */}

      <div
        style={{
          // @todo remove temporary
          color: '#fff',
        }}
      >
        <label htmlFor="name">{t('form.labels.name')}</label>
        <Input
          type="text"
          name="name"
          placeholder={t('form.labels.name')}
          reference={register({ required: true })}
        />
      </div>

      <br />
      <br />

      <div
        style={{
          // @todo remove temporary
          color: '#fff',
        }}
      >
        group description
        <br />
        <Textarea name="description" reference={register({ required: true })} />
      </div>
      <br />
      <br />

      <div
        style={{
          // @todo remove temporary
          color: '#fff',
        }}
      >
        <label>Group public or not</label> <br />
        <br />
        <input
          type="radio"
          name="groupPublicity"
          ref={register}
          value="public"
        />{' '}
        Public
        <br />
        <input
          type="radio"
          name="groupPublicity"
          ref={register}
          value="onlyWithLink"
        />{' '}
        Only With link
        <br />
      </div>
      <br />
      <br />
      <div
        style={{
          // @todo remove temporary
          color: '#fff',
        }}
      >
        <label>Who can join</label>
        <br />
        <br />
        <input
          type="radio"
          name="groupWhoCanJoin"
          ref={register}
          value="everyone"
        />{' '}
        Everyone <br />
        <input
          type="radio"
          name="groupWhoCanJoin"
          ref={register}
          value="acceptedByAdmin"
        />{' '}
        Accepted by Admin <br />{' '}
        {/* @todo there will be option accepted by other users, byModerator etc. */}
      </div>

      <Button type="submit" disabled={false}>
        {t('form.submitButton')}
      </Button>
    </form>
  )
}
