<template>
    <div class="container">
        <header>
            <h1>헤더 들어갈 자리</h1>
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
                        <button @click="toggleDateFilter()" class="filter-button">
                            <img src="../assets/calendar_981032.png" alt="datefilter" width="20" />
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
import axios from 'axios'
import TransactionOne from '../components/TransactionOne.vue'

export default {
    name: 'TransactionList',
    data() {
        return {
            transactions: [],
            dateFilterValue: '',
            categoryFilterValue: 'total', // 기본적으로 전체 카테고리 선택
            showCategory: false,
            showDate: false
        }
    },
    components: {
        TransactionOne
    },
    computed: {
        filteredTransactions() {
            let filtered = this.transactions;

            // 카테고리 필터링
            if (this.categoryFilterValue !== 'total') {
                filtered = filtered.filter(transaction => transaction.category === this.categoryFilterValue);
            }

            // 날짜 필터링
            if (this.dateFilterValue) {
                filtered = filtered.filter(transaction => transaction.date === this.dateFilterValue);
            }

            return filtered;
        }
    },
    created() {
        this.fetchTransactions()
    },
    methods: {
        fetchTransactions() {
            axios.get('http://localhost:3000/transactions')
                .then(response => {
                    this.transactions = response.data;
                })
                .catch(error => {
                    alert(error)
                })
        },

        updateTransaction(index, updatedTransaction) {
            axios.put(`http://localhost:3000/transactions/${updatedTransaction.id}`, updatedTransaction)
                .then(() => {
                    this.transactions[index] = updatedTransaction;
                    alert('수정 완료')
                })
                .catch(error => alert(error))
        },

        removeTransaction(index, id) {
            this.transactions.splice(index, 1);
            axios.delete(`http://localhost:3000/transactions/${id}`)
                .then(() => {
                    this.fetchTransactions();
                    console.log('Transaction deleted');
                })
                .catch(error => {
                    alert(error)
                });
        },

        toggleCategoryFilter() {
            this.showCategory = true;
        },

        toggleDateFilter() {
            this.showDate = true;
            if (!this.showDate) {
                this.dateFilterValue = ''; // 날짜 필터링 해제
                this.filterTransactions(); // 필터링 적용
            }
        },

        filterTransactions() {
            // 날짜 필터링 적용
            if (this.dateFilterValue) {
                this.transactions = this.transactions.filter(transaction => transaction.date === this.dateFilterValue);
            } else {
                this.fetchTransactions(); // 날짜 필터링이 해제되면 모든 거래 다시 불러오기
            }
        }
    }
}
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
