<template>
  <h1>MEMO</h1>
  <div id="grid-container">
    <MemoList
    v-on:sendDataToParent="receiveData" />
    <MemoEdit
    v-model:dataForEdit.sync="memo"
    v-on:edit-memo="updateMemo"
    v-on:delete-memo="deleteMemo"/>
  </div>
</template>

<script>
import MemoList from './components/MemoList.vue'
import MemoEdit from './components/MemoEdit.vue'

export default {
  name: 'App',
  data() {
    return{
      memo: []
    }
  },
  components: {
    MemoList, MemoEdit
  },
  methods: {
    receiveData(memo){
      this.memo = memo
    },
    updateMemo(content) {
      this.memo.text = content
    },
    deleteMemo() {
      this.memo.deleteFlag = true
    }
  }
}
</script>

<style>
html {
  background-color: #b2ffd8;
}
h1 {
  text-align: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

#grid-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% 1fr;
  place-items: start;
  justify-items: center;
}
#MemoList {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

#MemoEdit {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
</style>
