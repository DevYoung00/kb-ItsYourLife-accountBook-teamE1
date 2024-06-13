<template>
    <div class="chart">
        <div id="chart_select_btn">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked @click="selectedType = 'income'">
            <label class="btn btn-outline-warning" for="btnradio1">총수입 통계</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" @click="selectedType = 'expense'">
            <label class="btn btn-outline-warning" for="btnradio2">총지출 통계</label>

            <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" @click="selectedType = 'total'">
            <label class="btn btn-outline-warning" for="btnradio3">순수익 통계</label>
            </div>
        </div>
        <div id="chartCard_div">
        <ChartCard :chartData="currentList"/>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, computed,watch } from 'vue';
import { useTransactionsStore } from '../stores/TransactionsStore';
import ChartCard from "../components/ChartCard.vue";

const transactionsStore = useTransactionsStore();
const selectedType = ref('income'); 
const incomeList = ref([]);
const expenseList = ref([]);
const totalList = ref([]);

const currentList = computed(() => {
    console.log(selectedType.value)
  switch (selectedType.value) {
    case 'income':
      return incomeList.value;
    case 'expense':
      return expenseList.value;
    case 'total':
      return totalList.value;
    default:
      return incomeList.value;
  }
});

const updateTransactionLists = async () => {
  const { incomeList: income, expenseList: expense, totalList: total } = await transactionsStore.getTotalAmountsByUser();
  incomeList.value = income;
  expenseList.value = expense;
  totalList.value = total;
};

onMounted(updateTransactionLists);

watch(() => transactionsStore.currentChangeDate, updateTransactionLists);
</script>

<style scoped>
.btn-group{
    width: 500px;
    margin-top: 30px;
}
label{
    color: black;
}
#chartCard_div{
    margin-top: 20px;
    width: 1000px;
    border-radius: 1px black;
}
</style>