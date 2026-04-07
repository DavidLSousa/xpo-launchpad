import BasePage from '@/src/shared/components/BasePage';
import Footer from '@/src/shared/components/Footer';
import Header from '@/src/shared/components/Header';
import Title from '@/src/shared/components/Title';
import { AppColors, Colors } from '@/src/shared/constants/Colors';
import { Spacing } from '@/src/shared/constants/Spacing';
import { Typography } from '@/src/shared/constants/Typography';
import { useI18nContext, useThemeContext } from '@/src/shared/context';
import { StyleSheet, Text, View } from 'react-native';

export default function MoreScreen() {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const { t } = useI18nContext();
  const s = styles(colors);

  return (
    <BasePage style={s.safeArea} withBottomInset>
      <Header showLogo />

      <View style={s.mainContent}>
        <Title text={t("pages.more")} />
        <Text style={s.text}>{t("pages.moreDescription")}</Text>
      </View>

      <Footer>
        <View />
      </Footer>
    </BasePage>
  );
}

const styles = (colors: AppColors) => StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  mainContent: { flex: 1, paddingHorizontal: Spacing.xl },
  text: {
    color: colors.text,
    fontSize: Typography.body,
    marginTop: Spacing.md,
  },
});
