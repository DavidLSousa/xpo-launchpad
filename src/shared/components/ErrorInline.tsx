import { Colors } from "@/src/shared/constants/Colors";
import { Spacing } from "@/src/shared/constants/Spacing";
import { useThemeContext } from "@/src/shared/context";
import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

type ErrorInlineProps = {
  message?: string | null;
  style?: StyleProp<TextStyle>;
};

const ErrorInline: React.FC<ErrorInlineProps> = ({ message, style }) => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  if (!message) return null;

  return (
    <Text
      style={[
        {
          color: colors.expense,
          textAlign: "center",
          marginBottom: Spacing.lg,
        },
        style,
      ]}
    >
      {message}
    </Text>
  );
};

export default ErrorInline;
