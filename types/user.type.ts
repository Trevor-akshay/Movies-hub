type User = {
  email: string;
  password: string;
  name: string;
};

type UserPublic = {
  id: number;
  email: string;
  name: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type UserAuthRecord = {
  id: number;
  email: string;
  password: string;
};

export { User, UserPublic, UserAuthRecord };
