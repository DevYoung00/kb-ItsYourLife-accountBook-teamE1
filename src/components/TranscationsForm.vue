<template>
  <div>
    <div class="container mt-5">
      <div class="mb-4">
        <h2 class="display-7 fw-bold">가계부 거래 등록</h2>
        <hr class="my-4">
      </div>
      <form @submit.prevent="handleSubmit"
        style="background-color: rgba(255, 165, 0, 0.3); padding: 20px; border-radius: 10px;">
        <div class="form-group mb-3">
          <label for="date">날짜 선택</label>
          <input type="date" id="date" v-model="transaction.date" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="amount">금액 입력</label>
          <input type="number" id="amount" v-model="transaction.amount" class="form-control" required>
        </div>
        <div class="form-group mb-3">
          <label for="category">카테고리 선택</label>
          <select id="category" v-model="transaction.category" class="form-control" required>
            <option value="" disabled>카테고리를 선택하세요</option>
            <option value="입금">입금</option>
            <option value="출금">출금</option>
            <option value="송금">송금</option>
            <option value="기타">기타</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="memo">메모 입력</label>
          <textarea id="memo" v-model="transaction.memo" class="form-control"></textarea>
        </div>
        <div class="d-flex justify-content-center mb-3">
          <button type="submit" class="btn btn-primary me-3">저장</button>
          <button type="button" class="btn btn-secondary" @click="handleCancel">취소</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useTransactionsStore } from '../stores/TransactionsStore';

export default {
  setup() {
    const transactionsStore = useTransactionsStore();
    const router = useRouter();

    const transaction = reactive({
      category: '',
      date: '',
      amount: '',
      memo: ''
    });

    const handleSubmit = async () => {
      await transactionsStore.addTransaction({ ...transaction}, router);
      resetForm();
    };

    //취소 시 메인화면으로 이동
    const handleCancel = () => {
      if (confirm("정말 취소하시겠습니까? 입력된 정보가 사라집니다.")) {
        resetForm();
        
        //메인 화면으로 이동
        router.push('/');
        alert("입력이 취소되었습니다.");
      }
      
    };

    const resetForm = () => {
      transaction.date = '';
      transaction.amount = '';
      transaction.category = '';
      transaction.memo = '';
    };

    return {
      transaction,
      handleSubmit,
      handleCancel
    };
  },
};
</script>

<style scoped>
textarea {
  height: 200px;
  width: 400px;
}

input,
select {
  width: 300px;
}
</style>
