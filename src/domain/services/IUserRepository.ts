import type { User } from "../entity/user";

export interface IUserRepository {
  getAll(): Promise<User[]>;
  create(user: User): Promise<User>;
}
