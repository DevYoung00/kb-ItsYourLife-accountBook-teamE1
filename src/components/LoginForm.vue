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
      const userStore = useUsersStore();
      const result = await userStore.login(this.username, this.password);
      if (result.success) {
        alert(result.message);

        //추후 메인 페이지로 이동하도록 수정
        this.$router.push('/transactions/create');
      } else {
        alert(result.message);
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
