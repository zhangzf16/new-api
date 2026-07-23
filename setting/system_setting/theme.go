package system_setting

import "github.com/QuantumNous/new-api/setting/config"

type ThemeSettings struct {
	Mode   string `json:"mode"`
	Preset string `json:"preset"`
	Font   string `json:"font"`
	Radius string `json:"radius"`
	Scale  string `json:"scale"`
}

var themeSettings = ThemeSettings{
	Mode:   "system",
	Preset: "default",
	Font:   "default",
	Radius: "default",
	Scale:  "default",
}

func init() {
	config.GlobalConfig.Register("theme", &themeSettings)
}

func GetThemeSettings() *ThemeSettings {
	return &themeSettings
}

func IsValidThemeMode(value string) bool {
	return value == "system" || value == "light" || value == "dark"
}

func IsValidThemePreset(value string) bool {
	switch value {
	case "default", "anthropic", "simple-large", "underground", "rose-garden", "lake-view", "sunset-glow", "forest-whisper", "ocean-breeze", "lavender-dream":
		return true
	default:
		return false
	}
}

func IsValidThemeFont(value string) bool {
	return value == "default" || value == "sans" || value == "serif"
}

func IsValidThemeRadius(value string) bool {
	return value == "default" || value == "none" || value == "sm" || value == "md" || value == "lg" || value == "xl"
}

func IsValidThemeScale(value string) bool {
	return value == "default" || value == "sm" || value == "lg" || value == "xl"
}
