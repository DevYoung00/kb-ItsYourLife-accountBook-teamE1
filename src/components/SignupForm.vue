<template>
    <div class="container mt-1">
        <h2 class="text-center">회원가입</h2>
        <form>
            <div class="form-group row">
                <label for="username" class="col-sm-2 col-form-label">아이디</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="username" placeholder="아이디를 입력하세요">
                </div>
                <div class="col-sm-2">
                    <button type="button" class="btn btn-secondary">중복확인</button>
                </div>
            </div>
            <div class="form-group row">
                <label for="password" class="col-sm-2 col-form-label">비밀번호</label>
                <div class="col-sm-6">
                    <input type="password" class="form-control" v-model="password" placeholder="비밀번호를 입력하세요">
                </div>
            </div>
            <div class="form-group row">
                <label for="pwcheck" class="col-sm-2 col-form-label">비밀번호 확인</label>
                <div class="col-sm-6">
                    <input type="password" class="form-control" v-model="pwcheck" placeholder="비밀번호 확인" @blur="passwordCheckValid">
                    <div v-if="!pwerrcheck">동일한 비밀번호가 아닙니다.</div>
                </div>
            </div>
            <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label">이름</label>
                <div class="col-sm-6">
                    <input type="text" class="form-control" v-model="name" placeholder="이름을 입력하세요">
                </div>
            </div>
            <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label">이메일</label>
                <div class="col-sm-6">
                    <input type="email" class="form-control" v-model="email" placeholder="이메일을 입력하세요">
                </div>
                <div class="col-sm-2">
                    <button type="button" class="btn btn-secondary">중복확인</button>
                </div>
            </div>
            <div class="form-group row">
                <label for="phone" class="col-sm-2 col-form-label">휴대전화</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" v-model="phone1" placeholder="010">
                </div>
                <div class="col-sm-2">
                    <input type="text" class="form-control" v-model="phone2">
                </div>
                <div class="col-sm-2">
                    <input type="text" class="form-control" v-model="phone3">
                </div>
            </div>
            <div class="form-group row">
                <label for="birthdate" class="col-sm-2 col-form-label">생년월일</label>
                <div class="col-sm-6">
                    <input type="date" class="form-control" v-model="birth">
                </div>
            </div>
            <div class="form-group row">
                <label class="col-sm-2 col-form-label">성별</label>
                <div class="col-sm-10">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" v-model="male" value="male">
                        <label class="form-check-label" for="male">남자</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="gender" v-model="female" value="female">
                        <label class="form-check-label" for="female">여자</label>
                    </div>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-8 offset-sm-2">
                    <button type="submit" class="btn btn-primary">회원가입</button>
                    <button type="button" class="btn btn-secondary">취소</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"signup",
    data(){
        return{
            username:null,
            password:'',
            pwcheck:'',
            name:'',
            email:'',
            phone1:'010', phone2:'', phone3:'',
            birth:'',
            gender:'',
            message:'',     
            pwerrcheck: true
        }
    },
    methods:{
        idcheck(){
            axios.post("http://localhost:3001/users", { "username":this.username })            
                .then((res)=>{
                    if(res.data.result === "NO"){
                        this.message = "중복된 아이디입니다";
                        this.username = "";
                    }else{
                        this.message = "사용 가능한 아이디입니다.";
                    }
                })
                .catch(err=>alert(err));

        },
        passwordCheckValid(){
            if (this.password === this.pwcheck) {
                this.pwerrcheck = true
            } else {
                this.pwerrcheck = false
            }
        },
        /* submitData() {
            const phone = {
                phone_num: this.phone_num,
                first_phone: this.first_phone,
                second_phone: this.second_phone
            }
        }, */

        account(){

            const profile = { username:this.username, password:this.password, name:this.name, email:this.email, birth:this.birth, phone:this.phone, gender:this.gender };

            axios.post("http://localhost:3001/signup", profile)
                .then(res=>{
                    alert('success');
                    if(res.data.result === "YES"){
                        alert("가입을 환영합니다");

                        this.$router.push({ name:'login' });
                    }
                })
                .catch(err=>alert(err));
        }
    }
}
</script>

<style>
    
</style>