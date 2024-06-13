<template>
    <div class="chartcard">
      <div ref="chart" style="width: 100%; height: 500px;"></div>
    </div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, watch } from 'vue';
  
  export default defineComponent({
    props: {
      chartData: {
        type: Array,
        required: true,
        default: () => []
      }
    },
    setup(props) {
      const chart = ref(null);
  
      const drawChart = () => {
        const google = window.google;
        const data = new google.visualization.DataTable();
        data.addColumn('string', 'User ID');
        data.addColumn('number', 'Amount');
  
        //const formattedData = props.chartData.map(item => [item.userId, item.incomeCount]);
        const formattedData = props.chartData.map(item => {
        let amount = 0;
        if (item.incomeCount !== undefined) {
          amount = item.incomeCount;
        } else if (item.expenseCount !== undefined) {
          amount = item.expenseCount;
        } else if (item.totalCount !== undefined) {
          amount = item.totalCount;
        }
        return [item.userId, amount];
      });
        data.addRows(formattedData);
  
        const options = {
        backgroundColor: {
          fill: 'transparent'
        },
        legend: { position: 'bottom' },
        colors: ['#60584C'],
        lineWidth: 2, 
        series: {
          0: {
            lineDashStyle: [4, 4] 
          }
        }
      };
        const chartInstance = new google.visualization.ScatterChart(chart.value);
        chartInstance.draw(data, options);
      };
  
      onMounted(() => {
        if (!window.google) {
          const script = document.createElement('script');
          script.src = 'https://www.gstatic.com/charts/loader.js';
          script.onload = () => {
            window.google.charts.load('current', { packages: ['corechart'] });
            window.google.charts.setOnLoadCallback(drawChart);
          };
          document.head.appendChild(script);
        } else {
          window.google.charts.setOnLoadCallback(drawChart);
        }
      });
  
      watch(() => props.chartData, drawChart);
  
      return { chart };
    }
  });
  </script>
  
  <style scoped>
  .chartcard{
    border: 2px solid #FFCC00;
  }
  </style>
  