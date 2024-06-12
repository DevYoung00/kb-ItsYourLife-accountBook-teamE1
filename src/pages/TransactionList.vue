<template>
    <div>
        <select name="category" id="category" v-model="categoryFilterValue" @change="filterTransactions"
            class="form-select">
            <option value="total">카테고리 선택</option>
            <option value="입금">입금</option>
            <option value="출금">출금</option>
            <option value="송금">송금</option>
            <option value="기타">기타</option>
        </select>
        <input type="date" v-model="dateFilterValue" @input="filterTransactions" class="form-control">
    </div>
    <div class="container">
        <table class="table transaction-table">
            <thead>
                <tr>
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>메모</th>
                    <th>수정</th>
                    <th>삭제</th>
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
                const filterDate = formatDateString(dateFilterValue.value);
                filtered = filtered.filter(transaction => {
                    const transactionDate = formatDateString(transaction.date);
                    return transactionDate === filterDate;
                })
            }

            return filtered;
        });

        const fetchTransactions = async () => {
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
            showCategory.value = !showCategory.value;
        };

        const toggleDateFilter = () => {
            showDate.value = !showDate.value;
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

.transaction-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Arial', sans-serif;
    table-layout: fixed;
}

/* 필터 버튼 스타일 수정 */
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
</style>
