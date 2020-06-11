<template>
  <div class="message">
    <van-cell
      v-for="item of titles"
      :key="item.id"
      is-link
      :title="item.name"
      @click="chooseList(item.id)"
    />
    <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      actions: [],
      actions01: [],
      actions02: [],
      actions03: [],
      titles: []
    }
  },
  created() {
    this.fetch('/index/news', 1)
    this.fetch('/index/news', 2)
    this.fetch('/index/news', 3)
  },
  methods: {
    // 获取菜单
    async getList() {
      const { data: res } = await this.axios.get('/index/news', { params: { id: 1 } })
      let lang = sessionStorage.getItem('locale')
      if (lang == 'zh') {
        this.info01 = res.data.list.data.slice(0, 2)[0].zh_name
        this.info02 = res.data.list.data.slice(0, 2)[1].zh_name
      }
      if (lang == 'en') {
        this.info01 = res.data.list.data.slice(0, 2)[0].en_name
        this.info02 = res.data.list.data.slice(0, 2)[1].en_name
      }
      if (lang == 'ko') {
        this.info01 = res.data.list.data.slice(0, 2)[0].ko_name
        this.info02 = res.data.list.data.slice(0, 2)[1].ko_name
      }
      if (lang == 'jp') {
        this.info01 = res.data.list.data.slice(0, 2)[0].jp_name
        this.info02 = res.data.list.data.slice(0, 2)[1].jp_name
      }
    },
    // 选择子菜单
    onSelect(item) {
      this.show = false
      this.$router.push({ path: '/article', query: {id: item.id} })
    },
    // 请求主菜单
    async fetch(url, id) {
      const { data: res } = await this.axios.get(url, {
        params: {
          id
        }
      })
      let lang = sessionStorage.getItem('locale')
      if (lang == 'zh') {
        this.titles.push({ name: res.data.caInfo.zh_name, id })
        if (id == 1) {
          res.data.list.data.forEach(item => {
            this.actions01.push({ name: item.zh_name, id: item.id })
          })
        }
        if (id == 2) {
          res.data.list.data.forEach(item => {
            this.actions02.push({ name: item.zh_name, id: item.id })
          })
        }
        if (id == 3) {
          res.data.list.data.forEach(item => {
            this.actions03.push({ name: item.zh_name, id: item.id })
          })
        }
      }
      if (lang == 'en') {
        this.titles.push({ name: res.data.caInfo.en_name, id })
        if (id == 1) {
          res.data.list.data.forEach(item => {
            this.actions01.push({ name: item.en_name, id: item.id })
          })
        }
        if (id == 2) {
          res.data.list.data.forEach(item => {
            this.actions02.push({ name: item.en_name, id: item.id })
          })
        }
        if (id == 3) {
          res.data.list.data.forEach(item => {
            this.actions03.push({ name: item.en_name, id: item.id })
          })
        }
      }
      if (lang == 'ko') {
        this.titles.push({ name: res.data.caInfo.ko_name, id })
        if (id == 1) {
          res.data.list.data.forEach(item => {
            this.actions01.push({ name: item.ko_name, id: item.id })
          })
        }
        if (id == 2) {
          res.data.list.data.forEach(item => {
            this.actions02.push({ name: item.ko_name, id: item.id })
          })
        }
        if (id == 3) {
          res.data.list.data.forEach(item => {
            this.actions03.push({ name: item.ko_name, id: item.id })
          })
        }
      }
      if (lang == 'jp') {
        this.titles.push({ name: res.data.caInfo.jp_name, id })
        if (id == 1) {
          res.data.list.data.forEach(item => {
            this.actions01.push({ name: item.jp_name, id: item.id })
          })
        }
        if (id == 2) {
          res.data.list.data.forEach(item => {
            this.actions01.push({ name: item.jp_name, id: item.id })
          })
        }
        if (id == 3) {
          res.data.list.data.forEach(item => {
            this.actions01.push({ name: item.jp_name, id: item.id })
          })
        }
      }
    },
    // 选择主菜单
    chooseList(id) {
      this.show = true
      if(id==1) {
        this.actions = this.actions01
      }
      if(id==2) {
        this.actions = this.actions02
      }
      if(id==3) {
        this.actions = this.actions03
      }
    }
  }
}
</script>

<style lang="less" scoped>
.message {
  min-height: 100%;
  background: #ededed;
  .van-cell {
    margin-bottom: 8px;
  }
}
</style>