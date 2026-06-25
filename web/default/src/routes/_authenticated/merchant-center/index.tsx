import { createFileRoute } from '@tanstack/react-router'
import { MerchantCenter } from '@/features/merchant'

export const Route = createFileRoute('/_authenticated/merchant-center/')({
  component: MerchantCenter,
})
