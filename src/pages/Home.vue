
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
            <button type="button" class="btn btn-outline-secondary" id="show-transaction-create-btn" @click="showTransactionsForm = true">추가</button>
            <router-link to="/transactions/list">  <button type="button" class="btn btn-outline-secondary" id="current-transaction-btn">더보기</button></router-link>
            </div>
        </div>
        <!-- 모달 창 -->
        <div v-if="showTransactionsForm" class="modal">
            <div class="modal-content">
                <span class="modal-close" @click="showTransactionsForm = false" style="font-size: 50px;">&times;</span>
                <TranscationsForm />
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import {useTransactionsStore} from '../stores/TransactionsStore';
    import {ref,onMounted,watch} from 'vue';
    import HomeCard from "../components/HomeCard.vue";
    import TranscationsForm from "../components/TranscationsForm.vue"
    import {useUsersStore} from "../stores/UsersStore"
    import { useRouter } from 'vue-router';

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
        const usersStore = useUsersStore()
        const showTransactionsForm = ref(false);
        const userId = ref('');
        const router = useRouter();

        function updateTransactionLists(){
            transactionsList.value = transactionsStore.transactions;
            transactionsByDateList.value = transactionsStore.transactionsByDate;
            currentTransactionList.value = transactionsByDateList.value.slice(0, 4);
            console.log(transactionsByDateList.value)
        }
        watch(() => transactionsStore.currentChangeDate, updateTransactionLists);

        onMounted(async () => {
        userId.value =  usersStore.getUserId
        console.log()
        if(userId.value===""){
            router.push("/login")
        }
        else {
            await transactionsStore.getTransaction();
            updateTransactionLists();
        }

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
/* 모달 스타일링 */
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}
.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
}
.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 1.5em;
}
    </style>
    
    
