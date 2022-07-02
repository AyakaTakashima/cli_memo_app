<template>
  <div>
    <div id="textarea">
      <textarea
       id="memo_textarea"
       type="text"
       :value="dataForEdit.text"
       ></textarea>
    </div>
    <div id="buttons-box">
      <input id="delete-button" type="button" value="削除"
       v-on:click="deleteMemo(dataForEdit.id)"
       />
      <input id="save-button" type="button" value="保存"
       v-on:click="saveMemo(dataForEdit.id)"
       />
    </div>
  </div>
</template>

<script>
const editMemo = {
  props:{
    memoId: {type: Number},
    "dataForEdit": {type: undefined}
  },
  emits:[
    "update:dataForEdit",
    "delete-memo",
    "edit-memo"
    ],
  methods: {
    deleteMemo: function(memoId) {
      const deletedMemo = JSON.parse(localStorage[memoId])
      deletedMemo.deleteFlag = true
      localStorage.setItem(memoId, JSON.stringify(deletedMemo))
      this.$emit('delete-memo')
      const textarea = document.getElementById("memo_textarea")
      textarea.value = ""
      this.$router.push({path: '/'})
    },
    saveMemo: function(memoId) {
      const editedMemo = JSON.parse(localStorage[memoId])
      const content = document.getElementById("memo_textarea").value
      editedMemo.text = content
      localStorage.setItem(memoId, JSON.stringify(editedMemo))
      this.$emit('edit-memo', content)
    }
  }
}
export default editMemo
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

#buttons-box{
  position: relative;
  height: 100px;
}

#delete-button{
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

#delete-button:hover{
  opacity: 0.8;
}

#save-button{
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

#save-button:hover{
  opacity: 0.8;
}

</style>