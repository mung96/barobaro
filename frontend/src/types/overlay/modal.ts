export type ModalType =
  | 'isComplete'
  | 'noPermissionEdit'
  | 'noPermissionDelete'
  | 'needPassword';

export type modalProps = {
  modalType: ModalType;
  isOpen: boolean;
  onRequestClose: () => void;
};
