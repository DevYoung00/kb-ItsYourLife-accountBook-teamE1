<template>
    <div class="container mt-5">
        <h2>가계부 거래 등록</h2>
        <form @submit.prevent="handleSubmit">
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
            <button type="submit" class="btn btn-primary">저장</button>
            <button type="button" class="btn btn-secondary ms-2" @click="handleCancel">취소</button>
        </form>
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
                console.log(lastPostId);
                const newPostId = Number(lastPostId) + 1;

                // json-server에 POST 요청
                const newPostData = { id: newPostId.toString(), ...transaction, userId: userStore.userId };

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
                //this.$router.push('/');
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

<style scoped></style>