export interface GroupNameFormProps {
  formData: Partial<GroupNameFormData>
  onSubmit: (formData: GroupNameData) => void
}

export interface GroupNameData {
  name: string
}

export type GroupNameFormData = Partial<GroupNameData>
