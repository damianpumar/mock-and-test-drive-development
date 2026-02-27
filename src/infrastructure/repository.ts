import { User } from "../domain/entity/user";
import type { IUserRepository } from "../domain/services/IUserRepository";

const users: User[] = [];

export const useUsersRepository = (): IUserRepository => {
  const getAll = async () => {
    const response = await fetch("/api/users");

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  };

  const create = async (user: User) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: user.name }),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    const json = await response.json();

    const newbie = new User(json.id, json.name);

    users.push(newbie);

    return newbie;
  };

  return {
    getAll,
    create,
  };
}
