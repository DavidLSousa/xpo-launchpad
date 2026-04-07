import { AppColors, Colors } from "@/src/shared/constants/Colors";
import { Spacing } from "@/src/shared/constants/Spacing";
import { Typography } from "@/src/shared/constants/Typography";
import { useI18nContext, useThemeContext } from "@/src/shared/context";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SecondaryButtonProps {
  onPress: () => void;
  title: string;
  isCreateAccount?: boolean;
  textColor?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  onPress,
  title,
  isCreateAccount,
  textColor,
}) => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  const styles = getStyles(colors, textColor);

  const { t } = useI18nContext();

  if (isCreateAccount) {
    return (
      <View style={styles.container}>
        <Text style={styles.noAccountText}>{t("login.noAccount")}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.createText}>{title} →</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.guestButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SecondaryButton;

const getStyles = (colors: AppColors, textColor: string | undefined) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: Spacing.lg,
      marginBottom: Spacing.lg,
    },
    noAccountText: {
      color: colors.gray,
      marginRight: Spacing.sm,
    },
    createText: {
      color: colors.primary,
      fontWeight: Typography.weight_bold,
    },
    guestButtonText: {
      color: textColor ?? colors.text,
      fontSize: Typography.body,
      fontWeight: Typography.weight_bold,
    },
  });
