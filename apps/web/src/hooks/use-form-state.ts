import { type FormEvent, useState, useTransition } from 'react'

interface FormState {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export function useFormState({
  action,
  onSuccess,
  initialState,
}: {
  action: (date: FormData) => Promise<FormState>
  onSuccess: () => Promise<void> | void
  initialState?: FormState
}) {
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
  }

  return [formState, handleSubmit, isPending] as const
}
