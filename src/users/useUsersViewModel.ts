import { ref } from "vue";
import { useFetchUserUseCase } from "../domain/usecase/fetch-user.usecase";
import type { User } from "../domain/entity/user";
import { useUsersRepository } from "../infrastructure/repository";
import { useCreateUserUseCase } from "../domain/usecase/create-user.usecase";

export const useUsersViewModel = () => {
  const users = ref<User[]>([]);
  const newUserName = ref("");
  const loading = ref(false);
  const error = ref("");

  const repo = useUsersRepository();
  const fetchUsersUseCase = useFetchUserUseCase(repo);
  const createUserUseCase = useCreateUserUseCase(repo);

  const fetchUsers = async () => {
    try {
      users.value = await fetchUsersUseCase();
    } catch {
      error.value = "Error loading users";
    }
  };

  const createUser = async () => {
    loading.value = true;
    error.value = "";

    try {
      const newUser = await createUserUseCase(newUserName.value);

      if (newUser) {
        users.value.push(newUser);
        newUserName.value = "";
      }
    } catch {
      error.value = "Error creating user";
    } finally {
      loading.value = false;
    }
  };

  return {
    users,
    newUserName,
    loading,
    error,
    fetchUsers,
    createUser,
  };
}
