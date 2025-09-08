import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal, StyleSheet, View } from 'react-native';
import Button from '../Button';
import Text from '../Text';

interface SimpleModalProps {
  visible: boolean;
  onCancle?: () => void;
  title?: string;
  iconName?: string;
  iconColor?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  buttonRow?: boolean;
  description?: string;
  mode?: 'success' | 'confirmation' | 'error';
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  visible,
  onCancle,
  title,
  onConfirm,
  description,
  buttonRow = true,
  iconName,
  iconColor,
  mode = 'success',
}) => {
  // 🎨 Mode-based styles
  const getModeStyles = () => {
    switch (mode) {
      case 'success':
        return {
          title: styles.successModalHeader,
          description: styles.successModalText,
        };
      case 'confirmation':
        return {
          title: styles.confirmModalHeader,
          description: styles.confirmModalText,
        };
      case 'error':
        return {
          title: styles.errorModalHeader,
          description: styles.errorModalText,
        };
      default:
        return {
          title: styles.modalHeader,
          description: styles.modalText,
        };
    }
  };

  const { title: titleStyle, description: descriptionStyle } = getModeStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancle} // for Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {iconName && <Icon name={iconName} size={64} color={iconColor} />}

          <Text style={titleStyle}>{title}</Text>
          <Text style={descriptionStyle}>{description}</Text>

          <View style={styles.buttonRow}>
            {buttonRow && (
              <View style={{ flex: 1 }}>
                <Button
                  title="Cancel"
                  onPress={onCancle}
                  textStyle={styles.buttonText}
                  style={styles.closeButton}
                />
              </View>
            )}

            <View style={{ flex: 1 }}>
              <Button
                title="Confirm"
                style={styles.addButton}
                textStyle={styles.buttonText}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SimpleModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
    padding: 20,
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  // ✅ Success
  successModalHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E4620',
  },
  successModalText: { textAlign: 'center', fontSize: 12, color: '#4CAF50' },

  // ⚠️ Confirmation
  confirmModalHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#664D03',
  },
  confirmModalText: { textAlign: 'center', fontSize: 12, color: '#D39E00' },

  // ❌ Error
  errorModalHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#58151C',
  },
  errorModalText: { textAlign: 'center', fontSize: 12, color: '#DC3545' },

  // Default / fallback
  modalHeader: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  modalText: { fontSize: 12, color: '#666' },

  buttonRow: { flexDirection: 'row', gap: 8, marginTop: 8 },
  closeButton: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#C0C0C0',
  },
  addButton: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#4B4B4B',
  },
  buttonText: { fontSize: 12 },
});
