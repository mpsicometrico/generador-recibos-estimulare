export interface FormProps {
  action: (state: void | undefined, payload: FormData) => Promise<void>
  hasSubmit?: boolean
  children: React.ReactNode
}
