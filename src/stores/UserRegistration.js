import { defineStore } from 'pinia';
import axios from 'axios';

const url = "http://localhost:3001/users";

export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    userId: "",
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId;
      console.log(this.userId);
    },

    async signup(userData) {
      try {
        const response = await axios.post(url, userData);
        return { success: true, message: '회원가입에 성공하였습니다.' };
      } catch (error) {
        console.error('Error signing up:', error);
        return { success: false, message: '회원가입에 실패하였습니다.' };
      }
    },

    logout() {
      this.userId = "";
    }
  },

  getters: {
    getUserId() {
      console.log(this.userId);
      return this.userId;
    }
  }
});
