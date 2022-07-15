<template>
  <div>
    <div>
      <textarea
        type="text"
        :value="dataForEdit.text"
        v-on:change="updateData"
        ></textarea>
    </div>
    <div class="buttons-box">
      <input class="delete-button" type="button" value="削除"
        v-on:click="deleteMemo(dataForEdit.id)"
        />
      <input class="save-button" type="button" value="保存"
        v-on:click="saveMemo(dataForEdit.id)"
        />
    </div>
  </div>
</template>

<script>
  const editMemo = {
    data() {
      return {
        content: {},
      }
    },
    props:{
      memoId: {type: Number},
      dataForEdit: {type: undefined}
    },
    emits:[
      "send-data-to-parent",
      "delete-memo",
      "edit-memo"
      ],
    methods: {
      deleteMemo(memoId) {
        localStorage.removeItem(memoId)
        this.$emit('delete-memo')

        this.$router.push({path: '/'})
      },
      updateData(event) {
        this.content = event.target.value
      },
      saveMemo(memoId) {
        const editedMemo = JSON.parse(localStorage[memoId])
        editedMemo.text = this.content
        localStorage.setItem(memoId, JSON.stringify(editedMemo))
        this.$emit('edit-memo', this.content)
      }
    }
  }

  export { editMemo as default }
</script>

<style>
textarea {
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