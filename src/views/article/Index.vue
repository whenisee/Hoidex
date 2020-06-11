<template>
  <div class="article">
    <h2 :style="[{'background':$store.state.mode?'#fff':'#1d2635'},{'color':!$store.state.mode?'#fff':'#1d2635'}]">
      <p @click="navBack">
        <i class="iconfont iconjiantou-copy"></i>
      </p>
      <p>返回</p>
    </h2>
    <article>
      <p v-html="name"></p>
      <section v-html="content"></section>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      content: ''
    }
  },
  created() {
    this.initContent()
  },
  methods: {
    // 获取内容
    async initContent() {
      const { data: res } = await this.axios.get('/index/article', {
        params: {
          id: this.$route.query.id
        }
      })
      let lang = sessionStorage.getItem('locale')
      console.log(res.data.info)
      if (lang == 'zh') {
        this.name = res.data.info.zh_name
        this.content = res.data.info.zh_content
      }
      if (lang == 'en') {
        this.name = res.data.info.en_name
        this.content = res.data.info.en_content
      }
      if (lang == 'ko') {
        this.name = res.data.info.ko_name
        this.content = res.data.info.ko_content
      }
      if (lang == 'jp') {
        this.name = res.data.info.jp_name
        this.content = res.data.info.jp_content
      }
    },
    // 返回
    navBack() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.article {
  box-sizing: border-box;
  article {
    padding: 30px;
    box-sizing: border-box;
    p {
      padding: 20px 0;
      font-size: 32px;
    }
      /deep/ p {
        padding: 10px;
        word-spacing: 2px;
        font-size: 28px;
        line-height: 32px;
        color: rgb(130, 142, 161) !important;
      }
      /deep/ font {
        color: rgb(130, 142, 161) !important;
      }
      /deep/ a {
        color: #fff;
        text-decoration: underline !important;
      }
      /deep/ div {
        color: rgb(130, 142, 161) !important;
      }
  }
  h2 {
    box-sizing: border-box;
    padding: 30px;
    display: flex;
    margin-bottom: 5px;
    p {
      font-size: 30px;
      i {
        padding-right: 20px;
      }
    }
  }
}
</style>