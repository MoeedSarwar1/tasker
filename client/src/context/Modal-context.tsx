import React, { createContext, useContext, useState, ReactNode } from 'react';
import SimpleModal from '../Components/Modal';

interface ModalOptions {
  title?: string;
  description?: string;
  iconName?: string;
  iconColor?: string;
  buttonRow?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  children?: ReactNode;
  mode?: 'success' | 'confirmation' | 'error';
}

interface ModalContextType {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<ModalOptions>({});

  const showModal = (opts: ModalOptions) => {
    setOptions(opts);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setOptions({});
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <SimpleModal
        mode={options.mode}
        visible={visible}
        children={options.children}
        title={options.title}
        description={options.description}
        iconName={options.iconName}
        iconColor={options.iconColor}
        buttonRow={options.buttonRow}
        onConfirm={() => {
          hideModal();
          options.onConfirm?.();
        }}
        onCancle={() => {
          hideModal();
          options.onCancel?.();
        }}
      />
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
