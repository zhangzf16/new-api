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
import { useTranslation } from 'react-i18next'

interface StatsProps {
  className?: string
}

export function Stats(_props: StatsProps) {
  const { t } = useTranslation()

  const stats = [
    { value: '50+', label: t('upstream services integrated') },
    { value: '100+', label: t('model families supported') },
    { value: '50+', label: t('compatible API routes') },
    { value: '10+', label: t('scheduling controls') },
  ]

  return (
    <section className='border-y border-stone-300/70 bg-[#f7f2ea] px-5 dark:border-white/10 dark:bg-[#141210]'>
      <div className='mx-auto grid max-w-6xl grid-cols-2 gap-px bg-stone-300/70 md:grid-cols-4 dark:bg-white/10'>
        {stats.map((stat) => (
          <div
            key={stat.label}
            className='bg-[#f7f2ea] px-4 py-6 text-center md:py-8 dark:bg-[#141210]'
          >
            <div className='font-mono text-2xl font-semibold text-stone-950 md:text-3xl dark:text-stone-50'>
              {stat.value}
            </div>
            <div className='mt-2 text-xs leading-5 text-stone-500 dark:text-stone-400'>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
