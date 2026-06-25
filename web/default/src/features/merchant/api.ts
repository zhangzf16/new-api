import { api } from '@/lib/api'
import type {
  ApiResponse,
  Merchant,
  MerchantChannel,
  MerchantModelPrice,
  MerchantSettlement,
  MerchantTokenBinding,
  PageResponse,
} from './types'

export async function getMerchantSelf(): Promise<ApiResponse<Merchant | null>> {
  const res = await api.get('/api/merchant/self')
  return res.data
}

export async function getMerchantChannels(): Promise<
  ApiResponse<MerchantChannel[]>
> {
  const res = await api.get('/api/merchant/channels')
  return res.data
}

export async function saveMerchantChannel(
  data: Partial<MerchantChannel>
): Promise<ApiResponse<MerchantChannel>> {
  const res = await api.put('/api/merchant/channels', data)
  return res.data
}

export async function deleteMerchantChannel(
  id: number
): Promise<ApiResponse<null>> {
  const res = await api.delete(`/api/merchant/channels/${id}`)
  return res.data
}

export async function getMerchantPrices(): Promise<
  ApiResponse<MerchantModelPrice[]>
> {
  const res = await api.get('/api/merchant/prices')
  return res.data
}

export async function saveMerchantPrice(
  data: MerchantModelPrice
): Promise<ApiResponse<MerchantModelPrice>> {
  const res = await api.put('/api/merchant/prices', data)
  return res.data
}

export async function deleteMerchantPrice(
  model: string
): Promise<ApiResponse<null>> {
  const res = await api.delete('/api/merchant/prices', { params: { model } })
  return res.data
}

export async function getMerchantSettlements(): Promise<
  ApiResponse<PageResponse<MerchantSettlement>>
> {
  const res = await api.get('/api/merchant/settlements')
  return res.data
}

export async function adminListMerchants(): Promise<
  ApiResponse<PageResponse<Merchant>>
> {
  const res = await api.get('/api/merchant/admin/merchants')
  return res.data
}

export async function adminCreateMerchant(
  data: Pick<Merchant, 'user_id' | 'name'> & Partial<Merchant>
): Promise<ApiResponse<Merchant>> {
  const res = await api.post('/api/merchant/admin/merchants', data)
  return res.data
}

export async function adminUpdateMerchant(
  data: Pick<Merchant, 'id' | 'name'> & Partial<Merchant>
): Promise<ApiResponse<Merchant>> {
  const res = await api.put('/api/merchant/admin/merchants', data)
  return res.data
}

export async function adminDeleteMerchant(
  id: number
): Promise<ApiResponse<null>> {
  const res = await api.delete(`/api/merchant/admin/merchants/${id}`)
  return res.data
}

export async function adminListMerchantChannels(
  merchantId: number
): Promise<ApiResponse<MerchantChannel[]>> {
  const res = await api.get(
    `/api/merchant/admin/merchants/${merchantId}/channels`
  )
  return res.data
}

export async function adminSaveMerchantChannel(
  merchantId: number,
  data: Partial<MerchantChannel>
): Promise<ApiResponse<MerchantChannel>> {
  const res = await api.put(
    `/api/merchant/admin/merchants/${merchantId}/channels`,
    data
  )
  return res.data
}

export async function adminDeleteMerchantChannel(
  merchantId: number,
  channelId: number
): Promise<ApiResponse<null>> {
  const res = await api.delete(
    `/api/merchant/admin/merchants/${merchantId}/channels/${channelId}`
  )
  return res.data
}

export async function adminListSettlements(
  merchantId?: number
): Promise<ApiResponse<PageResponse<MerchantSettlement>>> {
  const res = await api.get('/api/merchant/admin/settlements', {
    params: merchantId ? { merchant_id: merchantId } : undefined,
  })
  return res.data
}

export async function adminSaveSettlement(
  data: MerchantSettlement
): Promise<ApiResponse<MerchantSettlement>> {
  const res = await api.put('/api/merchant/admin/settlements', data)
  return res.data
}

export async function adminGetTokenBinding(
  tokenId: number
): Promise<ApiResponse<MerchantTokenBinding | null>> {
  const res = await api.get(`/api/merchant/admin/tokens/${tokenId}/binding`)
  return res.data
}

export async function adminSetTokenBinding(
  tokenId: number,
  data: { merchant_id: number; enabled: boolean }
): Promise<ApiResponse<null>> {
  const res = await api.put(
    `/api/merchant/admin/tokens/${tokenId}/binding`,
    data
  )
  return res.data
}

export async function adminDeleteTokenBinding(
  tokenId: number
): Promise<ApiResponse<null>> {
  const res = await api.delete(`/api/merchant/admin/tokens/${tokenId}/binding`)
  return res.data
}
