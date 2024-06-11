import { defineStore } from 'pinia';
import axios from 'axios';

const url = "http://localhost:3001/transactions";

export const useTransactionsStore = defineStore({
  id: 'transactionsStore',
  state: () => ({
    transactions: [],
    transactionsByDate:[],
    currentChangeDate: "2024-6"
  }),
  actions: {
    initTransactions(transactions) {
      this.transactions = transactions;
      this.filterTransactionsByDate()
    },
    async getTransaction(userId) {
      try {
        const response = await axios.get(`${url}?userId=${userId}`);
        console.log("transaction : ", response.data);
        this.initTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("거래 목록을 불러오는 중에 오류가 발생했습니다.");
      }
    },
    setCurrentChangeDate(date){
        this.currentChangeDate = date;
        this.filterTransactionsByDate()
    },
    filterTransactionsByDate(){
        this.transactionsByDate = this.transactions.filter(transaction => {
            return transaction.date.startsWith(this.currentChangeDate);
        })
    }
  },
});

