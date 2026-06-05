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
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
  brandName: string
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='relative z-10 overflow-hidden bg-[#fbf7ef] px-5 py-20 md:py-28 dark:bg-[#181512]'>
      <div
        aria-hidden
        className='absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(0deg,rgba(224,118,76,0.12),transparent)] dark:bg-[linear-gradient(0deg,rgba(224,118,76,0.08),transparent)]'
      />

      <AnimateInView
        className='mx-auto max-w-3xl text-center'
        animation='scale-in'
      >
        <h2 className='text-3xl leading-tight font-semibold tracking-normal text-stone-950 md:text-5xl dark:text-stone-50'>
          {t('Make {{name}} the front door for your AI stack.', {
            name: props.brandName,
          })}
        </h2>
        <p className='mx-auto mt-5 max-w-xl text-base leading-8 text-stone-600 dark:text-stone-300'>
          {t(
            'Start with one token, one endpoint and a console built for routing, billing and reliability.'
          )}
        </p>
        <div className='mt-8 flex items-center justify-center gap-3'>
          <Button
            className='h-11 rounded-lg bg-stone-950 px-5 text-sm text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-950 dark:hover:bg-white'
            render={<Link to='/sign-up' />}
          >
            {t('Start routing models')}
            <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
          </Button>
          <Button
            variant='outline'
            className='h-11 rounded-lg border-stone-300/70 bg-white/55 px-5 text-sm text-stone-800 shadow-xs hover:bg-white/85 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-100 dark:hover:bg-white/[0.08]'
            render={<Link to='/pricing' />}
          >
            {t('View Pricing')}
          </Button>
        </div>
      </AnimateInView>
    </section>
  )
}
