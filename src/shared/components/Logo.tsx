import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '@/src/shared/constants/Colors';
import { useThemeContext } from '@/src/shared/context/useThemeContext';

const Logo: React.FC = () => {
  const { theme } = useThemeContext();
  const colors = Colors[theme];

  return <Text style={[styles.text, { color: colors.primary }]}>Template</Text>;
};

const styles = StyleSheet.create({
  text: { fontSize: 20, fontWeight: '700' },
});

export default Logo;
