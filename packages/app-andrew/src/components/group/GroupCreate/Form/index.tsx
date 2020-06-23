import React, { FC, useState, useCallback } from 'react'
import styles from './styles.scss'
import { useForm } from 'react-hook-form'
import { useTranslation } from '@gtms/commons/i18n'
import { Input } from '@gtms/ui/Forms/Input'
import { Error } from '@gtms/ui/Forms/Error'
import { Button } from '@gtms/ui/Button'
import { createNewGroup } from '@gtms/state-group'
import { IGroupCreateResponse } from '@gtms/api-group'
import { Spinner } from '@gtms/ui'
import { TagsBar } from '@gtms/ui/TagsBar'
import { findTagsAPI } from '@gtms/api-tags'

interface IFromData {
  name: string
}

export const GroupCreateForm: FC<{
  onError: () => unknown
  onSuccess: (group: IGroupCreateResponse) => unknown
}> = ({ onError, onSuccess }) => {
  const { t } = useTranslation('groupCreate')
  const { register, handleSubmit, errors, setError } = useForm<IFromData>()
  const [isMakingRequest, setIsMakingRequest] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>([])
  const [tagsHints, setTagsHints] = useState<{
    isLoading: boolean
    tags: string[]
  }>({
    isLoading: false,
    tags: [],
  })
  const onTagAdd = useCallback(
    (tag: string) => {
      if (tags.indexOf(tag) === -1) {
        setTags([...tags, tag])
      }
    },
    [tags]
  )
  const onTagRemove = useCallback(
    (tag: string) => {
      const index = tags.indexOf(tag)

      if (index > -1) {
        tags.splice(index, 1)
        setTags([...tags])
      }
    },
    [tags]
  )
  const onLoadTagsHints = useCallback((query: string) => {
    setTagsHints({
      isLoading: true,
      tags: [],
    })

    findTagsAPI(query)
      .then((tags: string[]) => {
        setTagsHints({
          isLoading: false,
          tags,
        })
      })
      .catch(() => {
        setTagsHints({
          isLoading: false,
          tags: [],
        })
      })
  }, [])
  const validate = (data: IFromData) => {
    let hasErrors = false

    if (!data.name) {
      setError('name', 'required')
      hasErrors = true
    }

    return !hasErrors
  }
  const onSubmit = async (data: IFromData) => {
    if (!validate(data)) {
      return
    }

    try {
      const response: IGroupCreateResponse = await createNewGroup({
        ...data,
        tags,
      })

      onSuccess(response)
    } catch (err) {
      if (err.status === 400) {
        const errors = await err.json()
        Object.keys(errors).forEach((field) => {
          setError(field as 'name', 'backend', errors[field].message)
        })
      } else {
        onError()
      }
    } finally {
      setIsMakingRequest(false)
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
        additionalStyles={styles.input}
        type="text"
        placeholder={t('label')}
        name="name"
        reference={register({ required: true })}
      />
      {errors.name && errors.name.type === 'required' && (
        <Error text={t('form.validation.name.isRequired')} />
      )}
      {errors.name && errors.name.type === 'backend' && (
        <Error text={errors.name.message as string} />
      )}
      {/* <TagsBar
        tags={tags}
        isSaving={false}
        isLoading={tagsHints.isLoading}
        suggestions={tagsHints.tags}
        onLoadSuggestion={onLoadTagsHints}
        onLoadSuggestionCancel={() => null}
        onTagAdd={onTagAdd}
        onTagRemove={onTagRemove}
        onSave={() => Promise.resolve()}
      /> */}
      <Button
        type="submit"
        disabled={isMakingRequest}
        additionalStyles={styles.btn}
      >
        {t('submitButton')}
      </Button>
      {isMakingRequest && <Spinner />}
    </form>
  )
}
