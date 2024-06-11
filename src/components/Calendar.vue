<template>
    <div class="calendar">
      <table class="calendar-table">
        <thead>
          <tr>
            <th colspan="7">{{ currentMonth }}</th>
          </tr>
          <tr>
            <th v-for="day in weekDays" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in calendar" :key="index">
            <td v-for="date in week" :key="date" class="calendar-cell">
              {{ date }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Calendar',
    setup() {
      const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
      const calendar = []; 
      const currentMonth = ref('');
  
      const updateCurrentMonth = () => {
        const currentDate = new Date();
        const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
        currentMonth.value = monthNames[currentDate.getMonth()] + ' ' + currentDate.getFullYear();
      };
  
      onMounted(() => {
        updateCurrentMonth();
      });
  
      return {
        weekDays,
        calendar,
        currentMonth,
        updateCurrentMonth
      };
    }
  };
  </script>
  
  <style scoped>
  .calendar {
    margin: 20px;
  }
  
  .calendar-table {
    border-collapse: collapse;
    width: 100%;
  }
  
  .calendar-table th,
  .calendar-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  
  .calendar-cell {
    height: 50px;
    cursor: pointer;
  }
  </style>
  