<template>
    <div class="container mt-1">
      <h2 class="text-center">회원가입</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group row">
          <label for="username" class="col-sm-3 col-form-label">아이디</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="username" placeholder="아이디를 입력하세요">
          </div>
          <div class="col-sm-3">
            <button type="button" class="btn btn-secondary">중복확인</button>
          </div>
        </div>
        <div class="form-group row">
          <label for="password" class="col-sm-3 col-form-label">비밀번호</label>
          <div class="col-sm-6">
            <input type="password" class="form-control" v-model="password" placeholder="비밀번호를 입력하세요">
          </div>
        </div>
        <div class="form-group row">
          <label for="pwcheck" class="col-sm-3 col-form-label">비밀번호 확인</label>
          <div class="col-sm-6">
            <input type="password" class="form-control" v-model="pwcheck" placeholder="비밀번호 확인" @blur="passwordCheckValid">
            <div v-if="!pwerrcheck">동일한 비밀번호가 아닙니다.</div>
          </div>
        </div>
        <div class="form-group row">
          <label for="name" class="col-sm-3 col-form-label">이름</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" v-model="name" placeholder="이름을 입력하세요">
          </div>
        </div>
        <div class="form-group row">
          <label for="email" class="col-sm-3 col-form-label">이메일</label>
          <div class="col-sm-6">
            <input type="email" class="form-control" v-model="email" placeholder="이메일을 입력하세요">
          </div>
          <div class="col-sm-3">
            <button type="button" class="btn btn-secondary">중복확인</button>
          </div>
        </div>
        <div class="form-group row">
          <label for="phone" class="col-sm-3 col-form-label">휴대전화</label>
          <div class="col-sm-2">
            <select class="form-select" v-model="phone1">
              <option>010</option>
              <option>011</option>
              <option>106</option>
              <option>017</option>
              <option>018</option>
              <option>019</option>
            </select>
          </div>
          <div class="col-sm-2">
            <input type="text" class="form-control" v-model="phone2">
          </div>
          <div class="col-sm-2">
            <input type="text" class="form-control" v-model="phone3">
          </div>
        </div>
        <div class="form-group row">
          <label for="birthdate" class="col-sm-3 col-form-label">생년월일</label>
          <div class="col-sm-6">
            <input type="date" class="form-control" v-model="birth">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">성별</label>
          <div class="col-sm-7">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="gender" v-model="gender" value="male">
              <label class="form-check-label" for="male">남자</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="gender" v-model="gender" value="female">
              <label class="form-check-label" for="female">여자</label>
            </div>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8 offset-sm-2">
            <button type="submit" class="btn me-5" style="background-color: #ffcc00;">회원가입</button>
            <router-link to="/login"><button type="button" class="btn btn-outline-secondary">취소</button></router-link>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import { useUsersStore } from '../stores/UsersStore';
  
  export default {
    data() {
      return {
        username: null,
        password: '',
        pwcheck: '',
        name: '',
        email: '',
        phone1: '010',
        phone2: '',
        phone3: '',
        birth: '',
        gender: '',
        message: '',
        pwerrcheck: true
      };
    },
    methods: {
      async submitForm() {
        const userStore = useUsersStore();
        const userData = {
          username: this.username,
          password: this.password,
          name: this.name,
          email: this.email,
          phone: `${this.phone1}-${this.phone2}-${this.phone3}`,
          birth: this.birth,
          gender: this.gender
        };
  
        console.log('Submitting user data:', userData);
        const result = await userStore.signup(userData);
  
        if (result.success) {
          alert(result.message);
          this.$router.push('/login');
        } else {
          alert(result.message);
        }
      },
  
      passwordCheckValid() {
        this.pwerrcheck = (this.password === this.pwcheck);
      }
    }
  };
  </script>
  

  <style>
  
  </style>
  