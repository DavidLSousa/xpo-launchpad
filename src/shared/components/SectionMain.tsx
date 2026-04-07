import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { Spacing } from '../constants';

export type SectionMainProps = {
  children: ReactNode;
};

export default function SectionMain({ children }: SectionMainProps) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: Spacing.sm,
      }}
    >
      {children}
    </View>
  );
}
