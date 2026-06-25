import { useEffect, useMemo, useState } from 'react'
import {
  Database,
  Link,
  Plus,
  RefreshCcw,
  Save,
  Store,
  Trash2,
  WalletCards,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { SectionPageLayout } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  adminCreateMerchant,
  adminDeleteMerchant,
  adminDeleteMerchantChannel,
  adminDeleteTokenBinding,
  adminGetTokenBinding,
  adminListMerchantChannels,
  adminListMerchants,
  adminListSettlements,
  adminSaveMerchantChannel,
  adminSaveSettlement,
  adminSetTokenBinding,
  deleteMerchantChannel,
  getMerchantChannels,
  getMerchantPrices,
  getMerchantSelf,
  getMerchantSettlements,
  saveMerchantChannel,
  saveMerchantPrice,
} from './api'
import type {
  Merchant,
  MerchantChannel,
  MerchantModelPrice,
  MerchantSettlement,
  MerchantTokenBinding,
} from './types'

const emptyPrice: MerchantModelPrice = {
  model: '',
  model_price: -1,
  model_ratio: -1,
  completion_ratio: -1,
  cache_ratio: -1,
  cache_creation_ratio: -1,
  image_ratio: -1,
  audio_ratio: -1,
  audio_completion_ratio: -1,
}

function StatusBadge({ status }: { status?: number | string }) {
  const { t } = useTranslation()
  const enabled = status === 1 || status === 'paid'
  return (
    <Badge variant={enabled ? 'secondary' : 'outline'}>
      {enabled ? t('Enabled') : t('Disabled')}
    </Badge>
  )
}

function useMerchantCenterData() {
  const [merchant, setMerchant] = useState<Merchant | null>(null)
  const [channels, setChannels] = useState<MerchantChannel[]>([])
  const [prices, setPrices] = useState<MerchantModelPrice[]>([])
  const [settlements, setSettlements] = useState<MerchantSettlement[]>([])
  const [loading, setLoading] = useState(false)

  const reload = async () => {
    setLoading(true)
    try {
      const [selfRes, channelRes, priceRes, settlementRes] = await Promise.all([
        getMerchantSelf(),
        getMerchantChannels().catch(() => ({ data: [] })),
        getMerchantPrices().catch(() => ({ data: [] })),
        getMerchantSettlements().catch(() => ({ data: { items: [] } })),
      ])
      setMerchant(selfRes.data ?? null)
      setChannels(channelRes.data ?? [])
      setPrices(priceRes.data ?? [])
      setSettlements(settlementRes.data?.items ?? [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
  }, [])

  return { merchant, channels, prices, settlements, loading, reload }
}

function PriceForm({ onSaved }: { onSaved: () => void }) {
  const { t } = useTranslation()
  const [price, setPrice] = useState<MerchantModelPrice>(emptyPrice)

  const setNumber = (key: keyof MerchantModelPrice, value: string) => {
    setPrice((current) => ({ ...current, [key]: Number(value) }))
  }

  const submit = async () => {
    const res = await saveMerchantPrice(price)
    if (res.success) {
      toast.success(t('Saved'))
      setPrice(emptyPrice)
      onSaved()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Merchant Model Price')}</CardTitle>
        <CardDescription>
          {t('Use -1 to fall back to the platform setting.')}
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-3 md:grid-cols-4'>
        <div className='flex flex-col gap-2 md:col-span-2'>
          <Label>{t('Model')}</Label>
          <Input
            value={price.model}
            onChange={(event) =>
              setPrice((current) => ({ ...current, model: event.target.value }))
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Model Price')}</Label>
          <Input
            type='number'
            step='0.000001'
            value={price.model_price}
            onChange={(event) => setNumber('model_price', event.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Model Ratio')}</Label>
          <Input
            type='number'
            step='0.000001'
            value={price.model_ratio}
            onChange={(event) => setNumber('model_ratio', event.target.value)}
          />
        </div>
        <Button className='md:col-span-4' onClick={submit}>
          <Save data-icon='inline-start' />
          {t('Save')}
        </Button>
      </CardContent>
    </Card>
  )
}

function MerchantChannelsTable({
  channels,
  onDelete,
}: {
  channels: MerchantChannel[]
  onDelete?: (channelId: number) => void
}) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Merchant Channels')}</CardTitle>
        <CardDescription>
          {t('Merchant mode uses default group channels only.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('ID')}</TableHead>
              <TableHead>{t('Channel')}</TableHead>
              <TableHead>{t('Type')}</TableHead>
              <TableHead>{t('Models')}</TableHead>
              <TableHead>{t('Priority')}</TableHead>
              <TableHead>{t('Weight')}</TableHead>
              <TableHead>{t('Status')}</TableHead>
              {onDelete && <TableHead>{t('Actions')}</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {channels.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell className='max-w-[420px] truncate'>
                  {item.models ?? '-'}
                </TableCell>
                <TableCell>{item.priority ?? 0}</TableCell>
                <TableCell>{item.weight ?? 0}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                {onDelete && (
                  <TableCell>
                    <Button
                      variant='destructive'
                      size='sm'
                      onClick={() => onDelete(item.id)}
                    >
                      <Trash2 data-icon='inline-start' />
                      {t('Delete')}
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
            {channels.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={onDelete ? 4 : 3}
                  className='text-muted-foreground'
                >
                  {t('No merchant channels yet.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function MerchantChannelForm({
  selectedMerchantId,
  onSaved,
}: {
  selectedMerchantId?: number | null
  onSaved: () => void
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    name: '',
    type: '1',
    key: '',
    base_url: '',
    models: '',
    status: '1',
    priority: '0',
    weight: '0',
  })

  const setValue = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }))
  }

  const payload = {
    name: form.name.trim(),
    type: Number(form.type),
    key: form.key,
    base_url: form.base_url.trim() || undefined,
    models: form.models.trim(),
    group: 'default',
    status: Number(form.status),
    priority: Number(form.priority),
    weight: Number(form.weight),
  }

  const reset = () => {
    setForm({
      name: '',
      type: '1',
      key: '',
      base_url: '',
      models: '',
      status: '1',
      priority: '0',
      weight: '0',
    })
  }

  const submit = async () => {
    const res = selectedMerchantId
      ? await adminSaveMerchantChannel(selectedMerchantId, payload)
      : await saveMerchantChannel(payload)
    if (res.success) {
      toast.success(t('Saved'))
      reset()
      onSaved()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Merchant Channel')}</CardTitle>
        <CardDescription>
          {t('Merchant channels are managed independently from platform channels.')}
        </CardDescription>
      </CardHeader>
      <CardContent className='grid gap-3 md:grid-cols-4'>
        <div className='flex flex-col gap-2'>
          <Label>{t('Channel Name')}</Label>
          <Input
            value={form.name}
            onChange={(event) => setValue('name', event.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Type')}</Label>
          <Input
            type='number'
            value={form.type}
            onChange={(event) => setValue('type', event.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2 md:col-span-2'>
          <Label>{t('Models')}</Label>
          <Input
            value={form.models}
            onChange={(event) => setValue('models', event.target.value)}
            placeholder='gpt-4o,gpt-4o-mini'
          />
        </div>
        <div className='flex flex-col gap-2 md:col-span-2'>
          <Label>{t('Base URL')}</Label>
          <Input
            value={form.base_url}
            onChange={(event) => setValue('base_url', event.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Priority')}</Label>
          <Input
            type='number'
            value={form.priority}
            onChange={(event) => setValue('priority', event.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Weight')}</Label>
          <Input
            type='number'
            value={form.weight}
            onChange={(event) => setValue('weight', event.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2 md:col-span-4'>
          <Label>{t('Key')}</Label>
          <Textarea
            value={form.key}
            onChange={(event) => setValue('key', event.target.value)}
          />
        </div>
        <Button
          className='md:col-span-4'
          disabled={selectedMerchantId === null}
          onClick={submit}
        >
          <Save data-icon='inline-start' />
          {t('Save')}
        </Button>
      </CardContent>
    </Card>
  )
}

function PricesTable({ prices }: { prices: MerchantModelPrice[] }) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Merchant Prices')}</CardTitle>
        <CardDescription>
          {t('Merchant prices override platform prices for bound tokens.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('Model')}</TableHead>
              <TableHead>{t('Model Price')}</TableHead>
              <TableHead>{t('Model Ratio')}</TableHead>
              <TableHead>{t('Completion Ratio')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prices.map((price) => (
              <TableRow key={`${price.merchant_id}-${price.model}`}>
                <TableCell>{price.model}</TableCell>
                <TableCell>{price.model_price}</TableCell>
                <TableCell>{price.model_ratio}</TableCell>
                <TableCell>{price.completion_ratio}</TableCell>
              </TableRow>
            ))}
            {prices.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className='text-muted-foreground'>
                  {t('No merchant prices yet.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function SettlementsTable({
  settlements,
}: {
  settlements: MerchantSettlement[]
}) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Merchant Settlements')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('ID')}</TableHead>
              <TableHead>{t('Amount')}</TableHead>
              <TableHead>{t('Currency')}</TableHead>
              <TableHead>{t('Status')}</TableHead>
              <TableHead>{t('Remark')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {settlements.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>{item.currency}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.remark ?? '-'}</TableCell>
              </TableRow>
            ))}
            {settlements.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className='text-muted-foreground'>
                  {t('No settlements yet.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export function MerchantCenter() {
  const { t } = useTranslation()
  const data = useMerchantCenterData()

  return (
    <SectionPageLayout>
      <SectionPageLayout.Title>{t('Merchant Center')}</SectionPageLayout.Title>
      <SectionPageLayout.Actions>
        <Button variant='outline' disabled={data.loading} onClick={data.reload}>
          <RefreshCcw data-icon='inline-start' />
          {t('Refresh')}
        </Button>
      </SectionPageLayout.Actions>
      <SectionPageLayout.Content>
        <div className='flex flex-col gap-4'>
          <Card>
            <CardHeader>
              <CardTitle>{data.merchant?.name ?? t('No Merchant')}</CardTitle>
              <CardDescription>
                {data.merchant
                  ? data.merchant.description || t('Merchant mode is enabled.')
                  : t('No merchant profile is bound to your account.')}
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-wrap gap-2'>
              {data.merchant && <StatusBadge status={data.merchant.status} />}
              {data.merchant && (
                <Badge variant='outline'>
                  {t('Merchant ID')}: {data.merchant.id}
                </Badge>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue='channels'>
            <TabsList>
              <TabsTrigger value='channels'>
                <Database data-icon='inline-start' />
                {t('Channels')}
              </TabsTrigger>
              <TabsTrigger value='prices'>
                <WalletCards data-icon='inline-start' />
                {t('Prices')}
              </TabsTrigger>
              <TabsTrigger value='settlements'>
                <Store data-icon='inline-start' />
                {t('Settlements')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value='channels'>
              <div className='flex flex-col gap-4'>
                <MerchantChannelForm onSaved={data.reload} />
                <MerchantChannelsTable
                  channels={data.channels}
                  onDelete={async (channelId) => {
                    const res = await deleteMerchantChannel(channelId)
                    if (res.success) {
                      toast.success(t('Deleted'))
                      data.reload()
                    }
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value='prices' className='flex flex-col gap-4'>
              <PriceForm onSaved={data.reload} />
              <PricesTable prices={data.prices} />
            </TabsContent>
            <TabsContent value='settlements'>
              <SettlementsTable settlements={data.settlements} />
            </TabsContent>
          </Tabs>
        </div>
      </SectionPageLayout.Content>
    </SectionPageLayout>
  )
}

function useMerchantAdminData() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [selectedMerchantId, setSelectedMerchantId] = useState<number | null>(
    null
  )
  const [channels, setChannels] = useState<MerchantChannel[]>([])
  const [settlements, setSettlements] = useState<MerchantSettlement[]>([])
  const [binding, setBinding] = useState<MerchantTokenBinding | null>(null)

  const selectedMerchant = useMemo(
    () => merchants.find((item) => item.id === selectedMerchantId) ?? null,
    [merchants, selectedMerchantId]
  )

  const reload = async () => {
    const merchantRes = await adminListMerchants()
    const items = merchantRes.data?.items ?? []
    setMerchants(items)
    setSelectedMerchantId((current) => current ?? items[0]?.id ?? null)
  }

  const reloadSelected = async (merchantId = selectedMerchantId) => {
    if (!merchantId) return
    const [channelRes, settlementRes] = await Promise.all([
      adminListMerchantChannels(merchantId),
      adminListSettlements(merchantId),
    ])
    setChannels(channelRes.data ?? [])
    setSettlements(settlementRes.data?.items ?? [])
  }

  useEffect(() => {
    reload()
  }, [])

  useEffect(() => {
    reloadSelected()
  }, [selectedMerchantId])

  return {
    merchants,
    selectedMerchant,
    selectedMerchantId,
    setSelectedMerchantId,
    channels,
    settlements,
    binding,
    setBinding,
    reload,
    reloadSelected,
  }
}

function MerchantCreateForm({ onSaved }: { onSaved: () => void }) {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    user_id: '',
    name: '',
    description: '',
  })

  const submit = async () => {
    const res = await adminCreateMerchant({
      user_id: Number(form.user_id),
      name: form.name,
      description: form.description,
      status: 1,
    })
    if (res.success) {
      toast.success(t('Saved'))
      setForm({ user_id: '', name: '', description: '' })
      onSaved()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Create Merchant')}</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-3 md:grid-cols-3'>
        <div className='flex flex-col gap-2'>
          <Label>{t('User ID')}</Label>
          <Input
            value={form.user_id}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                user_id: event.target.value,
              }))
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Merchant Name')}</Label>
          <Input
            value={form.name}
            onChange={(event) =>
              setForm((current) => ({ ...current, name: event.target.value }))
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Description')}</Label>
          <Input
            value={form.description}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
          />
        </div>
        <Button className='md:col-span-3' onClick={submit}>
          <Plus data-icon='inline-start' />
          {t('Create')}
        </Button>
      </CardContent>
    </Card>
  )
}

function MerchantAdminBindings({
  selectedMerchantId,
  onReload,
  binding,
  setBinding,
}: {
  selectedMerchantId: number | null
  onReload: () => void
  binding: MerchantTokenBinding | null
  setBinding: (binding: MerchantTokenBinding | null) => void
}) {
  const { t } = useTranslation()
  const [tokenId, setTokenId] = useState('')

  const loadBinding = async () => {
    const res = await adminGetTokenBinding(Number(tokenId))
    setBinding(res.data ?? null)
  }

  const bindToken = async () => {
    if (!selectedMerchantId) return
    const res = await adminSetTokenBinding(Number(tokenId), {
      merchant_id: selectedMerchantId,
      enabled: true,
    })
    if (res.success) {
      toast.success(t('Saved'))
      loadBinding()
    }
  }

  const unbindToken = async () => {
    const res = await adminDeleteTokenBinding(Number(tokenId))
    if (res.success) {
      toast.success(t('Deleted'))
      setBinding(null)
    }
  }

  return (
    <div className='grid gap-4'>
      <Card>
        <CardHeader>
          <CardTitle>{t('Token Merchant Binding')}</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-3'>
          <Label>{t('Token ID')}</Label>
          <Input
            value={tokenId}
            onChange={(event) => setTokenId(event.target.value)}
          />
          <div className='flex flex-wrap gap-2'>
            <Button variant='outline' onClick={loadBinding}>
              <RefreshCcw data-icon='inline-start' />
              {t('Load')}
            </Button>
            <Button disabled={!selectedMerchantId} onClick={bindToken}>
              <Link data-icon='inline-start' />
              {t('Bind')}
            </Button>
            <Button variant='destructive' onClick={unbindToken}>
              <Trash2 data-icon='inline-start' />
              {t('Unbind')}
            </Button>
          </div>
          <div className='text-muted-foreground text-sm'>
            {binding
              ? `${t('Merchant ID')}: ${binding.merchant_id}`
              : t('No binding loaded.')}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MerchantAdminSettlementForm({
  selectedMerchantId,
  onSaved,
}: {
  selectedMerchantId: number | null
  onSaved: () => void
}) {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    amount: '',
    currency: 'USD',
    status: 'pending',
    remark: '',
  })

  const submit = async () => {
    if (!selectedMerchantId) return
    const res = await adminSaveSettlement({
      merchant_id: selectedMerchantId,
      amount: Number(form.amount),
      currency: form.currency,
      status: form.status,
      remark: form.remark,
    })
    if (res.success) {
      toast.success(t('Saved'))
      setForm({ amount: '', currency: 'USD', status: 'pending', remark: '' })
      onSaved()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('Create Settlement')}</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-3 md:grid-cols-4'>
        <div className='flex flex-col gap-2'>
          <Label>{t('Amount')}</Label>
          <Input
            value={form.amount}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                amount: event.target.value,
              }))
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Currency')}</Label>
          <Input
            value={form.currency}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                currency: event.target.value,
              }))
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Status')}</Label>
          <Input
            value={form.status}
            onChange={(event) =>
              setForm((current) => ({ ...current, status: event.target.value }))
            }
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label>{t('Remark')}</Label>
          <Textarea
            value={form.remark}
            onChange={(event) =>
              setForm((current) => ({ ...current, remark: event.target.value }))
            }
          />
        </div>
        <Button className='md:col-span-4' onClick={submit}>
          <Plus data-icon='inline-start' />
          {t('Create')}
        </Button>
      </CardContent>
    </Card>
  )
}

export function MerchantAdmin() {
  const { t } = useTranslation()
  const data = useMerchantAdminData()

  return (
    <SectionPageLayout>
      <SectionPageLayout.Title>{t('Merchant Admin')}</SectionPageLayout.Title>
      <SectionPageLayout.Actions>
        <Button variant='outline' onClick={data.reload}>
          <RefreshCcw data-icon='inline-start' />
          {t('Refresh')}
        </Button>
      </SectionPageLayout.Actions>
      <SectionPageLayout.Content>
        <div className='flex flex-col gap-4'>
          <MerchantCreateForm onSaved={data.reload} />

          <Card>
            <CardHeader>
              <CardTitle>{t('Merchants')}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('ID')}</TableHead>
                    <TableHead>{t('User ID')}</TableHead>
                    <TableHead>{t('Merchant Name')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead>{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.merchants.map((merchant) => (
                    <TableRow key={merchant.id}>
                      <TableCell>{merchant.id}</TableCell>
                      <TableCell>{merchant.user_id}</TableCell>
                      <TableCell>{merchant.name}</TableCell>
                      <TableCell>
                        <StatusBadge status={merchant.status} />
                      </TableCell>
                      <TableCell>
                        <div className='flex gap-2'>
                          <Button
                            variant={
                              data.selectedMerchantId === merchant.id
                                ? 'secondary'
                                : 'outline'
                            }
                            size='sm'
                            onClick={() =>
                              data.setSelectedMerchantId(merchant.id)
                            }
                          >
                            {t('Select')}
                          </Button>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={async () => {
                              const res = await adminDeleteMerchant(merchant.id)
                              if (res.success) {
                                toast.success(t('Deleted'))
                                data.reload()
                              }
                            }}
                          >
                            <Trash2 data-icon='inline-start' />
                            {t('Delete')}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {data.selectedMerchant?.name ?? t('No Merchant Selected')}
              </CardTitle>
              <CardDescription>
                {t('Manage channels, settlements, and token binding.')}
              </CardDescription>
            </CardHeader>
          </Card>

          <MerchantAdminBindings
            selectedMerchantId={data.selectedMerchantId}
            onReload={data.reloadSelected}
            binding={data.binding}
            setBinding={data.setBinding}
          />
          <MerchantChannelForm
            selectedMerchantId={data.selectedMerchantId}
            onSaved={data.reloadSelected}
          />
          <MerchantChannelsTable
            channels={data.channels}
            onDelete={async (channelId) => {
              if (!data.selectedMerchantId) return
              const res = await adminDeleteMerchantChannel(
                data.selectedMerchantId,
                channelId
              )
              if (res.success) {
                toast.success(t('Deleted'))
                data.reloadSelected()
              }
            }}
          />
          <MerchantAdminSettlementForm
            selectedMerchantId={data.selectedMerchantId}
            onSaved={data.reloadSelected}
          />
          <SettlementsTable settlements={data.settlements} />
        </div>
      </SectionPageLayout.Content>
    </SectionPageLayout>
  )
}
