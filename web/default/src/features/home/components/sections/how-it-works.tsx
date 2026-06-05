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
  ExternalLink,
  Globe,
  KeyRound,
  Link2,
  Sparkles,
  Terminal,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CopyButton } from '@/components/copy-button'
import { AnimateInView } from '@/components/animate-in-view'
import { Button } from '@/components/ui/button'

interface HowItWorksProps {
  brandName: string
}

export function HowItWorks(props: HowItWorksProps) {
  const { t } = useTranslation()
  const setupCards = [
    {
      title: 'Claude Code',
      command: 'npm i -g @anthropic-ai/claude-code@latest',
      href: 'https://docs.anthropic.com/en/docs/claude-code/setup',
    },
    {
      title: 'Codex',
      command: 'npm i -g @openai/codex@latest',
      href: 'https://developers.openai.com/codex/cli',
    },
  ]

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
        <AnimateInView
          className='mb-16 grid gap-10 md:mb-20 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-end'
          animation='fade-up'
        >
          <div className='max-w-xl'>
            <p className='text-xs font-medium tracking-widest text-[#b85f3d] uppercase dark:text-[#f0a27c]'>
              {t('CLI quick start')}
            </p>
            <h3 className='mt-3 text-3xl font-semibold tracking-normal text-stone-950 md:text-4xl dark:text-stone-50'>
              {t('Install your coding tools first.')}
            </h3>
            <p className='mt-4 text-sm leading-7 text-stone-600 md:text-base dark:text-stone-300'>
              {t(
                'Install Claude Code or Codex locally, then use CC Switch to import {{name}} with a ready-to-use provider profile.',
                { name: props.brandName }
              )}
            </p>

            <div className='mt-6 flex flex-wrap gap-3'>
              <Button
                variant='outline'
                className='h-10 rounded-lg border-stone-300/70 bg-white/55 px-4 text-sm text-stone-800 shadow-xs hover:bg-white/85 dark:border-white/10 dark:bg-white/[0.04] dark:text-stone-100 dark:hover:bg-white/[0.08]'
                render={
                  <a
                    href='https://ccswitch.io'
                    target='_blank'
                    rel='noopener noreferrer'
                  />
                }
              >
                <Globe className='size-4' />
                {t('CC Switch official site')}
                <ExternalLink className='size-4' />
              </Button>
            </div>
          </div>

          <div className='grid gap-3 md:grid-cols-2'>
            {setupCards.map((card, index) => (
              <AnimateInView
                key={card.title}
                delay={index * 120}
                animation='fade-up'
                className='rounded-xl border border-stone-300/70 bg-[#fffaf2] p-5 shadow-[0_18px_50px_-42px_rgba(78,52,31,0.8)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-[0_20px_60px_-42px_rgba(0,0,0,0.9)]'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div className='min-w-0'>
                    <div className='flex size-11 items-center justify-center rounded-lg border border-stone-300/70 bg-[#f1e2d1] text-[#b85f3d] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#f0a27c]'>
                      <Terminal className='size-5' strokeWidth={1.5} />
                    </div>
                    <h3 className='mt-4 text-lg font-semibold text-stone-950 dark:text-stone-50'>
                      {card.title}
                    </h3>
                  </div>

                  <Button
                    variant='ghost'
                    size='sm'
                    className='h-8 rounded-lg px-2 text-stone-600 hover:bg-stone-950/5 hover:text-stone-950 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-stone-50'
                    render={
                      <a
                        href={card.href}
                        target='_blank'
                        rel='noopener noreferrer'
                      />
                    }
                  >
                    {t('Official documentation')}
                    <ExternalLink className='size-4' />
                  </Button>
                </div>

                <div className='mt-5 rounded-lg border border-stone-300/70 bg-stone-950 px-3 py-3 dark:border-white/10 dark:bg-black/35'>
                  <div className='flex items-center gap-3'>
                    <code className='min-w-0 flex-1 overflow-x-auto font-mono text-[12px] leading-6 whitespace-nowrap text-stone-100 md:text-[13px]'>
                      {card.command}
                    </code>
                    <CopyButton
                      value={card.command}
                      variant='ghost'
                      tooltip={t('Copy install command')}
                      successTooltip={t('Copied!')}
                      className='size-8 rounded-md text-stone-300 hover:bg-white/10 hover:text-white'
                      iconClassName='size-4'
                      aria-label={t('Copy install command')}
                    />
                  </div>
                </div>
              </AnimateInView>
            ))}
          </div>
        </AnimateInView>

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
