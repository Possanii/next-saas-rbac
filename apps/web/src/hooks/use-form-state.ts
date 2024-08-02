import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

interface UseFormStateProps {
  action: (date: FormData) => Promise<FormState>
  onSuccess: () => Promise<void> | void
  initialState?: FormState
  shouldFormReset?: boolean
}

export function useFormState({
  action,
  onSuccess,
  initialState,
  shouldFormReset = false,
}: UseFormStateProps) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const result = await action(data)

      setFormState(result)

      if (result.success === true && onSuccess) {
        await onSuccess()
      }
    })

    if (shouldFormReset) {
      requestFormReset(form)
    }
  }

  return [formState, handleSubmit, isPending] as const
}
