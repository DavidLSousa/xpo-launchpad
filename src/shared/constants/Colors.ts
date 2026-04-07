export interface AppColors {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  tertiary: string;
  inputBackground: string;
  inputBackgroundDark: string;
  inputPlaceholder: string;
  white: string;
  gray: string;
  grayLight: string;
  card: string;
  expense: string;
  icon: string;
  divider: string;
  gradient: readonly [string, string, ...string[]];

  green: string;
  red: string;
  yellow: string;
  orange: string;
  blue: string;
  purple: string;
}

export const Colors = {
  light: {
    background: '#F5F5F5',
    text: '#111417',
    primary: '#00BCD4',
    secondary: '#3498DB',
    tertiary: '#9B59B6',
    inputBackground: '#F1F3F5',
    inputBackgroundDark: '#E0E3E6',
    inputPlaceholder: '#6B737A',
    white: '#FFFFFF',
    gray: '#6B737A',
    grayLight: '#C5C9CC',
    card: '#FFFFFF',
    expense: '#E57373',
    icon: '#6B737A',
    divider: '#E8EBEE',
    gradient: ['#00BCD4', '#3498DB', '#9B59B6'] as const,

    green: '#34C759',
    red: '#FF3B30',
    yellow: '#FF9500',
    orange: '#FF9500',
    blue: '#007AFF',
    purple: '#AF52DE',
  } as AppColors,
  dark: {
    background: '#111417',
    text: '#F5F5F5',
    primary: '#3498DB',
    secondary: '#00BCD4',
    tertiary: '#9B59B6',
    inputBackground: '#1E2226',
    inputBackgroundDark: '#171A1D',
    inputPlaceholder: '#9BA1A6',
    white: '#FFFFFF',
    gray: '#9BA1A6',
    grayLight: '#555B60',
    card: '#1C1F22',
    expense: '#EF9A9A',
    icon: '#9BA1A6',
    divider: '#22262A',
    gradient: ['#00BCD4', '#3498DB', '#9B59B6'] as const,

    green: '#34C759',
    red: '#FF3B30',
    yellow: '#FF9500',
    orange: '#FF9500',
    blue: '#007AFF',
    purple: '#AF52DE',
  } as AppColors,
};
