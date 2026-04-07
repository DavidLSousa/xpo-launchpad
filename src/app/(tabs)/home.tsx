import { SectionMain } from '@/src/shared/components';
import BasePage from '@/src/shared/components/BasePage';
import Footer from '@/src/shared/components/Footer';
import Header from '@/src/shared/components/Header';
import Title from '@/src/shared/components/Title';
import { AppColors, Colors } from '@/src/shared/constants/Colors';
import { Spacing } from '@/src/shared/constants/Spacing';
import { Typography } from '@/src/shared/constants/Typography';
import { useThemeContext } from '@/src/shared/context/useThemeContext';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const s = styles(colors)

  return (
    <BasePage style={s.safeArea} withBottomInset>
      <Header showLogo />

      <SectionMain>
        {/* Princiapl content */}
        <Title text='Template' />
      </SectionMain>

      <Footer>
        <View />
      </Footer>
    </BasePage>
  );
}

const styles = (colors: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  mainContent: { flex: 1, paddingHorizontal: Spacing.xl },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.h2,
    fontWeight: '700',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.body,
  },
});
