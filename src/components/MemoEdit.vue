<template>
  <div class="grid-container">
    <MemoList
      class="memo-list-view"
      ref="memoList"
      />
    <div class="edit-view">
      <div>
        <textarea
          class="memo-edit-textarea"
          type="text"
          v-bind:value="textForEdit"
          v-on:change="updateMemo"
          ></textarea>
      </div>
      <div class="buttons-box">
        <input class="delete-button" type="button" value="削除"
          v-on:click="deleteMemo"
          />
        <input class="save-button" type="button" value="保存"
          v-on:click="saveMemo"
          />
      </div>
    </div>
  </div>
</template>

<script>
  import MemoList from './MemoList.vue'

  const editMemo = {
    data() {
      return {
        editingText: {}
      }
    },
    props:{
      memoId: {type: String},
    },
    computed: {
      textForEdit(){
        const memo = JSON.parse(localStorage.getItem(this.memoId))
        this.editingText = memo.text
        return memo.text
      }
    },
    components: {
      MemoList
    },
    methods: {
      deleteMemo() {
        localStorage.removeItem(this.memoId)

        this.$router.push({name: 'memo-list'})
      },
      updateMemo(event) {
        this.editingText = event.target.value
      },
      saveMemo() {
        const editedMemo = JSON.parse(localStorage[this.memoId])
        editedMemo.text = this.editingText
        localStorage.setItem(this.memoId, JSON.stringify(editedMemo))
        this.$refs.memoList.updateMemoList()
      }
    }
  }

  export { editMemo as default }
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% 1fr;
  place-items: start;
  justify-items: center;
}

.memo-list-view {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.edit-view {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}

.memo-edit-textarea {
  width: 400px;
  height: 300px;
  border-radius: 15px;
  border: none;
  padding: 10px;
  font-size: 20px;
}

.buttons-box{
  position: relative;
  height: 100px;
}

.delete-button{
  color: #f9fff9;
  font-weight: bold;
  border: none;
  background-color: #ff8e8e;
  border-radius: 10px;
  height: 40px;
  width: 110px;
  position: absolute;
  top: 20px;
  left: 50px;
  cursor: pointer;
}

.delete-button:hover{
  opacity: 0.8;
}

.save-button{
  color: #f9fff9;
  font-weight: bold;
  border: none;
  background-color: #008080;
  border-radius: 10px;
  height: 40px;
  width: 110px;
  position: absolute;
  top: 20px;
  right: 50px;
  cursor: pointer;
}

.save-button:hover{
  opacity: 0.8;
}

</style>