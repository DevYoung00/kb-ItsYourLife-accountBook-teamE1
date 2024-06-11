import { defineStore } from 'pinia';

export const useTransactionsStore = defineStore({
  id: 'transactionsStore',
  state: () => ({
   transactions:[],
  }),
  mutations: () => ({
    initTransactions(transactions){
        this.transactions = transactions;
    }
  })
  // mutations, actions, getters
});