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

  }
});
