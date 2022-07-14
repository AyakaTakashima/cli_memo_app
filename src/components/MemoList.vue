<template>
  <div>
    <div class="memo-list">
      <div
        class="memo"
        v-for="memo in memos"
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
    <div class="add-memo">
      <button
        @click="addMemo"
        class="plus-button"
      >
        <span class="plus-icon">＋</span>
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
    emits:["send-data-to-parent"],
    mounted () {
      if (localStorage) {
        for (let i = 0; i < localStorage.length; i++) {
          const regex = new RegExp(/^M\d{13}$/);
          const key = localStorage.key(i)
          if (regex.test(key)) {
            const memoData = JSON.parse(localStorage.getItem(key))
            this.memos.push(memoData)
          }
        }
      }
    },
    methods: {
      addMemo() {
        const idNumber = 'M' + new Date().getTime().toString()
        const newMemo = {
          id: idNumber,
          text: '新規メモ',
        }
        localStorage.setItem(idNumber, JSON.stringify(newMemo))
        this.memos.push(newMemo)
        this.$emit('send-data-to-parent', newMemo)
        this.$router.push({path: `/memos/${idNumber}/edit`})
      },
      getDataForEdit(memoId) {
        const memo = this.memos.find(memo => memo.id === memoId)
        this.$emit('send-data-to-parent', memo)
      },
      memoTitle(text) {
        return text.split('\n')[0]
      },
      deleteMemoFromList(idNumber) {
        this.memos = this.memos.filter(memo => memo.id !== idNumber)
      }
    }
  }

  export { memoList as default }
</script>

<style>
html {
  background-color: #b2ffd8;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.memo-list{
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

.add-memo{
  text-align: center;
  padding: 20px;
}

.plus-button{
  background-color: #f9fff9;
  border: 1px solid #008080;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  cursor: pointer;
}

.plus-button:hover{
  opacity: 0.6;
}

.plus-icon{
  font-size: 20px;
  color: #7fffbf;
  font-weight: bold;
}

</style>
