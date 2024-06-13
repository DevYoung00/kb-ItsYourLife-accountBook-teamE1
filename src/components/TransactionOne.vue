<template>
    <!-- 행을 기준으로 짝수, 홀수 행에 따라 다른 클래스로 구문  -->
    <tr :class="{ 'table-primary': isEven(index), 'table-light': !isEven(index) }">
        <!-- 트랜잭션 날짜 -->
        <td>{{ transaction.date }}</td>
        <!-- 트랜잭션 카테고리 -->
        <td>{{ transaction.category }}</td>
        <!-- 트랜잭션 금액 -->
        <td>{{ transaction.amount }}</td>
        <!-- 트랜잭션 메모 -->
        <td>{{ transaction.memo }}</td>
        <!-- 수정 버튼 -->
        <td>
            <img @click="editTransaction" src="../assets/edit_9457213.png" alt="edit" width="30" />
        </td>
        <!-- 삭제 버튼 -->
        <td>
            <img @click="deleteTransaction(transaction.id)" src="../assets/delete_12236920.png" alt="delete"
                width="30" />
        </td>
    </tr>

    <!-- 모달 창: 트랜잭션 수정 -->
    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 class="modal-title">거래 수정</h5> -->
                    <!-- 모달 닫기 버튼 -->
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <!-- 날짜 입력 필드 -->
                    <div class="mb-3">
                        <label for="date" class="form-label">Date:</label>
                        <input v-model="editedTransaction.date" id="date" type="date" class="form-control" />
                    </div>
                    <!-- 카테고리 선택 필드 -->
                    <div class="mb-3">
                        <label for="category" class="form-label">Category:</label>
                        <select v-model="editedTransaction.category" class="form-select">
                            <option value="입금">입금</option>
                            <option value="출금">출금</option>
                            <option value="송금">송금</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <!-- 금액 입력 필드 -->
                    <div class="mb-3">
                        <label for="amount" class="form-label">Amount:</label>
                        <input v-model="editedTransaction.amount" id="amount" type="number" class="form-control" />
                    </div>
                    <!-- 메모 입력 필드 -->
                    <div class="mb-3">
                        <label for="memo" class="form-label">Memo:</label>
                        <input v-model="editedTransaction.memo" id="memo" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- 저장 버튼 -->
                    <button type="button" class="btn btn-primary" @click="saveChanges">저장</button>
                    <!-- 닫기 버튼 -->
                    <button type="button" class="btn btn-secondary" @click="closeModal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
    name: 'TransactionComponent',
    props: {
        // 트랜잭션 객체를 해당 컴포넌트에서 받음
        transaction: {
            type: Object,           // transaction prop의 타입은 객체
            required: true          // transaction prop은 필수
        },
        // 트랜잭션의 인덱스
        index: {
            type: Number,           // index prop의 타입은 숫자
            required: true          // 필수
        }
    },
    setup(props, { emit }) {

        const showModal = ref(false);               // 모달 창 표시 여부
        const editedTransaction = reactive({
            id: null,                               // 수정 중인 트랜잭션의 ID
            date: '',                               // 수정 중인 트랜잭션의 날짜
            category: '',                           // 수정 중인 트랜잭션의 카테고리
            amount: '',                             // 수정 중인 트랜잭션의 금액
            memo: ''                                // 수정 중인 트랜잭션의 메모
        });

        // 트랜잭션 수정 함수
        const editTransaction = () => {

            // 현재 트랜잭션 정보를 수정할 트랜잭션 객체에 복사
            Object.assign(editedTransaction, { ...props.transaction });
            showModal.value = true;
        };

        // 트랜잭션 삭제 함수
        const deleteTransaction = (id) => {

            // 상위 컴포넌트에 알림
            emit('transaction-delete', props.index, id);
        };

        // 수정 사항 저장 함수
        const saveChanges = () => {

            // 상위 컴폰넌트에 알림
            emit('transaction-update', props.index, editedTransaction);
            closeModal();
        };

        // 모달창 닫기 함수
        const closeModal = () => {
            showModal.value = false;
        };

        // 짝수 줄 여부 확인
        const isEven = (index) => {
            return index % 2 === 0;
        };

        return {
            showModal,
            editedTransaction,
            editTransaction,
            deleteTransaction,
            saveChanges,
            closeModal,
            isEven
        };
    }
};
</script>

<style scoped>
.modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
}

.table-primary {
    --bs-table-bg: #ffcc00;
}

img {
    cursor: pointer;
}
</style>
