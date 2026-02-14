export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt: string;
  updatedAt?: string;
}


export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  active?: boolean;
}

