import React, { FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
// ui
import { Textarea } from '../Forms/Textarea'
import { Spinner } from '../Spinner'
import { Button } from '../Button'
// styles
import styles from './styles.scss'

export interface IAbuseReportData {
  reason: string
  substantiation?: string
}

export enum VIEW {
  form,
  confirmation,
}

export const AbuseReportForm: FC<{
  isMakingRequest: boolean
  view?: VIEW
  onSubmit: (data: IAbuseReportData) => unknown
}> = ({ onSubmit, view = VIEW.form, isMakingRequest = false }) => {
  const { register, handleSubmit } = useForm<IAbuseReportData>()

  const { t } = useTranslation('abuseReportForm')
  const onSubmitCallback = useCallback(
    async (data: IAbuseReportData) => {
      onSubmit(data)
    },
    [onSubmit]
  )

  return (
    <>
      {view === VIEW.form && (
        <div data-testid="abuse-report-form" className={styles.wrapper}>
          <h2 className={styles.header}>Report abuse</h2>
          <form method="post" onSubmit={handleSubmit(onSubmitCallback)}>
            <div className={styles.item}>
              <label>Reason:</label>
              <select name="reason" ref={register({ required: true })}>
                <option>Abuse reason 1</option>
                <option>Abuse reason 2</option>
                <option>Abuse reason 3</option>
                <option>Abuse reason 4</option>
              </select>
            </div>
            <div className={styles.item}>
              <label>Substantiation:</label>
              <Textarea
                name="substantiation"
                reference={register({ required: false })}
              />
            </div>
            <Button
              type="submit"
              additionalStyles={styles.btnSubmit}
              disabled={isMakingRequest}
            >
              {isMakingRequest && <Spinner size="sm" type="authentication" />}
              {t('form.submitButton')}
            </Button>
          </form>
        </div>
      )}

      {view === VIEW.confirmation && (
        <div data-testid="abuse-report-confirmation" className={styles.wrapper}>
          <p>
            Thank you for submiting the report. We will look into it as soon as
            possible
          </p>
        </div>
      )}
    </>
  )
}
