import { AppTheme } from "../../theme/colors";

const tintColorLight = AppTheme.colors.accent;
const tintColorDark = AppTheme.colors.accentContrast;
const primary = AppTheme.colors.accent;
const secondary = AppTheme.colors.surface;
export const Colors = {
  light: {
    text: AppTheme.colors.textPrimary,
    background: AppTheme.colors.background,
    tint: tintColorLight,
    icon: AppTheme.colors.textSecondary,
    tabIconDefault: AppTheme.colors.textSecondary,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: AppTheme.colors.accentContrast,
    background: AppTheme.colors.accent,
    tint: tintColorDark,
    icon: AppTheme.colors.accentMuted,
    tabIconDefault: AppTheme.colors.accentMuted,
    tabIconSelected: tintColorDark,
  },
  PRIMARY: primary,
  SECONDARY: secondary,
};