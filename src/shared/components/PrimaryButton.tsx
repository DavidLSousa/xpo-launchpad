import {
  AppColors,
  BorderRadius,
  Colors,
  Opacities,
  Shadows,
  Spacing,
  Typography,
} from "@/src/shared/constants";
import { useThemeContext } from "@/src/shared/context";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  disabled?: boolean;
  backgroundColor?: string;
  marginH?: number;
  loading?: boolean;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  title,
  disabled,
  backgroundColor,
  marginH,
  loading,
}) => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  const styles = getStyles(colors, marginH);

  const gradientColors = backgroundColor
    ? ([backgroundColor, backgroundColor] as const)
    : colors.gradient;

  const isButtonDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={{
        opacity: isButtonDisabled ? Opacities.disabled : Opacities.enabled,
      }}
      activeOpacity={Opacities.active}
      onPress={onPress}
      disabled={isButtonDisabled}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const getStyles = (colors: AppColors, marginH: number | undefined) =>
  StyleSheet.create({
    button: {
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.md,
      borderRadius: BorderRadius.full,
      alignItems: "center",
      marginBottom: Spacing.sm,
      marginHorizontal: marginH ? marginH : 0,
      ...Shadows.md,
    },
    buttonText: {
      color: colors.white,
      fontSize: Typography.body,
      fontWeight: Typography.weight_bold,
    },
  });
