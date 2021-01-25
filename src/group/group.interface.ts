export interface User {
  id: string;
  role: string;
}

export interface IGroup {
  _id: string;
  name: string;
  description: string;
  type: string;
  tags: { label: string }[];
  users: User[];
  modifiedBy: User['id'];
  createdBy: User['id'];
  exchangeAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
