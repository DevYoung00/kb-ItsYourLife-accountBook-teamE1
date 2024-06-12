import { defineStore } from 'pinia';
import axios from 'axios';
import { useUsersStore } from './UsersStore';

const url = "http://localhost:3002/transactions";

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
    async getTransaction(userId) {
      try {
        const response = await axios.get(`${url}?userId=${userId}`);
        console.log("transaction:", response.data);
        this.initTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("거래 목록을 불러오는 중에 오류가 발생했습니다.");
      }
    },

    //전체 거래 목록 불러오는 함수
    async fetchTransactions() {
      try {
        const response = await axios.get(`${url}`);
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

    // 날짜로 필터링 
    filterTransactionsByDate() {
      this.transactionsByDate = this.transactions.filter(transaction =>
        transaction.date.startsWith(this.currentChangeDate)
      );
    },

    //거래 등록
    async addTransaction(transaction, router) {
      try {
        if (!this.transactions.length) {
          await this.fetchTransactions();
        }

        const lastTransaction = this.transactions[this.transactions.length - 1];
        const lastPostId = lastTransaction ? lastTransaction.id : 0;
        const newPostId = Number(lastPostId) + 1;

        const userStore = useUsersStore();
        const userId = userStore.getUserId;
        console.log(userId);
        if (!userId) {
          alert("로그인 후 사용 바랍니다.")
          router.push('/login');
        } else {
          const newTransaction = { id: newPostId.toString(), ...transaction, userId };

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
