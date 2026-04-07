import { Typography } from "@/src/shared/constants/Typography";
import { useThemeContext } from "@/src/shared/context";
import React from "react";
import { Text } from "react-native";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";

type Props = {
  text: string;
  center?: boolean;
  color?: string;
};

const Subtitle: React.FC<Props> = ({ text, center = false, color }) => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  return (
    <Text
      style={{
        fontSize: Typography.body,
        color: color ? color : colors.text,
        textAlign: center ? "center" : "left",
        marginBottom: Spacing.xxl,
      }}
    >
      {text}
    </Text>
  );
};

export default Subtitle;
