
<script setup>
import Header from "./components/Header.vue";
import Calendar from './components/Calendar.vue';
</script>

<template>
  <div id="app">
    <Header />
    <router-view />
    <!-- <Calendar/> -->

  </div>
</template>

<style scoped>
</style>

<script>
import TransactionList from './pages/TransactionList.vue'

export default {
  name: 'App',
  components: {
    TransactionList
  }
}

</script>

