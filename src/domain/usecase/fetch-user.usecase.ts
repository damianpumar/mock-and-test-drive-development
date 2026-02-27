import type { IUserRepository } from "../services/IUserRepository";

export const useFetchUserUseCase = (repository: IUserRepository) => {
  const fetchUsers = async () => {
    try {
      return await repository.getAll();
    } catch (err) {
      console.error(err); //TODO log error
      throw err;
    }
  };

  return fetchUsers
}
