import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, Animated, View } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Colors, Spacing, Typography } from "@/src/shared/constants";
import { useI18nContext, useThemeContext } from "@/src/shared/context";
import { WifiOff } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const OfflineBanner: React.FC = () => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const { t } = useI18nContext();
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isConnected can be null, we treat that as "connecting" (not definitely offline)
      const offline = state.isConnected === false;

      Animated.timing(translateY, {
        toValue: offline ? 0 : -100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => unsubscribe();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: colors.expense,
          transform: [{ translateY }],
          paddingTop: insets.top,
        },
      ]}
    >
      <View style={styles.content}>
        <WifiOff size={16} color="#FFFFFF" />
        <Text style={styles.text}>{t("common.offline")}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    paddingBottom: Spacing.xs,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
  },
  text: {
    color: "#FFFFFF",
    fontSize: Typography.p,
    fontWeight: "600",
  },
});

export default OfflineBanner;
