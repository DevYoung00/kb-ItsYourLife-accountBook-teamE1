import { defineStore } from 'pinia';
import axios from 'axios';

const url = "http://localhost:3001/transactions";

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
    }
  }
});
