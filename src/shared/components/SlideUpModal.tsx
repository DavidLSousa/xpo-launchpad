import {
  AppColors,
  BorderRadius,
  Colors,
  Spacing,
} from "@/src/shared/constants";
import { useThemeContext } from "@/src/shared/context";
import React from "react";
import { StyleSheet, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  /** Pass scrollTo/scrollOffset/scrollOffsetMax for scrollable content (e.g. FiltersModal) */
  scrollTo?: (ref: any) => void;
  scrollOffset?: number;
  scrollOffsetMax?: number;
  /** Hide the drag handle at the top */
  hideHandle?: boolean;
  /** Callback when modal is completely hidden */
  onModalHide?: () => void;
};

export default function SlideUpModal({
  isVisible,
  onClose,
  children,
  scrollTo,
  scrollOffset,
  scrollOffsetMax,
  hideHandle = false,
  onModalHide,
}: Props) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const s = getStyles(colors);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropOpacity={0.6}
      style={s.modal}
      propagateSwipe
      swipeDirection="down"
      onSwipeComplete={onClose}
      scrollTo={scrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={scrollOffsetMax}
      onModalHide={onModalHide}
    >
      <View style={s.content}>
        {!hideHandle && <View style={s.handle} />}
        {children}
      </View>
    </Modal>
  );
}

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    content: {
      backgroundColor: colors.background,
      padding: Spacing.xl,
      paddingBottom: Spacing.xxxxl,
      borderTopLeftRadius: BorderRadius.lg,
      borderTopRightRadius: BorderRadius.lg,
    },
    handle: {
      width: 40,
      height: 4,
      borderRadius: BorderRadius.sm,
      backgroundColor: colors.inputBackgroundDark,
      alignSelf: "center",
      marginBottom: Spacing.sm,
    },
  });
