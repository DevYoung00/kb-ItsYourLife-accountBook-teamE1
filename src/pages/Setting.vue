<template>
    <div class="setting">
        <div id="setting-header">
            <h3>정보 수정</h3>
        </div>
        <hr class="custom-hr"/>
    <div class="container mt-1">
      <form @submit.prevent="submitForm">

        <div class="form-group row">
          <label for="name" class="col-sm-3 col-form-label">이름</label>
          <div class="col-sm-6">
            <span class="form-control">{{userInfo.name}}</span>
          </div>
        </div>

        <div class="form-group row">
          <label for="username" class="col-sm-3 col-form-label">아이디</label>
          <div class="col-sm-6">
            <span type="text" class="form-control" >{{userInfo.username}}</span>
          </div>
        </div>

        <div class="form-group row">
          <label for="password" class="col-sm-3 col-form-label">비밀번호</label>
          <div class="col-sm-6">
            <input type="password" class="form-control" v-model="password" placeholder="새로운 비밀번호를 입력하세요">
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
          <label for="email" class="col-sm-3 col-form-label">이메일</label>
          <div class="col-sm-6">
              <span type="text" class="form-control" >{{userInfo.email}}</span>
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
            <span type="text" class="form-control" >{{userInfo.birth}}</span>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-3 col-form-label">성별</label>
          <div class="col-sm-6">
            <span type="text" class="form-control" >{{userInfo.gender}}</span>
          </div>
        </div>


        <div class="form-group row">
          <div class="col-sm-8 offset-sm-2">
            <button class="btn me-5" style="background-color: #ffcc00;" id="click-btn" @click="updateUserInfo">수정</button>
            <router-link to="/profile"><button type="button" class="btn btn-outline-secondary" id="click-btn">취소</button></router-link>
          </div>
        </div>
      </form>
    </div>
</div>
  </template>
  
  <script>
  import { useUsersStore } from '../stores/UsersStore';
  import {onMounted,watch,ref} from 'vue';
  import { useRouter } from 'vue-router';

  export default {
    data(){
        return{
            password:"",
            pwcheck:"",
            pwerrcheck:true,
            phone1:"",
            phone2:"",
            phone3:"",
        }
    },
    methods:{
        passwordCheckValid() {
        this.pwerrcheck = (this.password === this.pwcheck);
        },

        async updateUserInfo() {
            const usersStore = useUsersStore();
            const { id, username, name, email, birth, gender } = this.userInfo;
            const router = useRouter();
            let phone = "";

            if (this.phone1 && this.phone2 && this.phone3) {
                phone = `${this.phone1}-${this.phone2}-${this.phone3}`;
            } else {
                phone = this.userInfo.phone;
            }
            if(this.pwerrcheck){
                await usersStore.updateUserInfo({
                id,
                username,
                name,
                email,
                phone,
                birth,
                gender,
                password: this.password
                });
                this.$router.push("/profile");
            }
            else  alert("비밀번호 불일치.");
            
        }
    },
    setup(){
        const usersStore = useUsersStore();
        const userInfo = ref({});
        const router = useRouter();

        onMounted(async () => {
            await usersStore.getUserInfo();
        });

        watch(() => usersStore.userInfo, (value) => {
            userInfo.value = value;
            console.log(userInfo.value)
        });

        return {
            userInfo,
        }
    }
   
 };
</script>

<style scoped>
#setting-header {
    margin: 30px 0px 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
label,span{
    font-weight: bold;
}

.form-group{
    margin:10px
}
.custom-hr {
  height: 2px;
}
#click-btn{
    margin: 10px;
    width: 20%;
}

@media screen and (max-width: 600px) {
  .custom-hr {
    width: 300px
  }
}

@media screen and (min-width: 601px) and (max-width: 900px) {
  .custom-hr {
    width: 500px
  }
}

@media screen and (min-width: 901px) {
  .custom-hr {
    width: 1000px; 
  }
}
</style>
