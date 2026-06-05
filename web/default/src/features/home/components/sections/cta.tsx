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
import { cn } from '@/lib/utils'
import { AnimateInView } from '@/components/animate-in-view'

interface CTAProps {
  className?: string
  brandName: string
}

export function CTA(props: CTAProps) {
  const { t, i18n } = useTranslation()
  const isChinese = i18n.resolvedLanguage?.startsWith('zh') === true
  const pricingHeading = t(
    'Base pricing tracks the official rate, then each group applies its own multiplier.'
  )
  const chineseHeadingLines = isChinese
    ? pricingHeading.split('，')
    : [pricingHeading]

  return (
    <section
      className={cn(
        'relative isolate z-10 overflow-hidden bg-[#f7f2ea] px-5 py-20 md:py-28 dark:bg-[#141210]',
        props.className
      )}
    >
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(120,96,70,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,96,70,0.1)_1px,transparent_1px)] bg-[size:52px_52px] opacity-45 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]'
      />
      <div
        aria-hidden
        className='absolute inset-x-0 bottom-0 -z-10 h-48 bg-[linear-gradient(0deg,rgba(224,118,76,0.16),transparent)] dark:bg-[linear-gradient(0deg,rgba(224,118,76,0.08),transparent)]'
      />

      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='text-center' animation='fade-up'>
          <p className='text-xs font-medium tracking-[0.28em] text-stone-500 uppercase dark:text-stone-400'>
            {t('Pricing guide')}
          </p>
        </AnimateInView>

        <div className='mt-8 grid items-center gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-12'>
          <AnimateInView className='relative max-w-3xl' animation='fade-up'>
            <h2
              className={cn(
                'max-w-3xl leading-[0.98] font-black tracking-normal text-stone-950 dark:text-stone-50',
                isChinese
                  ? 'text-[clamp(2.2rem,7vw,4rem)]'
                  : 'text-[clamp(2.1rem,5vw,3.9rem)]'
              )}
            >
              {isChinese ? (
                <>
                  <span className='block'>
                    {chineseHeadingLines[0]}
                    <span className='text-[#b85f3d] dark:text-[#f0a27c]'>，</span>
                  </span>
                  <span className='mt-1 block'>
                    {chineseHeadingLines[1]?.replace(/。$/, '')}
                    <span className='text-[#b85f3d] dark:text-[#f0a27c]'>。</span>
                  </span>
                </>
              ) : (
                pricingHeading
              )}
            </h2>

            <div className='mt-7 inline-flex max-w-full flex-wrap items-center gap-2 rounded-2xl bg-stone-950 p-2 text-[13px] font-semibold text-white shadow-[0_28px_70px_-44px_rgba(17,17,17,0.95)] dark:bg-black sm:text-sm'>
              <span className='rounded-xl bg-white/[0.06] px-3.5 py-2.5 sm:px-4 sm:py-3'>
                {t('Final price')}
              </span>
              <span className='px-1 text-stone-500'>=</span>
              <span className='rounded-xl bg-white/[0.06] px-3.5 py-2.5 text-white/96 sm:px-4 sm:py-3'>
                {t('Official base price')}
                <span className='ml-1 text-stone-400'>({t('1:1 rate')})</span>
              </span>
              <span className='px-1 text-stone-500'>×</span>
              <span className='rounded-xl bg-[#e0764c] px-3.5 py-2.5 text-white sm:px-4 sm:py-3 dark:bg-[#f0a27c] dark:text-stone-950'>
                {t('Group multiplier')}
              </span>
            </div>

            <p className='mt-5 max-w-2xl text-[15px] leading-7 text-stone-600 dark:text-stone-300 sm:text-base sm:leading-8'>
              {t(
                'Every listed unit price starts from the provider official public rate. Different groups add a multiplier based on channel quality, stability, and dedicated capacity. Refer to the pricing table for the exact ratio and final billed price.'
              )}
            </p>
          </AnimateInView>

          <AnimateInView
            className='w-full lg:justify-self-end'
            animation='scale-in'
          >
            <Link to='/pricing' className='group block'>
              <div className='relative'>
                <div
                  aria-hidden
                  className='absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[1.75rem] bg-[#e0764c] sm:translate-x-2 sm:translate-y-2 dark:bg-[#f0a27c]'
                />
                <div className='relative overflow-hidden rounded-[1.75rem] border border-stone-950 bg-[#111111] p-7 text-white shadow-[0_34px_80px_-48px_rgba(17,17,17,0.95)] dark:border-white/10'>
                  <div
                    aria-hidden
                    className='absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:26px_26px]'
                  />
                  <div className='relative z-10 flex min-h-[14.5rem] flex-col sm:min-h-[15.5rem]'>
                    <div className='flex items-start justify-between gap-3'>
                      <p className='font-mono text-xs font-semibold tracking-[0.22em] text-[#e0764c] uppercase dark:text-[#f0a27c]'>
                        {t('PRICING.TABLE')}
                      </p>
                      <span className='mt-1 size-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.95)]' />
                    </div>

                    <div className='mt-8'>
                      <h3 className='text-[1.65rem] leading-tight font-semibold tracking-normal text-white sm:text-[1.9rem]'>
                        {t('View full pricing table')}
                      </h3>
                      <div className='mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone-400'>
                        <span>{t('All Models')}</span>
                        <span aria-hidden className='text-stone-600'>
                          •
                        </span>
                        <span>{t('All Groups')}</span>
                        <span aria-hidden className='text-stone-600'>
                          •
                        </span>
                        <span>{t('Real-time multipliers')}</span>
                      </div>
                    </div>

                    <div className='mt-auto border-t border-white/10 pt-6'>
                      <div className='flex items-center justify-between gap-4'>
                        <span className='font-mono text-sm text-stone-200'>
                          /pricing
                        </span>
                        <span className='inline-flex items-center gap-2 text-sm font-semibold text-[#e0764c] dark:text-[#f0a27c]'>
                          {t('View Pricing')}
                          <ArrowRight className='size-4 transition-transform duration-200 group-hover:translate-x-1' />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </AnimateInView>
        </div>
      </div>
    </section>
  )
}
