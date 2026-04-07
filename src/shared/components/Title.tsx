import { Typography } from "@/src/shared/constants/Typography";
import { useThemeContext } from "@/src/shared/context";
import React from "react";
import { Text } from "react-native";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";

type TitleProps = {
  text: string;
  center?: boolean;
  color?: string;
};

const Title: React.FC<TitleProps> = ({ text, center = false, color }) => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  return (
    <Text
      style={{
        fontSize: Typography.h5,
        fontWeight: Typography.weight_bold,
        color: color ? color : colors.text,
        alignSelf: center ? "center" : "flex-start",
        marginTop: Spacing.md,
        marginBottom: Spacing.xxl,
      }}
    >
      {text}
    </Text>
  );
};

export default Title;
