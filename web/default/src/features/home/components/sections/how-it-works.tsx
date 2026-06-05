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
import { KeyRound, Link2, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

interface HowItWorksProps {
  brandName: string
}

export function HowItWorks(props: HowItWorksProps) {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('Create API key'),
      desc: t(
        'Create a new API key from the "Tokens" page in the console. You can create different keys for different projects and manage quota and permissions independently.'
      ),
      icon: <KeyRound className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: t('Configure Base URL'),
      desc: t(
        'Point the Base URL of your SDK or tool to the {{name}} service endpoint, and use the API key you just created.',
        { name: props.brandName }
      ),
      icon: <Link2 className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: t('Start making requests'),
      desc: t(
        'Send requests using the standard OpenAI SDK format. Switch models by changing the model parameter, and {{name}} routes each request to the best upstream automatically.',
        { name: props.brandName }
      ),
      icon: <Sparkles className='size-6' strokeWidth={1.5} />,
    },
  ]

  return (
    <section className='relative z-10 border-t border-stone-300/70 bg-[#f7f2ea] px-5 py-20 md:py-28 dark:border-white/10 dark:bg-[#141210]'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <p className='mb-3 text-xs font-medium tracking-widest text-[#b85f3d] uppercase dark:text-[#f0a27c]'>
            {t('How {{name}} works', { name: props.brandName })}
          </p>
          <h2 className='text-3xl font-semibold tracking-normal text-stone-950 md:text-4xl dark:text-stone-50'>
            {t('A relay workflow your team can reason about.')}
          </h2>
        </AnimateInView>

        <div className='grid gap-3 md:grid-cols-3'>
          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 150}
              animation='fade-up'
              className='relative rounded-xl border border-stone-300/70 bg-[#fffaf2] p-6 dark:border-white/10 dark:bg-white/[0.035]'
            >
              <div className='mb-6 flex items-start justify-between'>
                <div className='flex size-12 items-center justify-center rounded-lg border border-stone-300/70 bg-[#f1e2d1] text-[#b85f3d] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#f0a27c]'>
                  {step.icon}
                </div>
                <div className='font-mono text-sm text-stone-400 dark:text-stone-500'>
                  {step.num}
                </div>
              </div>
              <h3 className='text-base font-semibold text-stone-950 dark:text-stone-50'>
                {step.title}
              </h3>
              <p className='mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300'>
                {step.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
