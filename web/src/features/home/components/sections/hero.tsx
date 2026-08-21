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
import {
  ArrowRight01Icon,
  BookOpen01Icon,
  CheckmarkCircle02Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'
import { cn } from '@/lib/utils'

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
  const docsIsExternal = docsUrl.startsWith('http')

  return (
    <section
      className={cn(
        'bg-[#f7f3ee] px-5 pt-28 pb-16 text-[#2f2a26] sm:px-6 sm:pt-32 sm:pb-20 lg:pt-24 lg:pb-20 dark:bg-[#171412] dark:text-[#f5efe8]',
        props.className
      )}
    >
      <div className='mx-auto grid max-w-7xl lg:min-h-[640px] lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,0.75fr)] lg:items-center lg:gap-20 xl:gap-28'>
        <div className='max-w-3xl text-left'>
          <div className='landing-animate-fade-up inline-flex items-center gap-2 rounded-full border border-[#d8cec3] bg-[#efe8df] px-3 py-1.5 text-sm font-medium opacity-0 dark:border-[#3a342f] dark:bg-[#211d1a]'>
            <img
              src={props.brandLogo}
              alt=''
              className='size-5 rounded-md object-contain'
            />
            <span>{props.brandName}</span>
          </div>

          <h1 className='landing-animate-fade-up mt-8 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.04em] text-balance opacity-0 [animation-delay:70ms] sm:text-6xl lg:text-[4.5rem] xl:text-[5rem]'>
            {t('Connect every model through one clean API.')}
          </h1>

          <p className='landing-animate-fade-up mt-6 max-w-xl text-base leading-7 text-pretty text-[#6f655d] opacity-0 [animation-delay:140ms] sm:text-lg sm:leading-8 dark:text-[#b9afa5]'>
            {t(
              'Manage access, route requests, and track usage without the operational clutter.'
            )}
          </p>

          <div className='landing-animate-fade-up mt-9 flex w-full flex-col items-stretch gap-3 opacity-0 [animation-delay:210ms] sm:w-auto sm:flex-row sm:items-center'>
            <Button
              size='lg'
              className='h-11 rounded-xl bg-[#d97757] px-5 text-white shadow-none hover:bg-[#c96849] dark:bg-[#e48768] dark:text-[#1b1714] dark:hover:bg-[#ed9577]'
              render={
                <Link to={props.isAuthenticated ? '/dashboard' : '/sign-up'} />
              }
            >
              {props.isAuthenticated
                ? t('Go to Dashboard')
                : t('Start routing models')}
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={18}
                strokeWidth={2}
              />
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='h-11 rounded-xl border-[#cfc3b7] bg-transparent px-5 text-[#2f2a26] shadow-none hover:bg-[#eee6dd] dark:border-[#49413b] dark:text-[#f5efe8] dark:hover:bg-[#25201d]'
              render={<Link to='/pricing' />}
            >
              {t('View Pricing')}
            </Button>
            {docsIsExternal ? (
              <a
                href={docsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex h-11 items-center justify-center gap-2 px-2 text-sm text-[#756a61] transition-colors hover:text-[#d97757] dark:text-[#b9afa5] dark:hover:text-[#e48768]'
              >
                <HugeiconsIcon
                  icon={BookOpen01Icon}
                  size={16}
                  strokeWidth={2}
                />
                {t('Read the docs')}
              </a>
            ) : (
              <Link
                to={docsUrl}
                className='inline-flex h-11 items-center justify-center gap-2 px-2 text-sm text-[#756a61] transition-colors hover:text-[#d97757] dark:text-[#b9afa5] dark:hover:text-[#e48768]'
              >
                <HugeiconsIcon
                  icon={BookOpen01Icon}
                  size={16}
                  strokeWidth={2}
                />
                {t('Read the docs')}
              </Link>
            )}
          </div>
        </div>

        <aside className='mt-16 lg:mt-0' aria-labelledby='hero-capabilities'>
          <p
            id='hero-capabilities'
            className='text-sm font-medium text-[#b75f43] dark:text-[#e48768]'
          >
            {t('Built for AI developers')}
          </p>
          <ul className='mt-5 border-y border-[#d8cec3] dark:border-[#3a342f]'>
            {[
              t('OpenAI-compatible API'),
              t('Multi-provider routing'),
              t('Real-time usage visibility'),
            ].map((item, index) => (
              <li
                key={item}
                className='grid grid-cols-[2rem_1fr_auto] items-center gap-4 border-b border-[#d8cec3] py-6 last:border-b-0 dark:border-[#3a342f]'
              >
                <span className='font-mono text-xs text-[#9b8f84] dark:text-[#776e66]'>
                  0{index + 1}
                </span>
                <span className='text-base font-medium'>{item}</span>
                <HugeiconsIcon
                  icon={CheckmarkCircle02Icon}
                  size={18}
                  strokeWidth={2}
                  className='text-[#d97757] dark:text-[#e48768]'
                />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  )
}
