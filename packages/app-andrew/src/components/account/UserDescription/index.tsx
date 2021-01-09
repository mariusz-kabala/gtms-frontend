import React, { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { updateAccountDetails } from '@gtms/state-user'
// ui
import { IoIosCheckbox } from 'react-icons/io'
import { Button } from '@gtms/ui/Button'
import { ExpandingTextarea } from '@gtms/ui/Forms/ExpandingTextarea'
import { Modal } from '@gtms/ui/Modal'
import { Spinner } from '@gtms/ui/Spinner'
import styles from './styles.scss'

export const UserDescription: FC<{
  description?: string
}> = ({ description }) => {
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { register, handleSubmit } = useForm<{ description?: string }>()
  const onSubmit = (data: { description?: string }) => {
    setIsSaving(true)
    updateAccountDetails(data).finally(() => {
      setIsSaving(false)
      setIsSuccess(true)
      setTimeout(() => {
        setIsInEditMode(false)
        setIsSuccess(false)
      }, 1000)
    })
  }

  return (
    <>
      {isInEditMode && (
        <Modal onClose={() => setIsInEditMode(false)}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ExpandingTextarea
              additionalStyles={styles.textarea}
              defaultValue={''}
              name="description"
              placeholder={'Describe yourself :)'}
              reference={register({ required: false })}
            />
            <Button
              additionalStyles={styles.btn}
              type="submit"
              disabled={false}
            >
              {isSuccess && (
                <i className={styles.check}>
                  <IoIosCheckbox />
                </i>
              )}
              {isSaving && <Spinner size="xsm" />}
              Save
            </Button>
          </form>
        </Modal>
      )}
      {!isInEditMode && (
        <p onClick={() => setIsInEditMode(true)}>
          {description ||
            'You dont have any description yet. Click here to add it'}
        </p>
      )}
    </>
  )
}
