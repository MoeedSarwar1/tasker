import React, { forwardRef, useMemo } from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../Text';

interface ReusableBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[]; // e.g. ['25%', '50%']
  initialIndex?: number; // default = -1 (closed)
  onClose?: () => void;
  title?: string;
  subtitle?: string;
}

const CustomBottomSheet = forwardRef<BottomSheet, ReusableBottomSheetProps>(
  (
    {
      children,
      snapPoints = ['50%'],
      initialIndex = -1,
      onClose,
      title,
      subtitle,
    },
    ref,
  ) => {
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);
    const insets = useSafeAreaInsets();

    return (
      <Portal>
        <BottomSheet
          ref={ref}
          index={initialIndex}
          snapPoints={memoizedSnapPoints}
          enablePanDownToClose
          onClose={onClose}
          keyboardBehavior="interactive"
          style={styles.bottomshhetContainer}
          keyboardBlurBehavior="restore"
          backdropComponent={backdropProps => (
            <BottomSheetBackdrop
              {...backdropProps}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
              opacity={0.5}
            />
          )}
        >
          <BottomSheetView
            style={[styles.container, { paddingBottom: insets.bottom }]}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
              <View style={styles.parentView}>
                <Text style={styles.title}>{title}</Text>

                <View style={styles.separator} />
                {children}
              </View>
            </KeyboardAvoidingView>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  },
);

export default CustomBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomshhetContainer: {
    backgroundColor: '#F9fafb',
    borderRadius: 16,
  },
  parentView: {
    marginHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB', // light gray line
    marginVertical: 8, // spacing above & below
    alignSelf: 'stretch',
  },
});
