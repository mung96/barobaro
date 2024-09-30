export type ModalType =
  | 'isComplete'
  | 'noPermissionEdit'
  | 'noPermissionDelete'
  | 'needPassword';

export type ModalProps = {
  modalType: ModalType;
  isOpen: boolean;
  onRequestClose: () => void;
};
