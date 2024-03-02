export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
}

export type UserTableProps = {
  blockedUsers: string[];
  handleBlockedUsers: (param: string) => void;
};
