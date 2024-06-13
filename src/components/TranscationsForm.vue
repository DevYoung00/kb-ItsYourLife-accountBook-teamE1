<template>
  <div class="Transbody">
    <div class="container mt-5" id="body">
      <div class="mb-4">
        <h2 class="display-7 fw-bold">가계부 거래 등록</h2>
        <hr class="my-4">
      </div>
      <!--저장 버튼 클릭시, handelSubmit함수 호출-->
      <form @submit.prevent="handleSubmit">
        <div class="form-body">
          <div class="form-group mb-3" id="select-date">
            <label for="date">날짜 선택</label>
            <input type="date" id="date" v-model="transaction.date" class="form-control" required>
          </div>
          <div class="form-group mb-3" id="select-amount">
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

    //반응형 객체 생성
    const transaction = reactive({
      category: '',
      date: '',
      amount: '',
      memo: ''
    });

    const handleSubmit = async () => {
      //TransactionsStore의 거래 추가 함수 호출
      await transactionsStore.addTransaction({ ...transaction }, router);
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
.Transbody {
  width: 60%;
  justify-content: space-evenly;
  align-items: left;
  position: fixed;
  top: 150px;
  left: 20%;
  text-align: left;
}

#body {
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 0 25px rgba(97, 97, 97, 0.2);
  border: none;
}

label {
  font-size: 14px;
  padding-bottom: 3px;
  display: block;
  margin-left: 0;
  text-align: left;
}

textarea {
  height: 200px;
  width: 75%;
  resize: none;
}

input,
select {
  width: 30%;
}
input[type=date]{
  width:100%;
}

h2 {
  font-size: 25px;
}

button {
  width: 100px;
  background-color: rgb(255, 204, 0);
  border-color: rgb(255, 204, 0);
}

button:hover {
  background-color: rgb(255, 188, 0);
  border-color: rgb(255, 188, 0);
}

input:hover,
textarea:hover,
select:hover {
  border-color: rgb(255, 204, 0);
}

input:focus,
textarea:focus,
select:focus {
  border-color: rgb(255, 188, 0);

  outline: none;
}

input::-webkit-inner-spin-button {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.form-body {
  padding-left: 15%;
}

#select-date{
  float:left;
  padding-right:28%;
}
</style>
