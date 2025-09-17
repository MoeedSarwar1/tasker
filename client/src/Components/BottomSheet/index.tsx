import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { forwardRef, useMemo } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/Theme-context';
import Text from '../Text';
import { bottomSheetStyles } from './styles';
import { ReusableBottomSheetProps } from './interface';

const CustomBottomSheet = forwardRef<BottomSheet, ReusableBottomSheetProps>(
  (
    { children, snapPoints = ['50%'], initialIndex = -1, onClose, title },
    ref,
  ) => {
    const { theme } = useTheme();
    const styles = bottomSheetStyles(theme);
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
          backgroundStyle={{ backgroundColor: theme.colors.cardBackground }}
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
            <View style={styles.parentView}>
              <Text style={styles.title}>{title}</Text>

              <View style={styles.separator} />

              <KeyboardAvoidingView
                contentContainerStyle={styles.scrollContent}
              >
                {children}
              </KeyboardAvoidingView>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  },
);

export default CustomBottomSheet;
