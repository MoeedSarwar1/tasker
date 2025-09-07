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
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancle} // for Android back button
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Icon name={iconName} size={64} color={iconColor} />
          <Text style={styles.successModalHeader}>{title}</Text>

          <Text style={styles.successModalText}>{description}</Text>
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
    borderColor: '#E5E7EB',
    marginHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  content: {
    marginBottom: 16,
  },
  closeButton: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#C0C0C0',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    backgroundColor: '#4B4B4B',
  },
  buttonText: {
    fontSize: 12,
  },
  successModalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#218838',
  },
  successModalText: {
    fontSize: 12,
    color: '#6FCF97',
  },
});
