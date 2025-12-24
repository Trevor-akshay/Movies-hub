import { User, UserAuthRecord, UserPublic } from "../types/user.type.ts";
import { prisma } from "./prisma.ts";

export interface IUserDbService {
  getUsers(): Promise<UserPublic[]>;
  getUserById(id: number): Promise<UserPublic | null>;
  getUserByEmail(email: string): Promise<UserAuthRecord | null>;
  createUser(userData: User): Promise<UserPublic>;
}
class UserDbService implements IUserDbService {
  getUsers = async () => {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };

  getUserById = async (id: number) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };

  getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
  };

  createUser = async (userData: User) => {
    return await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  };
}

export default UserDbService;
