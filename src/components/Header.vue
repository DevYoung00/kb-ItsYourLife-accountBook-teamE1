Header

<template>
<div class="header">
    <div id="gnb">
        <router-link to="/">
        <div id="home-btn">
            <img src="../assets/home_btn.png" alt="homeBtn"/>
        </div>
    </router-link>
    </div>
    <div id="header-date-picker" class="center">
        <div id="date-picker-div">
            <h3>{{ selectedMonth }}</h3>
            <input type="date" v-model="selectedDate" @change="handleDateChange">
        </div>
    </div>

    <div id="menu">
        <router-link to="/settings">
        <div id="setting-menu">
            <img src="../assets/setting_btn.png" alt="settingBtn"/>
            <p>설정</p>
        </div>
    </router-link>
    <router-link to="/profile">
        <div id="profile-menu">
            <img src="../assets/profile_btn.png" alt="profilegBtn"/>
            <p>프로필</p>
        </div>
    </router-link>
    </div>

</div>
</template>

<script>
import {ref,computed} from 'vue';
import { useTransactionsStore } from '../stores/TransactionsStore';

export default {
name: 'Header',

setup() {
    const transactionsStore = useTransactionsStore();
    const currentDate = new Date();
    const currentYear = ref(currentDate.getFullYear());
    const currentMonth = ref(currentDate.getMonth()+1);


    const selectedMonth = computed(() => {
        return `${currentYear.value}년 ${currentMonth.value}월`
    });

    const selectedDate = ref(`${currentYear.value}-${currentMonth.value}-${currentDate.getDate()}`);

    const handleDateChange  = () => {
        currentYear.value = parseInt(selectedDate.value.split('-')[0])
        currentMonth.value= parseInt(selectedDate.value.split('-')[1])
        const currentChangeDate = `${currentYear.value}-${currentMonth.value}`;
        transactionsStore.setCurrentChangeDate(currentChangeDate); 
    }



    return {
        selectedMonth,
        currentYear,
        currentMonth,
        handleDateChange,
        selectedDate
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

#setting-menu{
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

