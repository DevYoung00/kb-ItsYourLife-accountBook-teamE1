<template>
  <div class="loginbody">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center">로그인</h2>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">아이디</label>
                  <!--사용자가 입력한 아이디(username) 바인딩-->
                  <input type="text" id="username" class="form-control" v-model="username" placeholder="아이디를 입력해주세요"
                    required />
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">비밀번호</label>
                  <!--사용자가 입력한 패스워드(password) 바인딩-->
                  <input type="password" id="password" class="form-control" v-model="password"
                    placeholder="비밀번호를 입력해주세요" required />
                </div>
                <button type="submit" class="btn btn-primary w-100">
                  <p class="login-p">로그인</p>
                </button>
              </form>
              <br />
              <router-link to="/signup" class="router">회원가입</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from '../stores/UsersStore';

export default {
  data() {
    return {
      /**
       * 사용자 입력 아이디
       * @type {String}
       */
      username: '',

      /**
       * 사용자 입력 패스워드
       * @type {String}
       */
      password: ''
    };
  },
  methods: {
    /**
     * 로그인 함수.
     * UsersStore의 login 함수를 호출하여 로그인 처리
     * 로그인 성공 시 메인 페이지로 이동, 실패 시 경고 메시지를 표시
     * @async
     */
    async login() {
      const userStore = useUsersStore(); 
      //UsersStore의 로그인 함수 호출 
      const result = await userStore.login(this.username, this.password);
      if (result.success) {
        alert(result.message);

        //로그인 후 메인 페이지로 이동
        this.$router.push('/');
      } else {
        alert(result.message);
      }
    }
  }
};
</script>

<style scoped>
.loginbody {
  justify-content: space-evenly;
  align-items: left;
  position: fixed;
  left: 0;
  width: 100%;
  margin: auto;
}


label {
  font-size: 14px;
  padding-bottom: 3px;
  display: block;
  margin-left: 0;
  text-align: left;
}

h2 {
  font-size: 25px;
  padding-bottom: 10px;
}

button {
  background-color: rgb(255, 204, 0);
  border-color: rgb(255, 204, 0);
}

button:hover {
  background-color: rgb(255, 188, 0);
  border-color: rgb(255, 188, 0);
}

input:hover {
  border-color: rgb(255, 204, 0);
}

/* input 태그 클릭 스타일 */
input:focus {
  border-color: rgb(255, 188, 0);

  outline: none;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset;
}

input::placeholder {
  font-size: 14px;
}

.router {
  font-size: 12px;
  text-align: center;
  text-decoration-line: none;
  /* 밑줄 없애기 */
  color: rgb(255, 204, 0);
}

.login-p {
  font-size: 14px;
  margin: auto;
}

.card{
  background-color: #ffffff;
  box-shadow: 0 0 25px rgba(97, 97, 97, 0.2);
  border:none;
}
</style>
