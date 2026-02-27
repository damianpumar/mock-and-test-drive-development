<script setup lang="ts">
import { useUsersViewModel } from "./users/useUsersViewModel";

const { users, newUserName, loading, error, fetchUsers, createUser } =
  useUsersViewModel();

fetchUsers();
</script>

<template>
  <div>
    <h1>Usuarios</h1>

    <form @submit.prevent="createUser">
      <input
        v-model="newUserName"
        type="text"
        placeholder="User name"
        :disabled="loading"
      />
      <button type="submit" :disabled="loading || !newUserName.trim()">
        {{ loading ? "Creating..." : "Create User" }}
      </button>
    </form>

    <p v-if="error" style="color: red">{{ error }}</p>

    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} (ID: {{ user.id }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
form {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}
</style>
