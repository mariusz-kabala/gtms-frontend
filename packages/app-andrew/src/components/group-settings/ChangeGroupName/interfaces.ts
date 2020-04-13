export interface ChangeGroupNameProps {
  formData: Partial<ChangeGroupNameFormData>
  additionalStyles?: string
}

export interface ChangeGroupNameData {
  name: string
}

export type ChangeGroupNameFormData = Partial<ChangeGroupNameData>

export interface ChangeGroupNameFormProps {
  formData: Partial<ChangeGroupNameFormData>
  onSubmit: (formData: ChangeGroupNameData) => void
}
