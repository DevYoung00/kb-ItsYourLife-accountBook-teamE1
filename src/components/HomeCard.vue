<template>
    <div class="home-card">
      <div class="row row-cols-1 row-cols-md-3 g-4">
  
        <div class="col">
          <div class="card" id="home-card-first">
            <div id="income-chart" class="chart-container"></div>
            <div class="card-body">
              <h3 class="card-title">이번달 총수입</h3>
              <p class="card-text">{{ incomeCount }}</p>
            </div>
          </div>
        </div>
  
        <div class="col">
          <div class="card" id="home-card-second">
            <div id="expense-chart" class="chart-container"></div>
            <div class="card-body">
              <h3 class="card-title">이번달 총지출</h3>
              <p class="card-text">{{ expenseCount }}</p>
            </div>
          </div>
        </div>
  
        <div class="col">
          <div class="card" id="home-card-third">
            <div id="income-chart" class="chart-container"></div>
            <div class="card-body" id="home-card-third-body">
              <h3 class="card-title">이번달 순수익</h3>
              <p class="card-text">{{ totalCount }}</p>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  
  <script>
  import { useTransactionsStore } from '../stores/TransactionsStore';
  import { ref, watch } from 'vue';
  
  export default {
    name: "HomeCard",
  
    setup() {
      const transactionsStore = useTransactionsStore();
      const incomeList = ref([]);
      const expenseList = ref([]);
      const incomeCount = ref(0);
      const expenseCount = ref(0);
      const totalCount = ref(0);
  
      const drawChart = (dataList, id) => {
        const aggregatedData = {};
        dataList.forEach(item => {
            if (aggregatedData[item.memo]) {
                aggregatedData[item.memo] += item.amount;
            } else {
                aggregatedData[item.memo] = item.amount;
            }
        });

        const chartData = [['Memo', 'Amount']];
        for (const [memo, amount] of Object.entries(aggregatedData)) {
            chartData.push([memo, amount]);
        }

        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(() => {
            const data = google.visualization.arrayToDataTable(chartData);
            const options = {
                backgroundColor: {
                    fill: 'transparent'
                },
                chartArea: {
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%'
                },
                pieHole: 0.4, // 이 옵션은 도넛 차트로 만들어줍니다. 0으로 설정하면 일반 파이 차트가 됩니다.
                width: '100%', // 차트의 너비를 부모 요소에 맞춤
                height: '100%' // 차트의 높이를 부모 요소에 맞춤
            };
            const chart = new google.visualization.PieChart(document.getElementById(id));
            chart.draw(data, options);
        });
};

  
      watch(() => transactionsStore.transactionsByDate, (newTransactionsByDate) => {
        incomeList.value = [];
        expenseList.value = [];
        incomeCount.value = 0;
        expenseCount.value = 0;
        newTransactionsByDate.forEach(element => {
          if (element.category === "입금") {
            incomeList.value.push(element);
            incomeCount.value += element.amount;
          } else {
            expenseList.value.push(element);
            expenseCount.value += element.amount;
          }
        });
        totalCount.value = incomeCount.value - expenseCount.value;
        drawChart(incomeList.value, 'income-chart');
        drawChart(expenseList.value,'expense-chart')
      });
  
      return {
        incomeList,
        expenseList,
        incomeCount,
        expenseCount,
        totalCount
      }
    }
  }
  </script>
  
  <style scoped>
  .card {
    margin: 30px;
  }
  
  #home-card-first {
    background-color: #FFBC00;
  }
  
  #home-card-second {
    background-color: #FFCC00;
  }
  
  #home-card-third {
    background-color: #60584C;
  }
  
  #home-card-third-body {
    color: white;
  }
  
  .chart-container {
    width: 100%;
    height: 300px; /* 차트의 높이를 지정 */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: 768px) {
    .chart-container {
      height: 200px; /* 작은 화면에서는 차트 높이를 조정 */
    }
  }
  
  @media (max-width: 576px) {
    .chart-container {
      height: 150px; /* 더 작은 화면에서는 차트 높이를 더 조정 */
    }
  }
  </style>
  