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
  Analytics01Icon,
  ApiGatewayIcon,
  Route01Icon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useTranslation } from 'react-i18next'

import { AnimateInView } from '@/components/animate-in-view'

interface FeaturesProps {
  className?: string
  brandName: string
}

export function Features(props: FeaturesProps) {
  const { t } = useTranslation()
  const features = [
    {
      icon: ApiGatewayIcon,
      title: t('Connect once'),
      description: t(
        'Use one OpenAI-compatible endpoint across leading AI providers.'
      ),
    },
    {
      icon: Route01Icon,
      title: t('Route reliably'),
      description: t(
        'Balance traffic, retry failures, and keep applications available.'
      ),
    },
    {
      icon: Analytics01Icon,
      title: t('See every cost'),
      description: t('Review usage and spend with clear, traceable records.'),
    },
  ]

  return (
    <section className='border-y border-[#d8cec3] bg-[#eee7de] px-5 py-20 text-[#2f2a26] sm:px-6 md:py-24 lg:py-28 dark:border-[#3a342f] dark:bg-[#1d1916] dark:text-[#f5efe8]'>
      <div className='mx-auto grid max-w-7xl lg:grid-cols-[minmax(24rem,0.95fr)_minmax(0,1.7fr)] lg:items-start lg:gap-16 xl:gap-24'>
        <AnimateInView className='max-w-md'>
          <p className='text-sm font-medium text-[#b75f43] dark:text-[#e48768]'>
            {t('Built for AI developers')}
          </p>
          <h2 className='mt-3 text-2xl leading-tight font-semibold tracking-[-0.025em] text-balance sm:text-3xl'>
            {t('The essentials, without the noise.')}
          </h2>
          <p className='mt-3 text-base leading-7 text-[#6f655d] dark:text-[#b9afa5]'>
            {t(
              '{{name}} keeps model access simple from first request to scale.',
              {
                name: props.brandName,
              }
            )}
          </p>
        </AnimateInView>

        <div className='mt-12 grid border-y border-[#d1c5b9] md:grid-cols-3 lg:mt-0 dark:border-[#3a342f]'>
          {features.map((feature, index) => (
            <AnimateInView
              key={feature.title}
              delay={index * 70}
              animation='fade-up'
              className='border-[#d1c5b9] py-8 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0 lg:min-h-64 dark:border-[#3a342f]'
            >
              <article>
                <HugeiconsIcon
                  icon={feature.icon}
                  size={22}
                  strokeWidth={1.8}
                  className='text-[#d97757] dark:text-[#e48768]'
                />
                <h3 className='mt-5 text-base font-semibold'>
                  {feature.title}
                </h3>
                <p className='mt-2 text-sm leading-6 text-[#6f655d] dark:text-[#b9afa5]'>
                  {feature.description}
                </p>
              </article>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
