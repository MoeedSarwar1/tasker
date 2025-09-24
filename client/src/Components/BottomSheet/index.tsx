import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { forwardRef, useMemo, useCallback } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/Theme-context';
import Text from '../Text';
import { ReusableBottomSheetProps } from './interface';
import { bottomSheetStyles } from './styles';

const CustomBottomSheet = forwardRef<BottomSheet, ReusableBottomSheetProps>(
  (
    { children, snapPoints = ['50%'], initialIndex = -1, onClose, title },
    ref,
  ) => {
    const { theme } = useTheme();
    const styles = bottomSheetStyles(theme);
    const insets = useSafeAreaInsets();
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    // Handle sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1 && onClose) {
          onClose();
        }
      },
      [onClose],
    );

    return (
      <Portal>
        <BottomSheet
          ref={ref}
          index={initialIndex}
          snapPoints={memoizedSnapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
          backgroundStyle={{ backgroundColor: theme.colors.cardBackground }}
          keyboardBehavior="interactive"
          handleStyle={{
            backgroundColor: theme.colors.cardBackground,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
          handleIndicatorStyle={{
            backgroundColor: theme.colors.primaryIcon || theme.colors.textColor,
            width: 40,
            height: 4,
            marginTop: 8,
          }}
          keyboardBlurBehavior="restore"
          // Android-specific scroll fixes
          enableContentPanningGesture={true} // Enable for Android
          enableHandlePanningGesture={true}
          activeOffsetY={[-10, 10]} // Increased threshold for Android
          failOffsetX={[-5, 5]}
          android_keyboardInputMode="adjustResize" // Important for Android
          backdropComponent={props => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              pressBehavior="close"
              opacity={0.5}
            />
          )}
        >
          <BottomSheetView style={{ flex: 1 }}>
            {/* Fixed Header */}
            {title && (
              <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.separator} />
              </View>
            )}

            {/* Scrollable Content */}
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: insets.bottom + 20,
                flexGrow: 1,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={true}
              // These props prevent auto-scroll to top
              maintainVisibleContentPosition={{
                minIndexForVisible: 0,
                autoscrollToTopThreshold: 10,
              }}
              scrollEventThrottle={16}
            >
              {children}
            </BottomSheetScrollView>
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    );
  },
);

export default CustomBottomSheet;
