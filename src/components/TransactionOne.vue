<template>
    <tr>
        <td>{{ transaction.date }}</td>
        <td>{{ transaction.category }}</td>
        <td>{{ transaction.amount }}</td>
        <td>{{ transaction.memo }}</td>
        <td>
            <img @click="editTransaction" src="../assets/edit_9457213.png" alt="edit" width="30" />
        </td>
        <td>
            <img @click="deleteTransaction(transaction.id)" src="../assets/delete_12236920.png" alt="delete"
                width="30" />
        </td>
    </tr>

    <div v-if="showModal" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>거래 수정</h2>
            <label for="date">Date:</label>
            <input v-model="editedTransaction.date" id="date" type="date" />

            <label for="category">Category:</label>
            <select v-model="editedTransaction.category">
                <option value="입금">입금</option>
                <option value="출금">출금</option>
                <option value="송금">송금</option>
                <option value="기타">기타</option>
            </select>

            <label for="amount">Amount:</label>
            <input v-model="editedTransaction.amount" id="amount" type="number" />

            <label for="memo">Memo:</label>
            <input v-model="editedTransaction.memo" id="memo" />

            <div class="modal-buttons">
                <button @click="saveChanges">저장</button>
                <button @click="closeModal">닫기</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        transaction: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showModal: false,
            editedTransaction: {
                id: null,
                date: '',
                category: '',
                amount: '',
                memo: '',
            }
        };
    },
    methods: {
        editTransaction() {
            this.editedTransaction = { ...this.transaction }
            this.showModal = true;
        },

        deleteTransaction(id) {
            this.$emit('transaction-delete', this.index, id);
        },

        saveChanges() {
            // 변경 내용 저장
            // alert(JSON.stringify(this.editedTransaction))
            this.$emit('transaction-update', this.index, this.editedTransaction);
            this.closeModal();
        },

        closeModal() {
            this.showModal = false;
        }
    }
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.modal-content h2 {
    margin-top: 0;
    color: #333;
}

.modal-content label {
    display: block;
    margin-bottom: 5px;
}

.modal-content input,
.modal-content select {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.modal-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.modal-buttons button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.modal-buttons button:hover {
    background-color: #45a049;
}

img {
    cursor: pointer;
}
</style>
