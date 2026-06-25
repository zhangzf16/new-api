export type ApiResponse<T = unknown> = {
  success: boolean
  message?: string
  data?: T
}

export type PageResponse<T> = {
  items?: T[]
  total?: number
  page?: number
  page_size?: number
}

export type Merchant = {
  id: number
  user_id: number
  name: string
  description?: string
  status: number
  created_time?: number
  updated_time?: number
}

export type MerchantChannel = {
  id: number
  merchant_id: number
  type: number
  key?: string
  name: string
  base_url?: string
  models: string
  group?: string
  priority?: number
  weight?: number
  status: number
  model_mapping?: string
  setting?: string
  param_override?: string
  header_override?: string
  remark?: string
}

export type MerchantModelPrice = {
  id?: number
  merchant_id?: number
  model: string
  model_price: number
  model_ratio: number
  completion_ratio: number
  cache_ratio: number
  cache_creation_ratio: number
  image_ratio: number
  audio_ratio: number
  audio_completion_ratio: number
}

export type MerchantSettlement = {
  id?: number
  merchant_id: number
  amount: number
  currency: string
  status: string
  remark?: string
  created_time?: number
  updated_time?: number
}

export type MerchantTokenBinding = {
  id: number
  token_id: number
  merchant_id: number
  enabled: boolean
}
