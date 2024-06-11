<template>
    <div>
      <div class="container mt-5">
        <div class="mb-4">
          <h2 class="display-7 fw-bold">가계부 거래 등록</h2>
          <hr class="my-4">
        </div>
        <form @submit.prevent="handleSubmit" style="background-color: rgba(255, 165, 0, 0.3); padding: 20px; border-radius: 10px;"> <!-- form에 배경색 및 패딩 및 테두리 반경 추가 -->
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
          <div class="d-flex justify-content-center mb-3"> <!-- 중앙 정렬 및 간격 추가 -->
            <button type="submit" class="btn btn-primary me-3">저장</button> <!-- 간격 추가 -->
            <button type="button" class="btn btn-secondary" @click="handleCancel">취소</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useUsersStore } from '../stores/UsersStore' // 사용자 store 임포트
  
  export default {
    setup() {
      const userStore = useUsersStore(); // 사용자 store 사용
  
      const transaction = {
        category: '',
        date: '',
        amount: '',
        memo: ''
      };
  
      const handleSubmit = async () => {
        try {
          //마지막 데이터의 id 값 얻어와서 1 추가
          const response = await axios.get('http://localhost:3001/transactions');
          const lastPostId = response.data[response.data.length - 1].id;
          // console.log(lastPostId);
          const newPostId = Number(lastPostId) + 1;
  
          const userid = userStore.getUserId;
          console.log(userid);

          //게시물 id 값과 현재 로그인된 사용자 아이디 값 추가하여 json-server에 전송
          const newPostData = { id: newPostId.toString(), ...transaction, userId: userStore.getUserId };
  
          await axios.post('http://localhost:3001/transactions', newPostData);
          console.log("Transaction saved:", response.data);
          alert("거래가 저장되었습니다.");
          resetForm();
  
        } catch (error) {
          console.error("Error saving transaction:", error);
          alert("거래를 저장하는 중에 오류가 발생했습니다.");
        }
      };
  
      const handleCancel = () => {
        // 입력을 취소하고 이전 화면으로 돌아가는 로직 구현
        if (confirm("정말 취소하시겠습니까? 입력된 정보가 사라집니다.")) {
          resetForm();
          // 취소 시, 메인 페이지로 돌아가도록 설정
          this.$router.push('/');
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
  textarea{
      height: 200px;
      width: 400px;
  }
  
  input, select {
      width: 300px;
  }
  </style>
  