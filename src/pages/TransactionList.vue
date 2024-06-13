<template>
    <!-- Header 컴포넌트 렌더링, update-date 이벤트를 처리해서 updateDate method 호출 -->
    <div>
        <Header @update-date="updateDate" />
    </div>
    <!-- 카테고리 필터, 날짜 필터 -->
    <div>
        <select name="category" id="category" v-model="categoryFilterValue" @change="filterTransactions"
            class="form-select">
            <option value="total">전체 카테고리</option>
            <option value="입금">입금</option>
            <option value="출금">출금</option>
            <option value="송금">송금</option>
            <option value="기타">기타</option>
        </select>
        <input type="date" v-model="dateFilterValue" @input="filterTransactions" class="form-control">
    </div>
    <!-- 트랜잭션 테이블 -->
    <div class="container">
        <table class="table transaction-table">
            <thead>
                <tr>
                    <!-- 테이블 헤더 -->
                    <th>날짜</th>
                    <th>카테고리</th>
                    <th>금액</th>
                    <th>메모</th>
                    <th>수정</th>
                    <th>삭제</th>
                </tr>
            </thead>
            <tbody>
                <!-- 트랜잭션 리스트 -->
                <!-- @transaction-delete="removeTransaction": TransactionOne 컴포넌트에서 transcation-delete 이벤트가 발생할 때 removeTransaction method 호출 (삭제할 트랜잭션의 인덱스와 ID를 전달받음) -->
                <!-- @transaction-update="updateTransaction": TransacitonOne 컴포넌트에서 updateTransaction method 호출, 업데이트할 트랜잭션의 인덱스와 수정된 트랜잭션 객체를 전달받음 -->
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
import { useUsersStore } from '../stores/UsersStore'
import Header from '../components/Header.vue';

export default {
    name: 'TransactionList',
    components: {
        TransactionOne,
        Header
    },
    setup() {
        const transactions = ref([]);               // 전체 트랜잭션 리스트
        const dateFilterValue = ref('');            // 날짜 필터링 값
        const categoryFilterValue = ref('total');   // 기본적으로 전체 카테고리 선택

        const selectedYear = ref('2024');               // 선택된 연도
        const selectedMonth = ref('06');              // 선택된 월

        // Stores
        const transactionsStore = useTransactionsStore();       // 트랜잭션 스토어
        const usersStore = useUsersStore();                     // 사용자 스토어

        // 날짜 문자열 형식 변환 함수
        const formatDateString = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`
        }

        // 필터링된 트랜잭션 계산
        const filteredTransactions = computed(() => {

            // 현재 로그인한 사용자에 해당하는 트랜잭션 필터링
            let filtered = transactions.value.filter(transaction => transaction.userId === usersStore.getUserId);

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

            // 현재 선택된 연도와 월에 해당하는 거래만 필터링
            filtered = filtered.filter(transaction => {
                const transactionDate = new Date(transaction.date);
                return transactionDate.getFullYear() === parseInt(selectedYear.value) && transactionDate.getMonth() + 1 === parseInt(selectedMonth.value);
            })

            // 날짜를 기준으로 내림차순 정렬
            filtered.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB - dateA;
            });

            return filtered;
        });

        // 트랜잭션 목록 가져오기
        const fetchTransactions = async () => {
            await transactionsStore.getTransaction();
            transactions.value = transactionsStore.transactions;
        }

        // 트랜잭션 업데이트
        const updateTransaction = async (index, updatedTransaction) => {
            await transactionsStore.updateTransaction(index, updatedTransaction);
        }

        // 트랜잭션 삭제
        const removeTransaction = async (index, id) => {
            await transactionsStore.removeTransaction(index, id);
        }

        // 연도 및 월 업데이트
        const updateDate = ({ year, month }) => {
            selectedYear.value = year;
            selectedMonth.value = month;

            // 특정 연도와 월에 해당하는 거래들을 필터링
            const filtered = transactionsStore.transactions.filter(transaction => {
                const transactionDate = new Date(transaction.date);         // 거래의 날짜를 Date 객체로 변환
                return transactionDate.getFullYear() === parseInt(year) && transactionDate.getMonth() + 1 === parseInt(month);      // 거래의 월이 주어진 month와 일치하는지 확인
            });

            transactions.value = filtered

        }

        // 필터링 적용 함수
        const filterTransactions = () => {
            // 날짜 필터링 적용
            if (dateFilterValue.value) {
                transactions.value = transactions.value.filter(transaction => transaction.date === dateFilterValue.value);
            } else {
                fetchTransactions(); // 날짜 필터링이 해제되면 모든 거래 다시 불러오기
            }
        };

        // 컴포넌트가 마운트될 때 트랜잭션 목록 가져오기
        onMounted(() => {
            fetchTransactions();
        });

        return {
            transactions,
            dateFilterValue,
            categoryFilterValue,
            filteredTransactions,
            fetchTransactions,
            updateTransaction,
            removeTransaction,
            filterTransactions,
            selectedYear,
            selectedMonth,
            updateDate
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
