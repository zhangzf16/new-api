/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Activity, Check, Copy, Route } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'
import { getLobeIcon } from '@/lib/lobe-icon'
import { Button } from '@/components/ui/button'

interface LiveRoutingShowcaseProps {
  brandLogo: string
  brandName: string
}

const apiEndpoints = [
  {
    labelKey: 'Global acceleration',
    value: 'https://api.duoapi.xyz',
  },
  {
    labelKey: 'Overseas direct',
    value: 'https://duoapi.zeabur.app',
  },
  {
    labelKey: 'Status detection',
    value: 'https://checkduo.zeabur.app',
  },
] as const

const routingNodes = [
  {
    label: 'Claude',
    icon: 'Claude.Color',
    className: 'top-[16%] right-[8%]',
    active: true,
  },
  {
    label: 'Gemini',
    icon: 'Gemini.Color',
    className: 'bottom-[16%] left-[18%]',
    active: true,
  },
  {
    label: 'OpenAI',
    icon: 'OpenAI.Color',
    className: 'top-[16%] left-[8%]',
    active: true,
  },
] as const

const routeEdges = ['openai', 'claude', 'gemini'] as const

const modelStripIcons = [
  'OpenAI',
  'Claude.Color',
  'Gemini.Color',
  'DeepSeek.Color',
  'Qwen.Color',
  'Grok.Color',
  'Mistral.Color',
  'Cohere.Color',
  'Perplexity.Color',
  'Replicate.Color',
  'Midjourney.Color',
  'Stability.Color',
] as const

export function LiveRoutingShowcase(props: LiveRoutingShowcaseProps) {
  const { t } = useTranslation()

  return (
    <div className='mx-auto w-full max-w-7xl'>
      <div className='overflow-hidden rounded-3xl border border-stone-300/70 bg-[#fbf7ef]/95 text-stone-950 shadow-[0_28px_90px_-62px_rgba(78,52,31,0.9)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1d1a17]/92 dark:text-stone-50 dark:shadow-[0_28px_100px_-60px_rgba(0,0,0,0.9)]'>
        <div className='relative grid gap-4 overflow-hidden p-4 lg:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.8fr)] lg:grid-rows-[auto_minmax(0,1fr)] lg:p-6'>
          <div className='lg:col-span-2'>
            <ApiBasePanel />
          </div>
          <RoutingMap brandLogo={props.brandLogo} brandName={props.brandName} />
          <RouteTelemetry />
        </div>
      </div>

      <div className='relative px-2 pt-12 lg:px-4 lg:pt-16'>
        <p className='mb-7 text-center text-sm font-medium text-stone-500 dark:text-stone-400'>
          {t('Models from leading providers')}
        </p>
        <div className='mx-auto grid max-w-6xl grid-cols-4 items-center gap-x-7 gap-y-6 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-[repeat(12,minmax(0,1fr))]'>
          {modelStripIcons.map((iconName) => (
            <div
              key={iconName}
              className='flex min-h-12 items-center justify-center opacity-85 transition duration-200 hover:-translate-y-0.5 hover:opacity-100'
            >
              {getLobeIcon(iconName, 38)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ApiBasePanel() {
  const { t } = useTranslation()
  const { copiedText, copyToClipboard } = useCopyToClipboard()

  return (
    <section className='relative min-w-0 rounded-2xl border border-stone-300/45 bg-[#fffaf2]/54 p-4 shadow-[0_14px_34px_-30px_rgba(78,52,31,0.14)] backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.028] lg:p-4'>
      <div className='mb-3 flex items-center justify-between gap-3'>
        <h2 className='text-xs font-semibold tracking-[0.26em] text-stone-500 uppercase dark:text-stone-400'>
          {t('API Base URL')}
        </h2>
        <span className='rounded-full border border-[#d8a57a]/35 bg-[#e0764c]/8 px-2.5 py-1 text-xs font-medium text-[#9d4d2f] dark:border-[#e0764c]/28 dark:text-[#f0a27c]'>
          {t('Online')}
        </span>
      </div>

      <div className='flex flex-col gap-2 lg:grid lg:grid-cols-3 lg:gap-2.5'>
        {apiEndpoints.map((endpoint) => (
          <div
            key={endpoint.value}
            className='group rounded-xl border border-stone-300/28 bg-white/24 px-3 py-2.5 transition hover:border-stone-300/55 hover:bg-white/42 dark:border-white/7 dark:bg-white/[0.018] dark:hover:border-white/12 dark:hover:bg-white/[0.04]'
          >
            <div className='flex items-center justify-between gap-3 lg:hidden'>
              <span className='text-sm text-stone-500 dark:text-stone-400'>
                {t(endpoint.labelKey)}
              </span>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='size-8 shrink-0 text-stone-400 opacity-75 transition group-hover:opacity-100 dark:text-stone-500'
                onClick={() => copyToClipboard(endpoint.value)}
                aria-label={t('Copy URL')}
                title={t('Copy URL')}
              >
                {copiedText === endpoint.value ? (
                  <Check className='size-4 text-emerald-600 dark:text-emerald-400' />
                ) : (
                  <Copy className='size-4' />
                )}
              </Button>
            </div>

            <div className='mt-2 flex items-center gap-3 lg:hidden'>
              <div className='no-scrollbar min-w-0 flex-1 overflow-x-auto rounded-md bg-white/42 px-2.5 py-1.5 ring-1 ring-stone-200/45 dark:bg-white/[0.04] dark:ring-white/8'>
                <span className='block w-max whitespace-nowrap font-mono text-sm font-semibold text-stone-700 dark:text-stone-200'>
                  {endpoint.value}
                </span>
              </div>
            </div>

            <div className='hidden lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-x-2 lg:gap-y-1.5'>
              <div className='flex items-center justify-between gap-3'>
                <span className='truncate text-sm text-stone-500 dark:text-stone-400'>
                  {t(endpoint.labelKey)}
                </span>
              </div>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='row-span-2 size-8 shrink-0 self-center text-stone-400 opacity-75 transition group-hover:opacity-100 dark:text-stone-500'
                onClick={() => copyToClipboard(endpoint.value)}
                aria-label={t('Copy URL')}
                title={t('Copy URL')}
              >
                {copiedText === endpoint.value ? (
                  <Check className='size-4 text-emerald-600 dark:text-emerald-400' />
                ) : (
                  <Copy className='size-4' />
                )}
              </Button>
              <div className='no-scrollbar min-w-0 overflow-x-auto'>
                <span className='block w-max whitespace-nowrap font-mono text-[13px] font-semibold text-stone-700 dark:text-stone-200'>
                  {endpoint.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function RoutingMap(props: LiveRoutingShowcaseProps) {
  const { t } = useTranslation()

  return (
    <section className='relative min-h-[27rem] overflow-hidden rounded-2xl border border-stone-300/60 bg-[linear-gradient(180deg,#f4ede3_0%,#eadfd0_100%)] p-4 dark:border-white/10 dark:bg-[linear-gradient(180deg,#1a1715_0%,#141110_100%)] sm:min-h-[32rem]'>
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[linear-gradient(180deg,rgba(44,31,25,0.015),rgba(44,31,25,0.075))] dark:bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.18))]'
      />
      <div
        aria-hidden='true'
        className='absolute inset-x-[14%] top-[10%] h-[26%] rounded-full bg-[radial-gradient(circle,rgba(252,246,239,0.72),transparent_72%)] opacity-60 blur-3xl dark:bg-[radial-gradient(circle,rgba(255,237,221,0.08),transparent_72%)] dark:opacity-100'
      />
      <div
        aria-hidden='true'
        className='absolute inset-x-[20%] bottom-[13%] h-[24%] rounded-[999px] bg-[radial-gradient(ellipse_at_center,rgba(108,85,68,0.1),transparent_74%)] opacity-75 blur-2xl dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.045),transparent_74%)]'
      />
      <div
        aria-hidden='true'
        className='absolute left-1/2 bottom-[15%] h-[14%] w-[58%] -translate-x-1/2 rounded-[50%] border border-stone-400/6 opacity-85 [transform:translateX(-50%)_perspective(1100px)_rotateX(76deg)] dark:border-white/5'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 opacity-[0.025] [background-image:repeating-linear-gradient(0deg,rgba(90,72,56,0.38)_0px,rgba(90,72,56,0.38)_1px,transparent_1px,transparent_3px),repeating-linear-gradient(90deg,rgba(90,72,56,0.18)_0px,rgba(90,72,56,0.18)_1px,transparent_1px,transparent_4px)] dark:opacity-[0.02]'
      />
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_46%,rgba(60,42,33,0.04)_78%,rgba(60,42,33,0.08)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_44%,rgba(0,0,0,0.1)_76%,rgba(0,0,0,0.18)_100%)]'
      />

      <div aria-hidden='true' className='absolute inset-0'>
        {routeEdges.map((edge) => (
          <span
            key={edge}
            className={cn('route-edge', `route-edge-${edge}`)}
          />
        ))}
      </div>

      <div className='absolute top-1/2 left-1/2 flex min-h-20 w-[13.5rem] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-stone-300/52 bg-[#fffaf2]/94 p-4 shadow-[0_16px_40px_-36px_rgba(78,52,31,0.54)] backdrop-blur-xl dark:border-white/8 dark:bg-[#1b1715]/94 sm:w-[14.5rem]'>
        <div className='route-center-logo-wrap flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/46 bg-white/88 shadow-[0_8px_18px_-16px_rgba(78,52,31,0.28)] dark:border-white/8 dark:bg-white/6'>
          {props.brandLogo ? (
            <img
              src={props.brandLogo}
              alt={props.brandName}
              className='route-center-logo size-10 rounded-xl object-contain'
            />
          ) : (
            <Route className='size-8 text-[#e0764c]' aria-hidden='true' />
          )}
        </div>
        <div className='min-w-0'>
          <p className='truncate text-[15px] font-bold text-stone-950 dark:text-white sm:text-base'>
            {props.brandName}
          </p>
          <p className='mt-1 truncate text-xs text-stone-500 dark:text-stone-400 sm:text-sm'>
            {t('Smart routing engine')}
          </p>
        </div>
      </div>

      {routingNodes.map((node) => (
        <div
          key={node.label}
          className={cn(
            'absolute hidden items-center gap-3 rounded-full border px-3 py-2 backdrop-blur-xl transition sm:flex',
            node.active
              ? 'border-[#e0764c]/32 bg-[#fffaf2]/88 shadow-[0_10px_28px_-28px_rgba(224,118,76,0.42)] dark:border-[#e0764c]/24 dark:bg-white/[0.05]'
              : 'border-stone-300/48 bg-[#fffaf2]/64 opacity-82 shadow-[0_10px_24px_-28px_rgba(78,52,31,0.22)] dark:border-white/8 dark:bg-white/[0.035]',
            node.className
          )}
        >
          <span className='flex size-10 items-center justify-center rounded-full bg-white/92 text-stone-900 shadow-[0_6px_14px_-12px_rgba(78,52,31,0.22)] dark:bg-stone-100/92'>
            {getLobeIcon(node.icon, 28)}
          </span>
          <span
            className={cn(
              'pr-1 text-sm font-semibold',
              node.active
                ? 'text-stone-900 dark:text-stone-100'
                : 'text-stone-600 dark:text-stone-300'
            )}
          >
            {node.label}
          </span>
        </div>
      ))}
    </section>
  )
}

function RouteTelemetry() {
  return (
    <section className='relative min-w-0 rounded-2xl border border-stone-300/50 bg-[#fffaf2]/64 p-5 shadow-[0_14px_34px_-30px_rgba(78,52,31,0.16)] backdrop-blur-xl dark:border-white/8 dark:bg-white/[0.03] lg:p-6'>
      <div className='mb-6 flex items-center gap-2'>
        <span className='size-3 rounded-full bg-[#d96b5f]' />
        <span className='size-3 rounded-full bg-[#d6b35f]' />
        <span className='size-3 rounded-full bg-[#6aa48c]' />
        <span className='ml-4 min-w-0 truncate text-sm font-semibold text-stone-500 dark:text-stone-400'>
          router.live
        </span>
      </div>
      <div className='mb-7 h-px bg-stone-300/42 dark:bg-white/8' />

      <div className='font-mono text-sm leading-8 text-stone-500 dark:text-stone-400'>
        <p>
          <span className='font-semibold text-[#7f8f55] dark:text-[#a5c178]'>
            route
          </span>{' '}
          <span className='font-semibold text-stone-800 dark:text-stone-200'>
            openai/gpt-4o
          </span>
        </p>
        <p className='mt-6'>
          latency{' '}
          <span className='font-semibold text-stone-800 dark:text-stone-100'>
            684ms
          </span>
          <span className='px-2 text-stone-500'>/</span>
          cost{' '}
          <span className='font-semibold text-[#9d4d2f] dark:text-[#f0a27c]'>
            -18%
          </span>
        </p>
        <p className='mt-5'>
          fallback{' '}
          <span className='font-semibold text-[#7f8f55] dark:text-[#a5c178]'>
            ready
          </span>
        </p>
      </div>

      <div className='mt-6 h-2 overflow-hidden rounded-full bg-stone-200/75 dark:bg-white/8'>
        <div className='h-full w-[68%] rounded-full bg-gradient-to-r from-[#6aa48c] via-[#d6b35f] to-[#e8b58c]' />
      </div>

      <div className='mt-8 flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400'>
        <Activity
          className='size-4 text-[#9d6b4b] dark:text-[#f0a27c]'
          aria-hidden='true'
        />
        <span>route telemetry</span>
      </div>
    </section>
  )
}
