<template>
    <div>
        <h2>회원가입</h2>
        <table border="1">

        <tr>
            <td colspan="1">아이디</td>
            <td>
                <input v-model="username" placeholder="아이디를 입력하세요" size="50"/>
                <p>{{ message }}</p>
            </td>
            <td>
                <button @click="idcheck">중복확인</button>
            </td>
        </tr>

        <tr>
           <td>비밀번호</td> 
           <td>
                <input v-model="password" type="password" placeholder="비밀번호를 입력하세요" size="50"/>
           </td>
        </tr>
        <tr>
           <td>비밀번호확인</td> 
           <td>
                <input v-model="pwcheck" type="password" placeholder="비밀번호 확인" @blur="passwordCheckValid" size="50"/>
                <div v-if="!pwerrcheck">동일한 비밀번호가 아닙니다.</div> <!-- 동일한 비밀빈호 아닐 시 하단에 표시 -->
           </td>
        </tr>

        <tr>
           <td>이름</td> 
           <td>
                <input v-model="name" placeholder="이름을 입력하세요" size="50"/>
           </td>
        </tr>

        <tr>
           <td colspan="1">이메일</td> 
           <td>
                <input v-model="email" placeholder="이메일을 입력하세요" size="50"/>
           </td>
           <td>
                <button @click="idcheck">중복확인</button>
            </td>
        </tr>

        <tr>
            <td>휴대전화</td>
            <td>
                 <select v-model="first_phone">
                    <option value="010">010</option>
                    <option value="011">011</option>
                    <option value="016">016</option>
                    <option value="017">017</option>
                    <option value="018">018</option>
                    <option value="019">019</option>
                </select>
                <input type="number" v-model="second_phone">
                <input type="number" v-model="third_phone">
            </td>
        </tr>
        
        <tr>
            <td>생년월일</td>
            <td>
                <input type="date" id="birth" v-model="birth" size="50">
            </td>
        </tr>

        <tr>
            <td>성별</td>
            <td class="radio-group">
                <label><input type="radio" v-model="gender" name="gender" value="male">남자</label>
                <label><input type="radio" v-model="gender" name="gender" value="female">여자</label>
            </td>
        </tr>


        <tr>
            <td colspan="3">
                <button @click="account">회원가입</button>
                <a :href="'/'"><button @click="cancel">취소</button></a>
            </td>
        </tr>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"signup",
    data(){
        return{
            username:null,
            password:null,
            pwcheck:'',
            name:'',
            email:'',
            first_phone:'010', second_phone:'', third_phone:'',
            birth:'',
            gender:'',
            message:'',     
            pwerrcheck: true
        }
    },
    methods:{
        idcheck(){
            axios.post("http://localhost:3001/user", { "username":this.username })            
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
            if (this.pw === this.pwcheck) {
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
