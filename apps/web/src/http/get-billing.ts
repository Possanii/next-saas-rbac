import { api } from './api-client'

interface IGetBillingResponse {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBilling(org: string): Promise<IGetBillingResponse> {
  const result = await api
    .get(`organizations/${org}/billing`)
    .json<IGetBillingResponse>()

  return result
}
