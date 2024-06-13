<template>
<div class="header">
    <div id="gnb">
        <router-link to="/">
        <div id="home-btn">
            <img src="../assets/home_btn.png" alt="homeBtn"/>
            <p>홈</p>
        </div>
    </router-link>
    <router-link to="/chart">
        <div id="chart-btn">
        <img src="../assets/chart_btn.png" alt="chartBtn"/>
        <p>통계</p>
    </div>
    </router-link>
    </div>
    <div id="header-date-picker" class="center">
        <img src="../assets/left_btn.png" id="left_btn" @click="handleLeftBtn"/>
        <div id="date-picker-div">
            <h3>{{ selectedMonth }}</h3>
            <!-- <input type="date" v-model="selectedDate" @change="handleDateChange"> -->
        </div>
        <img src="../assets/right_btn.png" id="right_btn" @click="handleRightBtn"/>
    </div>

    <div id="menu">
        <router-link to="/transactions/create">
        <div id="create-menu">
            <img src="../assets/create_btn.png" alt="createBtn"/>
            <p>거래추가</p>
        </div>
    </router-link>
        <router-link to="/transactions/list">
        <div id="setting-menu">
            <img src="../assets/trans_list_btn.png" alt="transBtn"/>
            <p>거래내역</p>
        </div>
    </router-link>

    <router-link v-if="isLogin" to="/profile">
        <div id="profile-menu">
            <img src="../assets/profile_btn.png" alt="profilegBtn"/>
            <p>프로필</p>
        </div>
    </router-link>
    <router-link v-else to="/login">
        <div id="profile-menu">
            <img src="../assets/profile_btn.png" alt="profilegBtn"/>
            <p>로그인</p>
        </div>
    </router-link>

    </div>
</div>
</template>

<script>
import {ref,computed,watch,onMounted} from 'vue';
import { useTransactionsStore } from '../stores/TransactionsStore';
import {useUsersStore} from "../stores/UsersStore"

export default {
name: 'Header',
emits: ['update-date'],     // 날짜 업데이트 이벤트
setup(props, { emit }) {
    const transactionsStore = useTransactionsStore();
    const usersStore = useUsersStore();
    const currentDate = new Date();
    const currentYear = ref(currentDate.getFullYear());
    const currentMonth = ref(currentDate.getMonth()+1);
    const isLogin = ref(false);


    const selectedMonth = computed(() => {
        return `${currentYear.value}년 ${currentMonth.value}월`
    });

    const selectedDate = ref(`${currentYear.value}-${currentMonth.value}-${currentDate.getDate()}`);

    const handleDateChange  = () => {
       // currentYear.value = parseInt(selectedDate.value.split('-')[0])
      //  currentMonth.value= parseInt(selectedDate.value.split('-')[1])
        const currentChangeDate = `${currentYear.value}-${currentMonth.value}`;
        transactionsStore.setCurrentChangeDate(currentChangeDate);
        emit('update-date', {year:  currentYear.value, month: currentMonth.value})
    };

    const handleLeftBtn = () => {
    console.log(currentMonth.value)
    if (parseInt(currentMonth.value) === 1) {
        currentYear.value--;
        currentMonth.value = 12;
    } else {
        currentMonth.value--;
    }
    handleDateChange()
};

const handleRightBtn = () => {
    if (
        parseInt(currentMonth.value) === parseInt(currentDate.getMonth() + 1) &&
        parseInt(currentYear.value) === parseInt(currentDate.getFullYear())
    ) {
        alert("현재 날짜 이후로는 변경 불가능합니다.");
    } else if (parseInt(currentMonth.value) === 12) {
        currentMonth.value = 1;
        currentYear.value++;
    } else {
        currentMonth.value++;
    }
    handleDateChange()
};

    watch(() => usersStore.getUserId, (value) => {
        console.log("header",value)
      if (value === "") isLogin.value = false;
      else isLogin.value= true;
    });

    onMounted(()=>{
        if(usersStore.getUserId === "") isLogin.value=false
        else isLogin.value=true
        console.log("header mounted ",usersStore.getUserId)
        console.log("header mounted ",isLogin)
    })

    return {
        selectedMonth,
        currentYear,
        currentMonth,
        handleDateChange,
        selectedDate,
        isLogin,
        handleLeftBtn,
        handleRightBtn
    };
  }
};
</script>

<style scoped>
.header{

    margin-top: 20px;
    justify-content: space-evenly;
    align-items: center;

    position: fixed;
    top:0;
    left:0;

    width: 100%;
    height: 15%;

    background-color: white;
    border-bottom: 2px solid black;
    z-index: 1000;
}


.header, #gnb, #header-date-picker,#menu {
    display: flex;
}

#date-picker-div{
    display: block;
}

#header-date-picker{
    align-items: center;
}

img{
    cursor: pointer;
    margin:15px;
    height: 60px;
}
#chart-btn{
    margin-left: 30px;
}

#setting-menu, #create-menu{
    margin-right: 80px;
}

#header-date-picker img{
    margin-left: 30px;
    margin-right: 30px;
}

h3{
    cursor: pointer;
}

a{
    text-decoration: none;
    color:black;
}

#gnb, #menu{
    width:20%;
}
</style>


