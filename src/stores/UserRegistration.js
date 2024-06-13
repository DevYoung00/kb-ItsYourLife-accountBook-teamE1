
import { defineStore } from 'pinia';
import axios from 'axios';
import router from '../router'; 

const url = "http://localhost:3001/users";

export const useUserRegistrationStore = defineStore({
  id: 'userRegistrationStore',
  state: () => ({

  }),
  actions: {
    async registerUser(userData) {
      try {
        const response = await axios.post(url, userData);
        alert('회원가입에 성공하였습니다.');
        router.push('/login'); // 회원가입 성공 시 로그인 페이지로 이동함
      } catch (error) {
        console.error('회원가입 오류:', error);
        alert('회원가입에 실패하였습니다.');
      }
    },

    async checkUsername(username) {
      try {
        const response = await axios.get(`${url}?username=${username}`);
        if (response.data.length === 0) {
          this.usernameCheck = true; // 사용 가능한 아이디
          alert('사용 가능한 아이디입니다.');
        } else {
          this.usernameCheck = false; // 이미 사용 중인 아이디
          alert('이미 사용 중인 아이디입니다.');
        }
      } catch (error) {
        console.error('아이디 중복 확인 오류:', error);
        alert('아이디 중복 확인에 실패하였습니다.');
      }
    },

    async checkEmail(email) {
      try {
        const response = await axios.get(`${url}?email=${email}`);
        if (response.data.length === 0) {
          this.emailCheck = true; // 사용 가능한 이메일
          alert('사용 가능한 이메일입니다.');
        } else {
          this.emailCheck = false; // 이미 사용 중인 이메일
          alert('이미 사용 중인 이메일입니다.');
        }
      } catch (error) {
        console.error('이메일 중복 확인 오류:', error);
        alert('이메일 중복 확인에 실패하였습니다.');
      }
    },
  },
});
