Home
<template>
    <div class="home">
        <div id="current-transaction-div">
            <button type="button" id="current-transaction-btn" @click="showTransactionsForm = true">최근 거래 목록</button>
            
            <div id="current-transaction-table">
                <table class="table">
                <thead>
                <tr>
                <th scope="col">날짜</th>
                <th scope="col">카테고리</th>
                <th scope="col">메모</th>
                <th scope="col">금액</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="transaction in currentTransactionList" :key="transaction.id">
                    <td>{{ transaction.date }}</td>
                    <td>{{ transaction.category }}</td>
                    <td>{{ transaction.memo }}</td>
                    <td>{{ transaction.amount }}원</td>
                </tr>
            </tbody>
            </table>
            </div>
        </div>

        <div id="summary-card">
            <HomeCard :transactionsList="transactionsByDateList" />

        </div>
    </div>
    </template>
    
    <script>
    import {useTransactionsStore} from '../stores/TransactionsStore';
    import {ref,onMounted,watch} from 'vue';
    import HomeCard from "../components/HomeCard.vue";
    import TranscationsForm from "../components/TranscationsForm.vue"

    export default {
        components:{
            HomeCard,
            TranscationsForm
        },
        setup(){
        const transactionsList = ref([]);
        const currentTransactionList = ref([]);
        const transactionsByDateList = ref([]);
        const transactionsStore = useTransactionsStore();
        const showTransactionsForm = ref(false);

        function updateTransactionLists(){
            transactionsList.value = transactionsStore.transactions;
            transactionsByDateList.value = transactionsStore.transactionsByDate;
            currentTransactionList.value = transactionsByDateList.value.slice(0, 2);
            console.log(transactionsByDateList.value)
        }
        watch(() => transactionsStore.currentChangeDate, updateTransactionLists);

        onMounted(async () => {
        await transactionsStore.getTransaction(1);
        updateTransactionLists();
        });

        return {
            currentTransactionList,
            transactionsByDateList,
            showTransactionsForm
        };
        }
    }
    </script>
    
    
    <style scoped>
    #current-transaction-btn{
        background-color:#DAC182;
        border-radius:20px;
        width: 180px;
        font-weight: bold;
    }

    #current-transaction-table{
        margin:20px;
    }


.table th, .table td {
  padding-left: 45px; 
  padding-right: 45px; 
}
    </style>
    
    
