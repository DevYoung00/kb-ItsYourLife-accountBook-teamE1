<template>
    <tr :class="{'table-primary': isEven(index), 'table-light': !isEven(index)}">
        <td>{{ transaction.date }}</td>
        <td>{{ transaction.category }}</td>
        <td>{{ transaction.amount }}</td>
        <td>{{ transaction.memo }}</td>
        <td>
            <img @click="editTransaction" src="../assets/edit_9457213.png" alt="edit" width="30" />
        </td>
        <td>
            <img @click="deleteTransaction(transaction.id)" src="../assets/delete_12236920.png" alt="delete" width="30" />
        </td>
    </tr>

    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <!-- <h5 class="modal-title">거래 수정</h5> -->
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="date" class="form-label">Date:</label>
                        <input v-model="editedTransaction.date" id="date" type="date" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="category" class="form-label">Category:</label>
                        <select v-model="editedTransaction.category" class="form-select">
                            <option value="입금">입금</option>
                            <option value="출금">출금</option>
                            <option value="송금">송금</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="amount" class="form-label">Amount:</label>
                        <input v-model="editedTransaction.amount" id="amount" type="number" class="form-control" />
                    </div>
                    <div class="mb-3">
                        <label for="memo" class="form-label">Memo:</label>
                        <input v-model="editedTransaction.memo" id="memo" class="form-control" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="saveChanges">저장</button>
                    <button type="button" class="btn btn-secondary" @click="closeModal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { useTransactionsStore } from '../stores/TransactionsStore';

export default {
    name: 'TransactionComponent',
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
    setup(props, { emit }) {
        const transactionsStore = useTransactionsStore();

        const showModal = ref(false);
        const editedTransaction = reactive({
            id: null,
            date: '',
            category: '',
            amount: '',
            memo: ''
        });

        const editTransaction = () => {
            Object.assign(editedTransaction, { ...props.transaction });
            showModal.value = true;
        };

        const deleteTransaction = (id) => {
            emit('transaction-delete', props.index, id);
        };

        const saveChanges = () => {
            emit('transaction-update', props.index, editedTransaction);
            closeModal();
        };

        const closeModal = () => {
            showModal.value = false;
        };

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
</style>
