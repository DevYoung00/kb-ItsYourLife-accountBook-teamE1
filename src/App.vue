
<script setup>
import Header from "./components/Header.vue";
</script>

<template>
  <div id="app">
    <Header/>
    <div id="content">
    <router-view />
  </div>
  </div>
</template>

<style scoped>
#app {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Pretendard', sans-serif;
}

#content {
  margin-top: 120px;
  padding-bottom: 100px;
  width: 100%;
  flex-grow: 1;
  height: 100%; 
}
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

