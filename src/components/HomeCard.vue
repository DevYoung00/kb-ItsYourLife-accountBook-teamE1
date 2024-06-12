<template>
    <div class="home-card">
      <div class="row row-cols-1 row-cols-md-3 g-4">
  
        <div class="col">
          <div class="card" id="home-card-first">
            <div id="income-chart" class="chart-container"></div>
            <div class="card-body">
              <h3 class="card-title">이번달 총수입</h3>
              <h5 class="card-text">{{ incomeCount }}원</h5>
            </div>
          </div>
        </div>
  
        <div class="col">
          <div class="card" id="home-card-second">
            <div id="expense-chart" class="chart-container"></div>
            <div class="card-body">
              <h3 class="card-title">이번달 총지출</h3>
              <h5 class="card-text">{{ expenseCount }}원</h5>
            </div>
          </div>
        </div>
  
        <div class="col">
          <div class="card" id="home-card-third">
            <div id="total-chart" class="chart-container"></div>
            <div class="card-body" id="home-card-third-body">
              <h3 class="card-title">이번달 순수익</h3>
              <h5 class="card-text">{{ totalCount }}원</h5>
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
      
      // 원 그래프 - 수입, 지출
      const drawPieChart = (dataList, id) => {
        if (!google.visualization) {
          google.charts.load('current', { 'packages': ['corechart'] });
          google.charts.setOnLoadCallback(() => {
            drawPieChart(dataList, id);
          });
        } else {
          const data = new google.visualization.DataTable();
          data.addColumn('string', 'memo');
          data.addColumn('number', 'Amount');
          data.addRows(dataList.map(transaction => [transaction.memo, transaction.amount]));
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
                pieHole: 0.4,
                width: '100%',
                height: '100%',
                legend: 'none' 
            };
          const chart = new google.visualization.PieChart(document.getElementById(id));
          chart.draw(data, options);
        }
    };

    // 막대 그래프 - 순수익
    const drawColumnChart = (incomeCount, expenseCount,totalCount) => {
        if (!google.visualization) {
          google.charts.load('current', { 'packages': ['corechart'] });
          google.charts.setOnLoadCallback(() => {
            drawColumnChart(incomeCount, expenseCount,totalCount);
          });
        } else {
          var data = google.visualization.arrayToDataTable([
            ['카테고리', '금액', { role:'style' }],
            ['수입', incomeCount,'#4FD36C'],
            ['지출', expenseCount,'#F29886'],
            ['순수익', totalCount,'#4B89DC']
          ]);
          const options = {
                backgroundColor: {
                    fill: 'transparent'
                },
                width: '100%',
                height: '100%',
                legend:'none',
                hAxis: {
                textStyle:{
                    color: 'white'
                  }
                },
                vAxis: {
                    textStyle:{
                        color: 'white'
                    }
                },
  
              
            };

          const chart = new google.visualization.ColumnChart(document.getElementById('total-chart'));
          chart.draw(data, options);
        }
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
        drawPieChart(incomeList.value, 'income-chart');
        drawPieChart(expenseList.value,'expense-chart')
        drawColumnChart(incomeCount.value,expenseCount.value, totalCount.value)
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
  .chart-container{
    margin-right:100px;
  }
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
    height: 300px; 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  @media (max-width: 750px) {
    .chart-container {
      height: 200px;
    }
  }
  
  @media (max-width: 576px) {
    .chart-container {
      height: 150px; 
    }
  }
  </style>
  