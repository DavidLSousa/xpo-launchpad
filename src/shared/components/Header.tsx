import { useAuthContext } from "@/src/modules/auth";
import { useCompanyContext } from "@/src/modules/companies";
import { Company } from "@/src/modules/companies/service/types";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ChevronDown, ChevronLeft } from "lucide-react-native";
import React, { ReactNode, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";
import { Typography } from "../constants/Typography";
import { useI18nContext, useThemeContext } from "@/src/shared/context";
import LanguageSelector from "./LanguageSelector";
import Logo from "./Logo";

export type HeaderProps = {
  title?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showLanguageSelector?: boolean;
  flexStart?: boolean;
  onBackPress?: () => void;
  rightElement?: ReactNode;
  transparent?: boolean;
  absolute?: boolean;
  showCompanySelect?: boolean;
};

export default function Header({
  title,
  showBackButton,
  showLogo = false,
  showLanguageSelector = false,
  flexStart = false,
  onBackPress,
  rightElement,
  transparent = true,
  absolute = false,
  showCompanySelect = false,
}: HeaderProps) {
  const { locale } = useI18nContext();
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const colors = Colors[theme];


  const topPadding = absolute ? insets.top : Math.max(Spacing.lg);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <>
      <StatusBar
        style={theme === "light" ? "dark" : "light"}
        translucent={transparent}
        backgroundColor={transparent ? "transparent" : colors.background}
      />
      <View
        style={[
          styles.wrapper,
          { backgroundColor: transparent ? "transparent" : colors.background },
          absolute && styles.wrapperAbsolute,
        ]}
      >
        <View
          style={[
            styles.container,
            {
              paddingTop: topPadding + Spacing.sm,
              paddingLeft: insets.left + Spacing.xl,
              paddingRight: insets.right + Spacing.xl,
            },
          ]}
        >
          <View style={[styles.sideContainer, flexStart && { flex: 5 }]}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBack}
                hitSlop={{
                  top: Spacing.md,
                  bottom: Spacing.md,
                  left: Spacing.md,
                  right: Spacing.md,
                }}
                style={styles.backButton}
              >
                <ChevronLeft size={28} color={colors.text} />
              </TouchableOpacity>
            )}
            {showLogo && flexStart && (
              <View style={{ marginTop: Spacing.xl }}>
                <Logo />
              </View>
            )}
          </View>

          <View style={styles.rightContainer}>
            {showLanguageSelector && <LanguageSelector language={locale} />}
            {rightElement}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    zIndex: 100,
  },
  wrapperAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: Spacing.maxWidth,
    paddingBottom: Spacing.md,
  },
  sideContainer: {
    flex: 1,
    justifyContent: "center",
    minWidth: 50,
    marginRight: Spacing.md,
  },
  rightContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
    minWidth: 72,
    marginLeft: Spacing.sm,
  },
  centerContainer: {
    flex: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    alignItems: "flex-start",
  },
  title: {
    fontSize: Typography.h6,
    fontWeight: "600",
    textAlign: "center",
  },
  companySelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "60%",
  },
  optionItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    textAlign: "center",
  },
});
