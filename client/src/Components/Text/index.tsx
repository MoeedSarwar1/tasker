import React from 'react';
import { Text as AppText, TextProps, StyleSheet } from 'react-native';

type AppTextProps = TextProps & {
  children: React.ReactNode;
};

const Text = ({ children, style, ...props }: AppTextProps) => {
  return (
    <AppText {...props} style={[styles.defaultText, style]}>
      {children}
    </AppText>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Poppins-Regular', // <-- change font here
    fontSize: 16,
    color: '#000',
  },
});

export default Text;
