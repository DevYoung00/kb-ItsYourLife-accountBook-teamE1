import { defineStore } from 'pinia';
import axios from 'axios';
import { useUsersStore } from './UsersStore';

const url = "http://localhost:3002/transactions";

/**
 * 거래 관련 상태 및 액션을 관리하는 스토어
 */
export const useTransactionsStore = defineStore({
  id: 'transactionsStore',
  state: () => ({
    transactions: [],
    transactionsByDate: [],
    currentChangeDate: "2024-6"
  }),

  // 메소드 
  actions: {
    initTransactions(transactions) {
      this.transactions = transactions;
      this.filterTransactionsByDate();
    },
    // transaction get
    async getTransaction() {
      try {
        const userStore = useUsersStore();
        const userId = userStore.getUserId;
        console.log("userId",userId);
          const response = await axios.get(`${url}?userId=${userId}`);
          console.log("transaction:", response.data);
          this.initTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("거래 목록을 불러오는 중에 오류가 발생했습니다.");
      }
    },

    /**
     * 전체 거래 목록 불러오는 함수
     * @async
     */
    async fetchTransactions() {
      try {
        const response = await axios.get(`${url}`);
        //받아온 데이터 state에 저장
        this.transactions = response.data;
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("거래 목록을 불러오는 중에 오류가 발생했습니다.");
      }
    },

    // 날짜 변경 
    setCurrentChangeDate(date) {
      this.currentChangeDate = date;
      this.filterTransactionsByDate();
    },


    // 선택한 날짜에 맞게 필터링
    filterTransactionsByDate() {
        const [year, month] = this.currentChangeDate.split('-').map(Number);
        this.transactionsByDate = this.transactions.filter(transaction => {
        const [transactionYear, transactionMonth] = transaction.date.split('-').map(Number);
        return transactionYear === year && transactionMonth === month;
        });
      // transactionsByDate 리스트를 날짜 내림차순으로 정렬
      this.transactionsByDate.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });
      },

    // 모든 거래 불러오기
    async fetchTransactions() {
      try {
        const response = await axios.get(url);
        this.transactions = response.data;
      } catch (error) {
        alert('거래를 불러오지 못했습니다.');
      }
    },

    // 거래 수정
    async updateTransaction(index, updatedTransaction) {
      try {
        await axios.put(`${url}/${updatedTransaction.id}`, updatedTransaction);
        this.transactions[index] = updatedTransaction;
        alert('수정 완료');
      } catch (error) {
        alert('수정하지 못했습니다.');
      }
    },

    // 거래 삭제
    async removeTransaction(index, id) {
      try {
        this.transactions.splice(index, 1);
        await axios.delete(`${url}/${id}`);
        this.fetchTransactions();
        console.log('Transaction deleted');
      } catch (error) {
        alert('삭제하지 못했습니다.');
      }
    },

    /**
     * 거래 등록 함수
     * @param {Object} transaction
     * @param {Object} router
     * @async
     */
    async addTransaction(transaction, router) {
      try {
        //Json-server의 마지막 id 값 불러옴
        const lastTransaction = this.transactions[this.transactions.length - 1];
        const lastPostId = lastTransaction ? lastTransaction.id : 0; //마지막 데이터 존재 여부 확인 및 존재하지 않을 경우 id 값 0으로 설정
        const newPostId = Number(lastPostId) + 1;

        const userStore = useUsersStore();
        const userId = userStore.getUserId;
        console.log(userId);

        //세션에 값이 없을 시, 로그인 화면으로 이동
        if (!userId) {
          alert("로그인 후 사용 바랍니다.")
          router.push('/login');
        } else {
          const newTransaction = { id: newPostId, ...transaction, userId };
          //json-server에 값 전달 후 저장 요청
          await axios.post(`${url}`, newTransaction);
          this.transactions.push(newTransaction);

          console.log("거래가 저장되었습니다:", newTransaction);
          alert("거래가 저장되었습니다.");
        }
      } catch (error) {
        console.error("거래를 저장하는 중에 오류가 발생했습니다:", error);
        alert("거래를 저장하는 중에 오류가 발생했습니다.");
      }
    }
}
});
