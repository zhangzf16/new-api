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
  DEFAULT_THEME_CUSTOMIZATION,
  type ThemeCustomization,
  type ThemeFont,
  type ThemePreset,
  type ThemeRadius,
  type ThemeScale,
  THEME_FONT_VALUES,
  THEME_PRESET_VALUES,
  THEME_RADIUS_VALUES,
  THEME_SCALE_VALUES,
} from '@/lib/theme-customization'

export type AdminThemeMode = 'system' | 'light' | 'dark'

export type AdminVisualThemeConfig = Pick<
  ThemeCustomization,
  'preset' | 'font' | 'radius' | 'scale'
> & {
  mode: AdminThemeMode
}

export const DEFAULT_ADMIN_VISUAL_THEME: AdminVisualThemeConfig = {
  mode: 'system',
  preset: DEFAULT_THEME_CUSTOMIZATION.preset,
  font: DEFAULT_THEME_CUSTOMIZATION.font,
  radius: DEFAULT_THEME_CUSTOMIZATION.radius,
  scale: DEFAULT_THEME_CUSTOMIZATION.scale,
}

export const ADMIN_THEME_MODE_VALUES = new Set<AdminThemeMode>([
  'system',
  'light',
  'dark',
])

export function normalizeAdminThemeMode(value: unknown): AdminThemeMode {
  return typeof value === 'string' &&
    ADMIN_THEME_MODE_VALUES.has(value as AdminThemeMode)
    ? (value as AdminThemeMode)
    : DEFAULT_ADMIN_VISUAL_THEME.mode
}

export function normalizeThemePreset(value: unknown): ThemePreset {
  return typeof value === 'string' &&
    THEME_PRESET_VALUES.has(value as ThemePreset)
    ? (value as ThemePreset)
    : DEFAULT_ADMIN_VISUAL_THEME.preset
}

export function normalizeThemeFont(value: unknown): ThemeFont {
  return typeof value === 'string' && THEME_FONT_VALUES.has(value as ThemeFont)
    ? (value as ThemeFont)
    : DEFAULT_ADMIN_VISUAL_THEME.font
}

export function normalizeThemeRadius(value: unknown): ThemeRadius {
  return typeof value === 'string' &&
    THEME_RADIUS_VALUES.has(value as ThemeRadius)
    ? (value as ThemeRadius)
    : DEFAULT_ADMIN_VISUAL_THEME.radius
}

export function normalizeThemeScale(value: unknown): ThemeScale {
  return typeof value === 'string' && THEME_SCALE_VALUES.has(value as ThemeScale)
    ? (value as ThemeScale)
    : DEFAULT_ADMIN_VISUAL_THEME.scale
}
