export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  operation: string;
}

export interface UserTableProps {
  blockedUsers: string[];
  handleUser: (param1: string, param2: string) => void
};
