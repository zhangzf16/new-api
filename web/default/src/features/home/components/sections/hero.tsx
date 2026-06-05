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
import type React from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Gauge,
  Route,
  ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'
import { getLobeIcon } from '@/lib/lobe-icon'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
  brandLogo: string
  brandName: string
}

const providers = [
  { label: 'OpenAI', icon: 'OpenAI.Color' },
  { label: 'Claude', icon: 'Claude.Color' },
  { label: 'Gemini', icon: 'Gemini.Color' },
  { label: 'DeepSeek', icon: 'DeepSeek.Color' },
  { label: 'Qwen', icon: 'Qwen.Color' },
  { label: 'Grok', icon: 'Grok.Color' },
] as const

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  const renderDocsButton = () => {
    const isExternal = docsUrl.startsWith('http')
    const className =
      'h-11 flex-1 rounded-lg border-stone-300/70 bg-white/55 px-4 text-sm text-stone-800 shadow-xs hover:bg-white/85 sm:flex-none sm:px-5 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-100 dark:hover:bg-white/[0.08]'

    if (isExternal) {
      return (
        <Button
          variant='outline'
          className={className}
          render={
            <a href={docsUrl} target='_blank' rel='noopener noreferrer' />
          }
        >
          <BookOpen className='size-4' />
          {t('Docs')}
        </Button>
      )
    }

    return (
      <Button
        variant='outline'
        className={className}
        render={<Link to={docsUrl} />}
      >
        <BookOpen className='size-4' />
        {t('Docs')}
      </Button>
    )
  }

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden px-4 pt-22 pb-10 sm:px-5 md:pt-30 md:pb-16',
        'bg-[#f7f2ea] text-stone-950 dark:bg-[#141210] dark:text-stone-50',
        props.className
      )}
    >
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(120,96,70,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,96,70,0.1)_1px,transparent_1px)] bg-[size:64px_64px] opacity-45 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]'
      />
      <div
        aria-hidden
        className='absolute inset-x-0 top-0 -z-10 h-72 bg-[linear-gradient(180deg,rgba(224,118,76,0.16),transparent)] dark:bg-[linear-gradient(180deg,rgba(224,118,76,0.12),transparent)]'
      />

      <div className='mx-auto flex max-w-6xl flex-col items-center'>
        <div
          className='landing-animate-fade-up flex max-w-full items-center gap-3 rounded-full border border-stone-300/70 bg-white/55 px-3 py-1.5 text-xs font-medium text-stone-700 opacity-0 shadow-xs backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-300'
          style={{ animationDelay: '0ms' }}
        >
          <img
            src={props.brandLogo}
            alt={props.brandName}
            className='size-6 rounded-md object-cover'
          />
          <span className='min-w-0 truncate'>
            {t('{{name}} · AI relay platform', { name: props.brandName })}
          </span>
        </div>

        <div
          className='landing-animate-fade-up mt-8 max-w-4xl text-center opacity-0'
          style={{ animationDelay: '80ms' }}
        >
          <h1 className='flex flex-col items-center gap-3 leading-none font-semibold tracking-normal'>
            <span className='hero-brand-shell inline-flex max-w-full'>
              <span
                className='hero-brand-name inline-flex max-w-full pb-3 text-[clamp(2.5rem,14vw,5rem)] leading-[1.08] font-black sm:text-6xl md:text-7xl lg:text-8xl'
                data-text={props.brandName}
              >
                {props.brandName}
              </span>
            </span>
            <span className='block max-w-3xl text-[1.375rem] text-balance text-stone-600 [word-break:keep-all] sm:text-4xl md:text-5xl lg:text-6xl dark:text-stone-300'>
              {t('One calm gateway for every AI model.')}
            </span>
          </h1>
          <p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base md:mt-6 md:text-lg md:leading-8 dark:text-stone-300'>
            {t(
              'Unlock creative potential and boost development efficiency. A next-generation intelligent coding experience built for developers, making code writing easier than ever.'
            )}
          </p>
        </div>

        <div
          className='landing-animate-fade-up mt-7 flex w-full flex-wrap items-center justify-center gap-2.5 opacity-0 sm:mt-8 sm:w-auto sm:gap-3'
          style={{ animationDelay: '160ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='h-11 flex-1 rounded-lg bg-stone-950 px-4 text-sm text-white hover:bg-stone-800 sm:flex-none sm:px-5 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='size-4' />
            </Button>
          ) : (
            <Button
              className='h-11 flex-1 rounded-lg bg-stone-950 px-4 text-sm text-white hover:bg-stone-800 sm:flex-none sm:px-5 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white'
              render={<Link to='/sign-up' />}
            >
              {t('Start routing models')}
              <ArrowRight className='size-4' />
            </Button>
          )}
          <Button
            variant='outline'
            className='h-11 flex-1 rounded-lg border-stone-300/70 bg-white/55 px-4 text-sm text-stone-800 shadow-xs hover:bg-white/85 sm:flex-none sm:px-5 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-100 dark:hover:bg-white/[0.08]'
            render={<Link to='/pricing' />}
          >
            {t('View Pricing')}
          </Button>
          {renderDocsButton()}
        </div>

        <div
          className='landing-animate-fade-up mt-10 w-full opacity-0 sm:mt-12'
          style={{ animationDelay: '240ms' }}
        >
          <GatewayConsole />
        </div>
      </div>
    </section>
  )
}

function GatewayConsole() {
  const { t } = useTranslation()

  return (
    <div className='mx-auto max-w-5xl overflow-hidden rounded-2xl border border-stone-300/70 bg-[#fbf7ef]/90 shadow-[0_24px_90px_-55px_rgba(78,52,31,0.85)] backdrop-blur-xl sm:rounded-[1.35rem] dark:border-white/10 dark:bg-[#1d1a17]/92 dark:shadow-[0_28px_100px_-50px_rgba(0,0,0,0.9)]'>
      <div className='flex items-center justify-between gap-3 border-b border-stone-300/60 px-3 py-2.5 sm:px-4 sm:py-3 dark:border-white/10'>
        <div className='flex items-center gap-2'>
          <span className='size-2.5 rounded-full bg-[#e0764c]' />
          <span className='size-2.5 rounded-full bg-[#d6b35f]' />
          <span className='size-2.5 rounded-full bg-[#6aa48c]' />
        </div>
        <div className='min-w-0 truncate rounded-full border border-stone-300/70 bg-white/55 px-2.5 py-1 font-mono text-[10px] text-stone-500 sm:px-3 sm:text-[11px] dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-400'>
          https://api.example.com/v1/chat/completions
        </div>
      </div>

      <div className='grid grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] gap-px bg-stone-300/60 dark:bg-white/10'>
        <div className='min-w-0 bg-[#fbf7ef] p-3 sm:p-5 md:p-6 dark:bg-[#1d1a17]'>
          <div className='mb-3 flex items-start justify-between gap-2 sm:mb-5 sm:items-center'>
            <div className='min-w-0'>
              <p className='text-xs font-medium tracking-widest text-stone-500 uppercase dark:text-stone-400'>
                {t('Live routing plan')}
              </p>
              <h2 className='mt-1 line-clamp-2 text-sm font-semibold text-stone-950 sm:text-lg dark:text-stone-50'>
                {t('Choose the best upstream automatically')}
              </h2>
            </div>
            <span className='shrink-0 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-700 sm:px-2.5 sm:py-1 sm:text-xs dark:text-emerald-300'>
              {t('Healthy')}
            </span>
          </div>

          <div className='space-y-2 sm:space-y-2.5'>
            {providers.map((provider, index) => (
              <div
                key={provider.label}
                className={cn(
                  'items-center gap-2 rounded-xl border border-stone-300/60 bg-white/55 px-2 py-2 sm:gap-3 sm:px-3 sm:py-3 dark:border-white/10 dark:bg-white/[0.035]',
                  index > 3 ? 'hidden sm:flex' : 'flex'
                )}
              >
                <div className='flex size-7 shrink-0 items-center justify-center rounded-lg border border-stone-200/80 bg-white text-stone-900 shadow-xs sm:size-8 dark:border-white/10 dark:bg-white/[0.08] dark:text-white'>
                  {getLobeIcon(provider.icon, 18)}
                </div>
                <div className='min-w-0 flex-1'>
                  <div className='flex items-center justify-between gap-3'>
                    <span className='truncate text-sm font-medium'>
                      {provider.label}
                    </span>
                    <span className='hidden font-mono text-xs text-stone-500 min-[420px]:inline dark:text-stone-400'>
                      {index === 0 ? '124ms' : `${136 + index * 17}ms`}
                    </span>
                  </div>
                  <div className='mt-2 h-1 overflow-hidden rounded-full bg-stone-200 sm:h-1.5 dark:bg-white/10'>
                    <div
                      className='h-full rounded-full bg-[#e0764c]'
                      style={{ width: `${92 - index * 8}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='min-w-0 bg-[#f6efe4] p-3 sm:p-5 md:p-6 dark:bg-[#151311]'>
          <div className='grid grid-cols-2 gap-2 sm:gap-3'>
            <Metric
              icon={<Route className='size-4' />}
              label={t('Failover')}
              value='99.9%'
            />
            <Metric
              icon={<Gauge className='size-4' />}
              label={t('Latency')}
              value='124ms'
            />
            <Metric
              icon={<ShieldCheck className='size-4' />}
              label={t('Keys')}
              value='AES'
            />
            <Metric
              icon={<Code2 className='size-4' />}
              label={t('Protocol')}
              value='OpenAI'
            />
          </div>

          <div className='mt-3 rounded-xl border border-stone-300/70 bg-stone-950 p-3 text-stone-100 sm:mt-5 sm:p-4 dark:border-white/10 dark:bg-black/35'>
            <div className='mb-3 flex items-center gap-2 text-xs text-stone-400'>
              <CheckCircle2 className='size-3.5 text-emerald-400' />
              {t('Compatible request')}
            </div>
            <pre className='hidden overflow-hidden font-mono text-[12px] leading-6 whitespace-pre-wrap text-stone-300 sm:block'>
              <code>{`curl https://api.example.com/v1/chat/completions
  -H "Authorization: Bearer sk-..."
  -d '{ "model": "claude-4-sonnet" }'`}</code>
            </pre>
            <div className='font-mono text-[11px] leading-5 text-stone-300 sm:hidden'>
              model: claude-4-sonnet
            </div>
          </div>

          <div className='mt-5 hidden gap-2 text-sm sm:grid'>
            {[
              t('Header passthrough'),
              t('Request inspection'),
              t('Multi-model routing'),
            ].map((item) => (
              <div
                key={item}
                className='flex items-center gap-2 text-stone-600 dark:text-stone-300'
              >
                <CheckCircle2 className='size-4 text-[#e0764c]' />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Metric(props: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className='min-w-0 rounded-xl border border-stone-300/70 bg-white/60 p-2 sm:p-3 dark:border-white/10 dark:bg-white/[0.04]'>
      <div className='mb-2 flex items-center justify-between gap-1 text-stone-500 sm:mb-3 dark:text-stone-400'>
        {props.icon}
        <span className='truncate text-[10px] sm:text-[11px]'>{props.label}</span>
      </div>
      <div className='truncate font-mono text-sm font-semibold sm:text-lg'>
        {props.value}
      </div>
    </div>
  )
}
