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
import * as z from 'zod'
import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import {
  DEFAULT_ADMIN_VISUAL_THEME,
  normalizeAdminThemeMode,
  normalizeThemeFont,
  normalizeThemePreset,
  normalizeThemeRadius,
  normalizeThemeScale,
} from '@/lib/admin-theme-config'
import { THEME_PRESETS } from '@/lib/theme-customization'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormDirtyIndicator } from '../components/form-dirty-indicator'
import { FormNavigationGuard } from '../components/form-navigation-guard'
import {
  SettingsForm,
  SettingsFormGrid,
} from '../components/settings-form-layout'
import { SettingsPageFormActions } from '../components/settings-page-context'
import { SettingsSection } from '../components/settings-section'
import { useSettingsForm } from '../hooks/use-settings-form'
import { useUpdateOption } from '../hooks/use-update-option'

const visualThemeSchema = z.object({
  theme: z.object({
    mode: z.enum(['system', 'light', 'dark']),
    preset: z.enum([
      'default',
      'anthropic',
      'simple-large',
      'underground',
      'rose-garden',
      'lake-view',
      'sunset-glow',
      'forest-whisper',
      'ocean-breeze',
      'lavender-dream',
    ]),
    font: z.enum(['default', 'sans', 'serif']),
    radius: z.enum(['default', 'none', 'sm', 'md', 'lg', 'xl']),
    scale: z.enum(['default', 'sm', 'lg', 'xl']),
  }),
})

export type VisualThemeFormValues = {
  theme: {
    mode?: string
    preset?: string
    font?: string
    radius?: string
    scale?: string
  }
}

type NormalizedVisualThemeFormValues = z.infer<typeof visualThemeSchema>

type AdminVisualThemeSectionProps = {
  defaultValues: VisualThemeFormValues
}

const modeOptions = [
  { value: 'system', labelKey: 'System' },
  { value: 'light', labelKey: 'Light' },
  { value: 'dark', labelKey: 'Dark' },
] as const

const fontOptions = [
  { value: 'default', labelKey: 'Auto' },
  { value: 'sans', labelKey: 'Sans' },
  { value: 'serif', labelKey: 'Serif' },
] as const

const radiusOptions = [
  { value: 'default', labelKey: 'Auto' },
  { value: 'none', labelKey: 'None' },
  { value: 'sm', labelKey: 'Small' },
  { value: 'md', labelKey: 'Medium' },
  { value: 'lg', labelKey: 'Large' },
  { value: 'xl', labelKey: 'Extra large' },
] as const

const scaleOptions = [
  { value: 'default', labelKey: 'Default' },
  { value: 'sm', labelKey: 'Compact' },
  { value: 'lg', labelKey: 'Comfortable' },
  { value: 'xl', labelKey: 'Super Large' },
] as const

export function normalizeVisualThemeFormValues(
  values: VisualThemeFormValues
): NormalizedVisualThemeFormValues {
  return {
    theme: {
      mode: normalizeAdminThemeMode(values.theme?.mode),
      preset: normalizeThemePreset(values.theme?.preset),
      font: normalizeThemeFont(values.theme?.font),
      radius: normalizeThemeRadius(values.theme?.radius),
      scale: normalizeThemeScale(values.theme?.scale),
    },
  }
}

export function AdminVisualThemeSection({
  defaultValues,
}: AdminVisualThemeSectionProps) {
  const { t } = useTranslation()
  const updateOption = useUpdateOption()
  const normalizedDefaults = normalizeVisualThemeFormValues(defaultValues)

  const { form, handleSubmit, handleReset, isDirty, isSubmitting } =
    useSettingsForm<NormalizedVisualThemeFormValues>({
      resolver: zodResolver(visualThemeSchema) as Resolver<
        NormalizedVisualThemeFormValues,
        unknown,
        NormalizedVisualThemeFormValues
      >,
      defaultValues: normalizedDefaults,
      onSubmit: async (_data, changedFields) => {
        for (const [key, value] of Object.entries(changedFields)) {
          await updateOption.mutateAsync({
            key,
            value: String(value ?? ''),
          })
        }
      },
    })

  return (
    <>
      <FormNavigationGuard when={isDirty} />

      <SettingsSection title={t('Visual theme')}>
        <Form {...form}>
          <SettingsForm onSubmit={handleSubmit}>
            <SettingsPageFormActions
              onSave={handleSubmit}
              onReset={handleReset}
              isSaving={isSubmitting || updateOption.isPending}
              isResetDisabled={!isDirty}
            />
            <FormDirtyIndicator isDirty={isDirty} />
            <SettingsFormGrid>
              <FormField
                control={form.control}
                name='theme.mode'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Theme')}</FormLabel>
                    <Select
                      items={modeOptions.map((option) => ({
                        value: option.value,
                        label: t(option.labelKey),
                      }))}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {modeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {t(option.labelKey)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('Controls light, dark, or system theme for all users.')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='theme.preset'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Color preset')}</FormLabel>
                    <Select
                      items={THEME_PRESETS.map((preset) => ({
                        value: preset.value,
                        label: t(`preset.${preset.value}`),
                      }))}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {THEME_PRESETS.map((preset) => (
                            <SelectItem key={preset.value} value={preset.value}>
                              {t(`preset.${preset.value}`)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('Controls the color palette for all users.')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='theme.font'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Font')}</FormLabel>
                    <Select
                      items={fontOptions.map((option) => ({
                        value: option.value,
                        label: t(option.labelKey),
                      }))}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {fontOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {t(option.labelKey)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('Controls the body font for all users.')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='theme.radius'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Border radius')}</FormLabel>
                    <Select
                      items={radiusOptions.map((option) => ({
                        value: option.value,
                        label: t(option.labelKey),
                      }))}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {radiusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {t(option.labelKey)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('Controls corner roundness for all users.')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='theme.scale'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Density')}</FormLabel>
                    <Select
                      items={scaleOptions.map((option) => ({
                        value: option.value,
                        label: t(option.labelKey),
                      }))}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className='w-full'>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent alignItemWithTrigger={false}>
                        <SelectGroup>
                          {scaleOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {t(option.labelKey)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      {t('Controls interface density for all users.')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </SettingsFormGrid>
          </SettingsForm>
        </Form>
      </SettingsSection>
    </>
  )
}

export const defaultVisualThemeFormValues: NormalizedVisualThemeFormValues = {
  theme: { ...DEFAULT_ADMIN_VISUAL_THEME },
}
