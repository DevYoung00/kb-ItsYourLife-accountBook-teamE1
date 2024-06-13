<template>
  <div class="container mt-1">
    <h2 class="text-center">회원가입</h2>
    <form @submit.prevent="submitForm">


      <!-- 아이디 입력 부분-->
      <div class="form-group row">
        <label for="username" class="col-sm-3 col-form-label">아이디</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="username" placeholder="아이디를 입력하세요">
        </div>
        <div class="col-sm-3">
          <button type="button" class="btn btn-secondary" @click="checkUsername">중복확인</button>
        </div>
      </div>
      
      <!-- 비밀번호 입력 부분-->
      <div class="form-group row">
        <label for="password" class="col-sm-3 col-form-label">비밀번호</label>
        <div class="col-sm-6">
          <input type="password" class="form-control" v-model="password" placeholder="비밀번호를 입력하세요">
        </div>
      </div>
      
      <!-- 비밀번호 확인 부분-->
      <div class="form-group row">
        <label for="pwcheck" class="col-sm-3 col-form-label">비밀번호 확인</label>
        <div class="col-sm-6">
          <input type="password" class="form-control" v-model="pwcheck" placeholder="비밀번호 확인" @blur="passwordCheckValid">
          <div v-if="!pwerrcheck" class="text-danger">동일한 비밀번호가 아닙니다.</div>
        </div>
      </div>
      
      <!-- 이름 입력 부분-->
      <div class="form-group row">
        <label for="name" class="col-sm-3 col-form-label">이름</label>
        <div class="col-sm-6">
          <input type="text" class="form-control" v-model="name" placeholder="이름을 입력하세요">
        </div>
      </div>
      
      <!-- 이메일 입력 부분-->
      <div class="form-group row">
        <label for="email" class="col-sm-3 col-form-label">이메일</label>
        <div class="col-sm-6">
          <input type="email" class="form-control" v-model="email" placeholder="이메일을 입력하세요">
        </div>
        <div class="col-sm-3">
          <button type="button" class="btn btn-secondary" @click="checkEmail">중복확인</button>
        </div>
      </div>
      
      <!-- 휴대전화 입력 부분-->
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
      
      <!-- 생년월일 입력 부분-->
      <div class="form-group row">
        <label for="birthdate" class="col-sm-3 col-form-label">생년월일</label>
        <div class="col-sm-6">
          <input type="date" class="form-control" v-model="birth">
        </div>
      </div>
      
      <!-- 성별 선택 라디오-->
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
      
      <!-- 회원가입 버튼 -->
      <div class="form-group row">
        <div class="col-sm-8 offset-sm-2">
          <button type="submit" class="btn me-5" style="background-color: #ffcc00;">회원가입</button>
          <!-- 취소 버튼 , 취소 시 이전 페이지로 되돌아감-->
          <router-link to="/login"><button type="button" class="btn btn-outline-secondary">취소</button></router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useUserRegistrationStore } from '../stores/UserRegistration';
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 

export default {
  setup() {
    const userRegistrationStore = useUserRegistrationStore();
    const router = useRouter(); // Vue Router 인스턴스

    const username = ref(null);
    const password = ref('');
    const pwcheck = ref('');
    const name = ref('');
    const email = ref('');
    const phone1 = ref('010');
    const phone2 = ref('');
    const phone3 = ref('');
    const birth = ref('');
    const gender = ref('');
    const pwerrcheck = ref(true);
    const usernameCheck = ref(null);
    const emailCheck = ref(null);

    const submitForm = async () => {
      const userData = {
        username: username.value,
        password: password.value,
        name: name.value,
        email: email.value,
        phone: `${phone1.value}-${phone2.value}-${phone3.value}`,
        birth: birth.value,
        gender: gender.value
      };

      await userRegistrationStore.registerUser(userData);
    };

    const checkUsername = async () => {
      await userRegistrationStore.checkUsername(username.value);
    };

    const checkEmail = async () => {
      await userRegistrationStore.checkEmail(email.value);
    };

    const passwordCheckValid = () => {
      pwerrcheck.value = password.value === pwcheck.value;
    };

    return {
      username,
      password,
      pwcheck,
      name,
      email,
      phone1,
      phone2,
      phone3,
      birth,
      gender,
      pwerrcheck,
      usernameCheck,
      emailCheck,
      submitForm,
      checkUsername,
      checkEmail,
      passwordCheckValid
    };
  }
};
</script>

<style>

</style>
