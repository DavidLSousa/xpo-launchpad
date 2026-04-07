import { Colors } from "@/src/shared/constants";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  View,
  ViewProps,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useThemeContext } from "../context/useThemeContext";

interface BasePageProps extends ViewProps {
  children: React.ReactNode;
  scrollable?: boolean;
  contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
  /** Space buffer usually needed when using an absolute bottom tab bar. Default is padding based on safe area. */
  withBottomInset?: boolean;
  spacingBottom?: number;
  /** Space buffer needed for absolute headers. Disables the 'top' Safe Area edge. */
  withTopInset?: boolean;
  absoluteHeader?: boolean;
}

export default function BasePage({
  children,
  scrollable = false,
  contentContainerStyle,
  withBottomInset = false,
  spacingBottom = 85,
  withTopInset = false,
  absoluteHeader = false,
  style,
  ...props
}: BasePageProps) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();

  const innerContent = (
    <View
      style={[
        {
          flexDirection: "column",
          flex: 1, // Fixes empty layout collapse when using absolute fill
          paddingBottom: withBottomInset ? insets.bottom + spacingBottom : 0,
          paddingTop: withTopInset ? 80 : 0,
        },
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!scrollable) {
    return (
      <View style={[{ backgroundColor: colors.background, flex: 1 }, style]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <SafeAreaView
            style={{ flex: 1 }}
            edges={
              absoluteHeader || withTopInset
                ? ["left", "right"]
                : ["top", "left", "right"]
            }
          >
            {innerContent}
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <View style={[{ backgroundColor: colors.background, flex: 1 }, style]}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]} // Needs flexGrow to measure inside native ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        {...props}
      >
        <SafeAreaView
          style={{ flex: 1 }}
          edges={
            absoluteHeader || withTopInset
              ? ["left", "right"]
              : ["top", "left", "right"]
          }
        >
          {innerContent}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
