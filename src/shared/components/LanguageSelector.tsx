import {
  AppColors,
  BorderRadius,
  Colors,
  Spacing,
  Typography,
} from "@/src/shared/constants";
import { useI18nContext, useThemeContext } from "@/src/shared/context";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

type Props = {
  language: string;
  customStyle?: any;
  customText?: string;
};

export default function LanguageSelector({ language }: Props) {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const s = getStyles(colors);

  const { languages, setLocale } = useI18nContext();

  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelectLanguage = (langCode: string) => {
    setLocale(langCode);
    setModalVisible(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === language);
  if (!currentLanguage) {
    return null;
  }

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={s.trigger}>
        <Image source={currentLanguage.flag} style={s.flag} />
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.6}
        style={s.modal}
        propagateSwipe={true}
        swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}
      >
        <View style={s.modalContent}>
          <View style={s.handle} />
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={s.option}
              onPress={() => handleSelectLanguage(lang.code)}
            >
              <Image source={lang.flag} style={s.flag} />
              <Text style={s.optionText}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </>
  );
}

const getStyles = (colors: AppColors) =>
  StyleSheet.create({
    trigger: {
      marginLeft: Spacing.lg,
    },
    flag: {
      width: 30,
      height: 30,
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: colors.background,
      padding: Spacing.xl,
      paddingBottom: Spacing.xxxxl,
      borderTopRightRadius: BorderRadius.lg,
      borderTopLeftRadius: BorderRadius.lg,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: Spacing.lg,
    },
    optionText: {
      color: colors.text,
      fontSize: Typography.h6,
      marginLeft: Spacing.sm,
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
