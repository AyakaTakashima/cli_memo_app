<template>
  <h1>MEMO</h1>
  <div class="grid-container">
    <MemoList
      ref="memoList"
      v-on:send-data-to-parent="receiveData"
      class="memo-list"
      />
    <div v-if="this.$route.path.match(/edit$/)">
      <router-view
        class="edit-view"
        v-model:dataForEdit="memo"
        v-on:edit-memo="updateMemo"
        v-on:delete-memo="deleteMemo"
        />
    </div>
  </div>
</template>

<script>
  import MemoList from './components/MemoList.vue'
  
  export default {
    name: 'App',
    data() {
      return{
        memo: {}
      }
    },
    components: {
      MemoList
    },
    methods: {
      receiveData(memo){
        this.memo = memo
      },
      updateMemo(content) {
        this.memo.text = content
      },
      deleteMemo() {
        const idNumber = this.memo.id
        this.$refs.memoList.deleteMemoFromList(idNumber)
      }
    }
  }
</script>

<style scoped>
h1 {
  text-align: center;
}

.grid-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% 1fr;
  place-items: start;
  justify-items: center;
}
.memo-list {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.edit-view {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
</style>
