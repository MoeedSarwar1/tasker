import React from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Button from '../Button';

interface SimpleModalProps {
  visible: boolean;
  onCancle?: () => void;
  title?: string;
  children?: React.ReactNode;
  onConfirm?: () => void;
  buttonRow?: boolean;
}

const SimpleModal: React.FC<SimpleModalProps> = ({
  visible,
  onCancle,
  title,
  children,
  onConfirm,
  buttonRow = true,
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
          {title && <Text style={styles.title}>{title}</Text>}
          <View style={styles.content}>{children}</View>
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
});
