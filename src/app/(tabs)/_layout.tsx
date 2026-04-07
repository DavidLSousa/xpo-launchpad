import { IconSymbol } from '@/src/shared/components';
import { Colors } from '@/src/shared/constants';
import { useI18nContext, useThemeContext } from '@/src/shared/context';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import { Icon, Label, NativeTabs, NativeTabTrigger } from 'expo-router/unstable-native-tabs';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

export default function TabLayout() {
  const { theme } = useThemeContext();
  const colors = Colors[theme];
  const { t } = useI18nContext();

  if (Platform.OS === 'ios') {
    return (
      <NativeTabs tintColor={colors.tertiary} backgroundColor={colors.inputBackground}>
        <NativeTabTrigger name="home">
          <Icon sf="house" />
          <Label>{t('pages.home')}</Label>
        </NativeTabTrigger>

        <NativeTabTrigger name="more">
          <Icon sf="ellipsis.circle" />
          <Label>{t('pages.more')}</Label>
        </NativeTabTrigger>
      </NativeTabs>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarBackground: () => (
          <BlurView
            tint={theme === 'dark' ? 'dark' : 'light'}
            intensity={80}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarActiveTintColor: colors.tertiary,
        tabBarInactiveTintColor: colors.gray,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('pages.home'),
          tabBarIcon: ({ color }) => <IconSymbol name="house" size={18} color={color} />,
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: t('pages.more'),
          tabBarIcon: ({ color }) => <IconSymbol name="ellipsis.circle" size={18} color={color} />,
        }}
      />
    </Tabs>
  );
}
