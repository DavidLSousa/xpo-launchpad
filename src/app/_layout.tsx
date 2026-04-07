import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryProvider } from '@/src/shared/context/QueryProvider';
// import { AuthProvider } from '@/src/modules/auth/context/AuthContext';
import { ThemeProvider } from '@/src/shared/context/useThemeContext';
import { I18nProvider } from '@/src/shared/context/I18nProvider';
import ErrorBoundary from '@/src/shared/components/ErrorBoundary';
import OfflineBanner from '@/src/shared/components/OfflineBanner';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        {/* <AuthProvider> */}
        <ThemeProvider>
          <ErrorBoundary>
            <I18nProvider>
              <OfflineBanner />
              <Stack screenOptions={{ headerShown: false }} />
            </I18nProvider>
          </ErrorBoundary>
        </ThemeProvider>
        {/* </AuthProvider> */}
      </QueryProvider>
    </SafeAreaProvider>
  );
}
