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
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  BookOpen,
} from 'lucide-react'
import { CherryStudio } from '@lobehub/icons'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { Button } from '@/components/ui/button'
import { LiveRoutingShowcase } from '../live-routing-showcase'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
  brandLogo: string
  brandName: string
}

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
          <p className='mx-auto mt-5 max-w-full whitespace-nowrap text-[clamp(0.55rem,2.35vw,0.875rem)] leading-7 text-stone-600 sm:text-base md:mt-6 md:text-lg md:leading-8 dark:text-stone-300'>
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
          <LiveRoutingShowcase
            brandLogo={props.brandLogo}
            brandName={props.brandName}
          />
        </div>
      </div>
    </section>
  )
}
