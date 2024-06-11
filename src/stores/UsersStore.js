import { defineStore } from 'pinia';

export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    //사용자 아이디 초기 상태
    userId: null,
  }),
  // mutations, actions, getters
  actions: {
    setUserId(userId) {
      this.userId = userId;
      console.log(this.userId);
    },
    logout(){
      this.userId = null;
    }
  },
});