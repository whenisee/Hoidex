<template>
  <div class="jj" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <div v-html="$parent.datas"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.jj {
  padding: 30px;
  box-sizing: border-box;
  h2 {
    color: #fff;
    font-size: 32px;
    padding: 10px 0;
  }
  div {
    color: rgb(130, 142, 161);
    font-size: 28px;
    padding-bottom: 100px;
  }
}
/deep/ p {
  padding-bottom: 30px !important;
  letter-spacing: 1px;
  line-height: 36px;
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
/deep/ span {
  color: rgb(130, 142, 161) !important;
}
</style>