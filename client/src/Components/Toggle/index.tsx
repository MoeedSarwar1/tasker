import React from 'react';
import { Pressable, View, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ToggleButton = ({
  isToggled = false,
  onToggle,
  // Icon props
  activeIcon = 'toggle-switch',
  inactiveIcon = 'toggle-switch-off',
  iconSize = 24,
  activeIconColor = '#4CAF50',
  inactiveIconColor = '#9E9E9E',
  // Text props
  activeText,
  inactiveText,
  textStyle,
  showText = false,
  // Container styling
  containerStyle,
  buttonStyle,
  disabled = false,
  // Animation
  animated = true,
  // Custom components
  renderActiveIcon,
  renderInactiveIcon,
  // Layout
  iconPosition = 'left', // 'left' | 'right' | 'center'
  spacing = 8,
}) => {
  const animatedValue = React.useRef(
    new Animated.Value(isToggled ? 1 : 0),
  ).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: isToggled ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isToggled, animated]);

  const handlePress = () => {
    if (!disabled && onToggle) {
      onToggle(!isToggled);
    }
  };

  const currentIcon = isToggled ? activeIcon : inactiveIcon;
  const currentIconColor = isToggled ? activeIconColor : inactiveIconColor;
  const currentText = isToggled ? activeText : inactiveText;

  const renderIcon = () => {
    if (renderActiveIcon && isToggled) {
      return renderActiveIcon();
    }
    if (renderInactiveIcon && !isToggled) {
      return renderInactiveIcon();
    }

    return <Icon name={currentIcon} size={iconSize} color={currentIconColor} />;
  };

  const iconComponent = (
    <View style={{ opacity: disabled ? 0.5 : 1 }}>{renderIcon()}</View>
  );

  const textComponent =
    showText && currentText ? (
      <Text
        style={[
          {
            color: currentIconColor,
            fontSize: 16,
            fontWeight: '500',
            opacity: disabled ? 0.5 : 1,
          },
          textStyle,
        ]}
      >
        {currentText}
      </Text>
    ) : null;

  const getFlexDirection = () => {
    if (iconPosition === 'right') return 'row-reverse';
    if (iconPosition === 'center') return 'column';
    return 'row';
  };

  const getSpacingStyle = () => {
    if (!showText || !currentText) return {};

    if (iconPosition === 'center') {
      return { marginVertical: spacing / 2 };
    }
    return iconPosition === 'right'
      ? { marginLeft: spacing }
      : { marginRight: spacing };
  };

  return (
    <View style={[{ opacity: disabled ? 0.6 : 1 }, containerStyle]}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          {
            flexDirection: getFlexDirection(),
            alignItems: 'center',
            justifyContent: 'center',
            padding: 8,
            borderRadius: 8,
            opacity: pressed && !disabled ? 0.7 : 1,
          },
          buttonStyle,
        ]}
        hitSlop={8}
      >
        <View style={getSpacingStyle()}>{iconComponent}</View>
        {textComponent}
      </Pressable>
    </View>
  );
};
