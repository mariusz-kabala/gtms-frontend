export interface GroupNameFormProps {
  formData: Partial<GroupNameFormData>
  onSubmit: (formData: GroupNameData) => void
}

export interface ChangeGroupNameProps {
  formData: Partial<GroupNameFormData>
  additionalStyles?: string
}

export interface GroupNameData {
  name: string
}

export type GroupNameFormData = Partial<GroupNameData>
