import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator, Modal, View } from 'react-native';
import Button from '../Button';
import Text from '../Text';
import { useTheme } from '../../context/Theme-context';
import { modalStyles } from './styles';
import { SimpleModalProps } from './interface';

const SimpleModal: React.FC<SimpleModalProps> = ({
  visible,
  onCancle,
  title,
  onConfirm,
  description,
  buttonRow = true,
  iconName,
  iconColor,
  children,
  mode = 'success ',
}) => {
  const { theme } = useTheme();
  const styles = modalStyles(theme);

  // 🎨 Mode-based styles
  const getModeStyles = () => {
    switch (mode) {
      case 'success':
        return {
          container: styles.successModalContainer,
          title: styles.successModalHeader,
          description: styles.successModalText,
          defaultIconColor: theme.colors.modals.successIcon,
        };
      case 'confirmation':
        return {
          container: styles.confirmModalContainer,
          title: styles.confirmModalHeader,
          description: styles.confirmModalText,
          defaultIconColor: theme.colors.modals.confirmationIcon,
        };
      case 'error':
        return {
          container: styles.errorModalContainer,
          title: styles.errorModalHeader,
          description: styles.errorModalText,
          defaultIconColor: theme.colors.modals.errorIcon,
        };
      default:
        return {
          container: styles.modalContainer,
          title: styles.modalHeader,
          description: styles.modalText,
          defaultIconColor: theme.colors.primaryIcon,
        };
    }
  };

  const {
    container,
    title: titleStyle,
    description: descriptionStyle,
    defaultIconColor,
  } = getModeStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancle} // for Android back button
    >
      <View style={styles.overlay}>
        <View style={container}>
          {iconName && (
            <Icon
              name={iconName}
              size={64}
              color={iconColor || defaultIconColor}
            />
          )}

          {title && <Text style={titleStyle}>{title}</Text>}
          {description && <Text style={descriptionStyle}>{description}</Text>}
          <View style={styles.childrenContainer}>{children}</View>

          {mode !== 'loading' && (
            <View style={styles.buttonRow}>
              {buttonRow && (
                <View style={styles.buttonContainer}>
                  <Button
                    title="Cancel"
                    onPress={onCancle}
                    textStyle={styles.buttonText}
                    style={styles.button}
                  />
                </View>
              )}
              <View style={styles.buttonContainer}>
                <Button
                  title="Confirm"
                  style={styles.addButton}
                  textStyle={styles.addButtonText}
                  onPress={onConfirm}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SimpleModal;
