<template>
<div class="profile">
    <div id="profile-header">
        <h3>홍길동</h3>
    </div>
    <hr class="custom-hr"/>

    <div id="profile-body">
        <!-- 이메일 -->
        <div id="profile-body-text">
            <h5 id="profile-first-text">이메일</h5>
            <h5 id="profile-second-text">abc</h5>
        </div>

        <!-- 성별 -->
        <div id="profile-body-text">
            <h5 id="profile-first-text">성별</h5>
            <h5 id="profile-second-text">abc</h5>
        </div>

        <!-- 생년월일 -->
        <div id="profile-body-text">
            <h5 id="profile-first-text">생년월일</h5>
            <h5 id="profile-second-text">abc</h5>
        </div>

        <!-- 전화번호 -->
        <div id="profile-body-text">
            <h5 id="profile-first-text">전화번호</h5>
            <h5 id="profile-second-text">abc</h5>
        </div>

        <div id="logout-div">
            <button type="button" class="btn btn-danger" id="logout-button">로그아웃</button>
        </div>
        <div id="app-setting-header">
            <h3>앱설정</h3>
            <hr class="custom-hr"/>
            <div id="language-setting">
                <h5>언어</h5>
            <select class="form-select" aria-label="Default select example">
            <option selected>언어 선택</option>
            <option value="1">한국어</option>
            <option value="2">english</option>
            </select>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {useUsersStore} from "../stores/UsersStore"
export default {
   setup(){
    const usersStore = useUsersStore();
   } 
}

</script>


<style scoped>
.profile{
  width: 100%;
}

#profile-header {
    margin: 30px 0px 5px 0px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}

#profile-body-text{
    display: flex;
    margin-bottom: 10px;
}

#profile-first-text {
    font-weight: bold;
    width: 20%;
    text-align: left; 
}
#profile-second-text{
    margin-left: 50px;
    text-align: left; 
}

#logout-button{
    margin-top: 20px;
}

#app-setting-header{
    text-align: left; 
    margin-top: 50px;
}

#language-setting{
    margin-top: 20px;
    display: flex;
    align-items: flex-end;
}
select{
    margin-left: 20px;
    width: 40%;
}
.custom-hr {
  height: 2px;
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
