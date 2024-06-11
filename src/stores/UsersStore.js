import { defineStore } from 'pinia';

export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    //사용자 아이디 초기 상태
    userId: "123",
  }),
  // mutations, actions, getters
});