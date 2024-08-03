import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

interface FormState<K extends string, V> {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
  payload: Record<K, V> | null
}

interface UseFormStateProps<K extends string, V> {
  action: (date: FormData) => Promise<FormState<K, V>>
  onSuccess: (data?: Record<K, V> | null) => Promise<void> | void
  initialState?: FormState<K, V>
  shouldFormReset?: boolean
}

export function useFormState<K extends string, V>({
  action,
  onSuccess,
  initialState,
  shouldFormReset = false,
}: UseFormStateProps<K, V>) {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState<K, V>>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
      payload: null,
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
        await onSuccess(result.payload)
      }
    })

    if (shouldFormReset) {
      requestFormReset(form)
    }
  }

  return [formState, handleSubmit, isPending] as const
}
