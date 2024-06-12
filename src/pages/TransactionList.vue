<template>
    <div class="container">
        <header>
            <h1>거래내역 조회</h1>
        </header>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>
                        카테고리
                        <button @click="toggleCategoryFilter()" class="filter-button">
                            <img src="../assets/funnel_3366201.png" alt="edit" width="20" />
                            <br>
                            <div v-if="showCategory">
                                <select name="category" id="category" v-model="categoryFilterValue"
                                    @change="filterTransactions">
                                    <option value="total">전체</option>
                                    <option value="입금">입금</option>
                                    <option value="출금">출금</option>
                                    <option value="송금">송금</option>
                                    <option value="기타">기타</option>
                                </select>
                            </div>
                        </button>
                    </th>
                    <th>금액</th>
                    <th>메모</th>
                    <th>수정</th>
                    <th>삭제</th>
                    <th>
                        <button  class="filter-button">
                            <img @click="toggleDateFilter()" src="../assets/calendar_981032.png" alt="datefilter" width="20" />
                            <br>
                            <div v-if="showDate">
                                <input type="date" v-model="dateFilterValue" @input="filterTransactions">
                            </div>
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <TransactionOne v-for="(transaction, idx) in filteredTransactions" :key="transaction.id"
                    :transaction="transaction" :index="idx" @transaction-delete="removeTransaction"
                    @transaction-update="updateTransaction" />
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';
import TransactionOne from '../components/TransactionOne.vue';
import { useTransactionsStore } from '../stores/TransactionsStore';

export default {
    name: 'TransactionList',
    components: {
        TransactionOne
    },
    setup() {
        const transactions = ref([]);
        const dateFilterValue = ref('');
        const categoryFilterValue = ref('total'); // 기본적으로 전체 카테고리 선택
        const showCategory = ref(false);
        const showDate = ref(false);

        const transactionsStore = useTransactionsStore();

        const formatDateString = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`
        }


        const filteredTransactions = computed(() => {
            let filtered = transactionsStore.transactions;

            // 카테고리 필터링
            if (categoryFilterValue.value !== 'total') {
                filtered = filtered.filter(transaction => transaction.category === categoryFilterValue.value);
            }

            // 날짜 필터링
            if (dateFilterValue.value) {
                // filtered = filtered.filter(transaction => transaction.date === dateFilterValue.value);
                const filterDate = formatDateString(dateFilterValue.value);
                filtered = filtered.filter(transaction => {
                    const transactionDate = formatDateString(transaction.date);
                    return transactionDate === filterDate;
                })
            }

            return filtered;
        });

        const fetchTransactions = async() => {
            await transactionsStore.fetchTransactions();
            transactions.value = transactionsStore.transactions;
        }

        const updateTransaction = async (index, updatedTransaction) => {
            await transactionsStore.updateTransaction(index, updatedTransaction);
        }

        const removeTransaction = async (index, id) => {
            await transactionsStore.removeTransaction(index, id);
        }

        const toggleCategoryFilter = () => {
            showCategory.value = true;
        };

        const toggleDateFilter = () => {
            if(showDate.value){
                showDate.value = false
            }else{
                showDate.value = true
            }
            if (!showDate.value) {
                dateFilterValue.value = ''; // 날짜 필터링 해제
                filterTransactions(); // 필터링 적용
            }
        };

        const filterTransactions = () => {
            // 날짜 필터링 적용
            if (dateFilterValue.value) {
                transactions.value = transactions.value.filter(transaction => transaction.date === dateFilterValue.value);
            } else {
                fetchTransactions(); // 날짜 필터링이 해제되면 모든 거래 다시 불러오기
            }
        };

        onMounted(() => {
            fetchTransactions();
        });

        return {
            transactions,
            dateFilterValue,
            categoryFilterValue,
            showCategory,
            showDate,
            filteredTransactions,
            fetchTransactions,
            updateTransaction,
            removeTransaction,
            toggleCategoryFilter,
            toggleDateFilter,
            filterTransactions
        };
    }
};
</script>


<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 20px;
}

.transaction-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Arial', sans-serif;
    background-color: rgb(239, 255, 8);
}

.transaction-table th,
.transaction-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.transaction-table th {
    background-color: #f2f2f2;
    color: #333;
}

.filter-button {
    background: none;
    border: none;
    cursor: pointer;
}

.filter-button img {
    vertical-align: middle;
}

.filter-button div {
    display: inline-block;
    vertical-align: middle;
}

.filter-button select {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
}

.filter-button input[type="date"] {
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 5px;
}
</style>
