import React, { ReactNode } from 'react';
import { Platform, View } from 'react-native';
import { Spacing } from '../constants';

export type FooterProps = {
  children: ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    <View
      style={[
        Platform.OS === 'ios'
          ? Spacing.absoluteBottomTabBarIOS
          : Spacing.absoluteBottomTabBarAndroid,
        {
          paddingHorizontal: Spacing.sm,
        },
      ]}
    >
      {children}
    </View>
  );
}
