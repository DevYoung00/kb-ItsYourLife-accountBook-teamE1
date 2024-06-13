import { defineStore } from 'pinia';
import axios from 'axios';

const url = "http://localhost:3001/users"

/**
 * 사용자 관련 상태 및 액션을 관리하는 스토어.
 */
export const useUsersStore = defineStore({
  id: 'usersStore',
  state: () => ({
    /**
     * 사용자 아이디 초기 상태.
     * @type {String}
     */
    userId: "",
    userInfo : {},
  }),
  // mutations, actions, getters
  actions: {
    /**
     * 사용자 세션 저장
     * @param {String} userId
     */
    setUserId(userId) {
      this.userId = userId;
      console.log(this.userId);
    },
    
     /**
     * 로그인 실행 함수
     * @param {String} username - 아이디
     * @param {String} password - 비밀번호
     * @returns {Object} 로그인 성공 여부 및 결과 메시지.
     * @async
     */
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

    //로그아웃 시, 세션 삭제
    logout() {
      this.userId = "";
    },

    async getUserInfo(){
      try{
        const response = await axios.get(`${url}?username=${this.userId}`);
        const userInfo = response.data[0];
        console.log(userInfo)
        console.log("11",userInfo)
        this.setUserInfo(userInfo);
      }
      catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: '예기치 않은 오류로 실패하였습니다.' };
      }
    },

    async updateUserInfo(userData){
      try{
        const response = await axios.put(`${url}/${userData.id}`, userData);
        alert("정보가 업데이트되었습니다.");
        return { success: true, message: '회원정보 수정 완료.' };
      
      }
      catch (error) {
        console.error('Error logging in:', error);
        return { success: false, message: '예기치 않은 오류로 실패하였습니다.' };
      }
    },


    setUserInfo(userInfo){
      this.userInfo = userInfo;
    },


  },

  getters: {
    /**
     * 세션으로 저장된 아이디 값 불러옴
     * @returns {String} 사용자 아이디.
     */
    getUserId() {
      console.log(this.userId);
      return this.userId;
    },
  }
});