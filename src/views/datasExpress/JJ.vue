<template>
  <div class="jj" :style="[{'background':$store.state.mode?'#fff':'#1d2635'}]">
    <div v-html="$parent.datas"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  created() {
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.jj {
  background: rgb(29, 38, 53);
  padding: 30px;
  h2 {
    color: #fff;
    font-size: 32px;
    padding: 10px 0;
  }
  div {
    color: rgb(130, 142, 161);
    font-size: 28px;
    padding-bottom: 100px;
    /deep/ p {
      padding-bottom: 30px !important;
      letter-spacing: 1px;
      line-height: 36px;
    }
    /deep/ p,h1,h2,h3,h4,h5,span,section,article,div,li {
      color: rgb(130, 142, 161) !important;
    }
    /deep/ a {
      color: #fff;
      text-decoration: underline !important;
    }
  }
}
</style>