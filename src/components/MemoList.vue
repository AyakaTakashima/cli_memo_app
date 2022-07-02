<template>
  <div id="memo-list-view">
    <div id="memo-list">
      <div
        class="memo"
        v-for="memo in memoListData"
        :key="memo.id"
        >
          <span
          v-on:click="getDataForEdit(memo.id)"
          v-cloak>
          <router-link :to="{ name: 'edit-url', params: {memoId: memo.id}}">
              {{ memoTitle(memo.text) }}
          </router-link>
          </span>
      </div>
    </div>
    <div id="add-memo">
      <button
        @click="addMemo"
        id="plus-button"
      >
        <span id="plus-icon">＋</span>
      </button>
    </div>
  </div>
</template>

<script>
  const memoList = {
    data() {
      return {
        memos: [],
      }
    },
    emits:["sendDataToParent"],
    computed: {
        memoListData: function() {
            return this.memos.filter(memo => memo.deleteFlag == false)
        },
    },
    mounted () {
      if (localStorage) {
        for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        const memo_data = JSON.parse(localStorage.getItem(key))
        this.memos.push(memo_data)
        }
      }
    },
    methods: {
      addMemo: function () {
        const idNumber = new Date().getTime().toString()
        const new_memo = {
          id: idNumber,
          text: '新規メモ',
          deleteFlag: false
        }
        localStorage.setItem(idNumber, JSON.stringify(new_memo))
        this.memos.push(new_memo)
        this.$emit('sendDataToParent', new_memo)
        this.$router.push({path: `/memos/${idNumber}/edit`})
      },
      getDataForEdit(memoId) {
        const memo = this.memos.find(memo => memo.id === memoId)
        this.$emit('sendDataToParent', memo)
      },
      memoTitle(text) {
        return text.split('\n')[0]
      },
    }
  }

  export default memoList
</script>

<style>
#memo-list{
  width: 400px;
}

.memo{
  padding: 10px;
}

.memo:hover {
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.memo:hover span{
  font-size: 20px
}

#add-memo{
  text-align: center;
  padding: 20px;
}

#plus-button{
  background-color: #f9fff9;
  border: 1px solid #008080;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

#plus-button:hover{
  opacity: 0.6;
}

#plus-icon{
  font-size: 20px;
  color: #7fffbf;
  font-weight: bold;
}

</style>
