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
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Features } from '../sections/features'
import { Hero } from '../sections/hero'

vi.mock('@tanstack/react-router', () => ({
  Link: (
    props: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string }
  ) => {
    const anchorProps = { ...props }
    delete (anchorProps as Partial<{ to: string }>).to
    return <a {...anchorProps} href={props.to} />
  },
}))

vi.mock('@/hooks/use-status', () => ({
  useStatus: () => ({ status: { docs_link: 'https://docs.example.com' } }),
}))

vi.mock('@/components/animate-in-view', () => ({
  AnimateInView: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} />
  ),
}))

describe('minimal home layout', () => {
  it('keeps the primary journey focused on one main action and pricing', () => {
    render(
      <Hero brandLogo='/logo.png' brandName='Gateway' isAuthenticated={false} />
    )

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Connect every model through one clean API.',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Start routing models/ })
    ).toHaveAttribute('href', '/sign-up')
    expect(
      screen.getByRole('button', { name: 'View Pricing' })
    ).toHaveAttribute('href', '/pricing')
    expect(
      screen.getByRole('complementary', { name: 'Built for AI developers' })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
  })

  it('presents exactly three essential capabilities', () => {
    render(<Features brandName='Gateway' />)

    expect(screen.getAllByRole('article')).toHaveLength(3)
    expect(
      screen.getByRole('heading', { name: 'Connect once' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Route reliably' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'See every cost' })
    ).toBeInTheDocument()
  })
})
