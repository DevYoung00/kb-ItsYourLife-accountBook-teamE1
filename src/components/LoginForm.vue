<template>
  <div class="loginbody">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center">Login</h2>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" id="username" class="form-control" v-model="username" required />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" id="password" class="form-control" v-model="password" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">Login</button>
              </form>
              <br/>
              <router-link to="/signup">회원가입</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUsersStore } from '../stores/UsersStore';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get(`http://localhost:3002/users`);
        const user = response.data.find(user => user.username === this.username && user.password === this.password);
        if (user) {
          const userStore = useUsersStore();
          userStore.setUserId(this.username);
          alert('로그인에 성공하였습니다.');
          //나중에 홈화면으로 이동하도록 수정 필요, 현재는 가계부 거래 등록 화면으로 넘어가도록 설정
          this.$router.push('/transactions/create');
        } else {
          alert('아이디/패스워드를 다시 한번 확인 부탁드립니다.');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        alert('예기치 않은 오류로 실패하였습니다.');
      }
    }
  }
};
</script>

<style scoped>
.loginbody {
  margin-top: 20px;
  justify-content: space-evenly;
  align-items: left;
  position: fixed;
  top: 300px;
  left: 0;
  width: 100%;
}

label {
  display: block;
  margin-left: 0;
}
</style>
