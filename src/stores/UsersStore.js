import { defineStore } from 'pinia';
import axios from 'axios';

const url = "http://localhost:3001/users"

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
    async login(username, password) {
      try {
        const response = await axios.get(`${url}`);
        const user = response.data.find(user => user.username === username && user.password === password);
        if (user) {
          this.setUserId(username);
          return { success: true, message: '로그인에 성공하였습니다.' };
        } else {
          return { success: false, message: '아이디/패스워드를 다시 한번 확인 부탁드립니다.' };
        }
      } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: '예기치 않은 오류로 실패하였습니다.' };
      }
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