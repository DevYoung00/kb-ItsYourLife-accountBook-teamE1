import { defineStore } from 'pinia';

export const useTransactionsStore = defineStore({
  id: 'transactionsStore',
  state: () => ({
    // transactions state
    transactions: []
  }),
  // mutations, actions, getters
  mutations: () => ({
    initTransactions(transactions){
      this.transactions = transactions;
    }
  })
  
});