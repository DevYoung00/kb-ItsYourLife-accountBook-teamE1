import { defineStore } from 'pinia';

export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    //사용자 아이디 초기 상태
    userId: "",
  }),
  // mutations, actions, getters
  actions: {
    //사용자 세션 설정
    setUserId(userId) {
      this.userId = userId;
      console.log(this.userId);
    },
    logout() {
      this.userId = "";
    },
  },

  //사용자 세션 값 불러올때 사용
  getters: {
    getUserId() {
      console.log(this.userId);
      return this.userId;
    }
  }
});