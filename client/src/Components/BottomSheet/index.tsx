import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { forwardRef, useMemo, useCallback } from 'react';
import { View, Keyboard, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/Theme-context';
import Text from '../Text';
import { ReusableBottomSheetProps } from './interface';
import { bottomSheetStyles } from './styles';

const CustomBottomSheet = forwardRef<BottomSheet, ReusableBottomSheetProps>(
  (
    {
      children,
      snapPoints = ['50%'],
      initialIndex = -1,
      onClose,
      title,
      enableDynamicSizing = false, // Add this prop for dynamic content
    },
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

    // Dismiss keyboard when sheet starts moving
    const handleAnimate = useCallback((fromIndex: number, toIndex: number) => {
      if (Platform.OS === 'android' && fromIndex !== toIndex) {
        Keyboard.dismiss();
      }
    }, []);

    return (
      <Portal>
        <BottomSheet
          ref={ref}
          index={initialIndex}
          snapPoints={memoizedSnapPoints}
          enablePanDownToClose
          onChange={handleSheetChanges}
          onAnimate={handleAnimate}
          backgroundStyle={{
            backgroundColor: theme.colors.cardBackground,
          }}
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
          // Keyboard behavior fixes
          keyboardBehavior={Platform.OS === 'ios' ? 'interactive' : 'extend'}
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustPan" // Changed from adjustResize
          // Gesture and content sizing
          enableDynamicSizing={enableDynamicSizing}
          enableContentPanningGesture={false} // Disable to prevent conflicts
          enableHandlePanningGesture={true}
          activeOffsetY={[-10, 10]}
          failOffsetX={[-5, 5]}
          // Prevent over-scrolling
          enableOverDrag={false}
          overDragResistanceFactor={0}
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
          <View style={{ flex: 1, maxHeight: '100%' }}>
            {/* Fixed Header */}
            {title && (
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingTop: 8,
                  backgroundColor: theme.colors.cardBackground,
                  zIndex: 1,
                }}
              >
                <Text style={styles.title}>{title}</Text>
                <View style={styles.separator} />
              </View>
            )}

            {/* Scrollable Content */}
            <BottomSheetScrollView
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: insets.bottom + 20,
                minHeight: 1, // Prevent collapsing
              }}
              style={{
                flex: 1,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              bounces={false} // Disable bouncing to prevent snap point issues
              overScrollMode="never" // Android specific
              scrollEventThrottle={16}
              nestedScrollEnabled={true}
              // Remove maintainVisibleContentPosition as it can cause issues
            >
              {children}
            </BottomSheetScrollView>
          </View>
        </BottomSheet>
      </Portal>
    );
  },
);

CustomBottomSheet.displayName = 'CustomBottomSheet';

export default CustomBottomSheet;
