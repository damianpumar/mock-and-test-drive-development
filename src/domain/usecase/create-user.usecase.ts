import { User } from "../entity/user";
import type { IUserRepository } from "../services/IUserRepository";

export const useCreateUserUseCase = (repository: IUserRepository) => {
  const createUser = async (userName: string) => {
    if (!userName.trim()) return;

    try {
      return await repository.create(new User(userName));
    } catch (err) {
      console.error(err); //TODO log error
      throw err;
    }
  };

  return createUser;
}
