import { BorderRadius, Colors, Spacing } from "@/src/shared/constants";
import { useThemeContext } from "@/src/shared/context";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

interface GradientBorderProps {
  children: React.ReactNode;
  padding?: number;
  borderRadius?: number;
  marginBottom?: number;
  colors?: readonly [string, string, ...string[]];
  style?: StyleProp<ViewStyle>;
}

export default function GradientBorder({
  children,
  padding = 1,
  borderRadius = BorderRadius.lg,
  marginBottom = Spacing.lg,
  colors: customColors,
  style,
}: GradientBorderProps) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  return (
    <LinearGradient
      colors={customColors || colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        {
          padding,
          borderRadius,
          marginBottom,
        },
        style,
      ]}
    >
      {children}
    </LinearGradient>
  );
}
