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
  BadgeDollarSign,
  Braces,
  ChartNoAxesCombined,
  KeyRound,
  Layers3,
  Route,
} from 'lucide-react'
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
      icon: <Braces className='size-5' />,
      title: t('One API, many model families'),
      desc: t(
        'Keep your client code stable while switching between OpenAI, Claude, Gemini and local providers.'
      ),
    },
    {
      icon: <Route className='size-5' />,
      title: t('Smart routing and failover'),
      desc: t(
        'Route by group, priority and health so production traffic keeps moving when an upstream is slow.'
      ),
    },
    {
      icon: <BadgeDollarSign className='size-5' />,
      title: t('Transparent ratio rules'),
      desc: t(
        'No opaque credit systems. Every usage and adjustment record stays traceable, so every bill is easy to verify.'
      ),
    },
    {
      icon: <KeyRound className='size-5' />,
      title: t('Key management built in'),
      desc: t(
        'Store upstream keys securely, switch providers cleanly, and keep development and production credentials separate.'
      ),
    },
    {
      icon: <ChartNoAxesCombined className='size-5' />,
      title: t('Request tracing'),
      desc: t(
        'Follow model choice, retries and failover decisions for every request from one console.'
      ),
    },
    {
      icon: <Layers3 className='size-5' />,
      title: t('Stable access to overseas models'),
      desc: t(
        'Enterprise backend clusters connect to overseas providers through one gateway, with route optimization, multi-node failover, and automatic retries that protect long coding sessions.'
      ),
    },
  ]

  return (
    <section className='bg-[#fbf7ef] px-5 py-20 md:py-28 dark:bg-[#181512]'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-12 max-w-2xl'>
          <p className='mb-3 text-xs font-medium tracking-widest text-[#b85f3d] uppercase dark:text-[#f0a27c]'>
            {t('Built for AI developers')}
          </p>
          <h2 className='text-3xl leading-tight font-semibold tracking-normal text-stone-950 md:text-4xl dark:text-stone-50'>
            {t('Everything your AI middle station needs to run quietly.')}
          </h2>
          <p className='mt-4 text-base leading-7 text-stone-600 dark:text-stone-300'>
            {t(
              '{{name}} gives developers one place to connect models, manage keys, and ship reliable AI integrations.',
              { name: props.brandName }
            )}
          </p>
        </AnimateInView>

        <div className='grid gap-3 md:grid-cols-3'>
          {features.map((feature, index) => (
            <AnimateInView
              key={feature.title}
              delay={index * 70}
              animation='fade-up'
              className='rounded-xl border border-stone-300/70 bg-[#fffaf2] p-5 shadow-[0_12px_40px_-32px_rgba(78,52,31,0.55)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none'
            >
              <div className='mb-5 flex size-10 items-center justify-center rounded-lg border border-stone-300/70 bg-[#f1e2d1] text-[#b85f3d] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#f0a27c]'>
                {feature.icon}
              </div>
              <h3 className='text-base font-semibold text-stone-950 dark:text-stone-50'>
                {feature.title}
              </h3>
              <p className='mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300'>
                {feature.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
