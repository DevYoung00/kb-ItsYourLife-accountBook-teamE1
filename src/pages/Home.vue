
<template>
    <div class="home">
        <div id="summary-card">
            <HomeCard :transactionsList="transactionsByDateList" />
        </div>
        <div>
            <!-- <h2>거래 목록</h2> -->
        </div>
        <div id="current-transaction-div">
            
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
                    <td :style="{color: transaction.category === '입금' ? 'green' : (transaction.category === '출금' ? 'red' : 'blue') }">{{ transaction.category }}</td>
                    <td>{{ transaction.memo }}</td>
                    <td>{{ transaction.amount }}원</td>
                </tr>
            </tbody>
            </table>
            </div>
            <div id="transaction-list-text-div">
            <button type="button" class="btn btn-outline-secondary">추가</button>
            <router-link to="/transactions/list">  <button type="button" class="btn btn-outline-secondary" id="current-transaction-btn">더보기</button></router-link>
            </div>
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
            currentTransactionList.value = transactionsByDateList.value.slice(0, 4);
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
    #transaction-list-text-div{
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: center;
    }
    #transaction-list-text-div button{
        margin-left: 5px;
        margin-right:5px;
    }

    #current-transaction-table{
        margin:20px;
    }


.table th, .table td {
  padding-left: 45px; 
  padding-right: 45px; 
}
    </style>
    
    
