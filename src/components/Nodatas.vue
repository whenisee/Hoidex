<template>
  <div class="content">
    <div>
      <i class="iconfont icon-xiaoxi"></i>
    </div>
    <div>{{$t('message.nothing')}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Nodatas'
  }
</script>

<style lang="less" scoped>
.content {
  box-sizing: border-box;
  background: rgb(29,38,53);
  display: flex;
  padding: 100px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  i {
    font-size: 50px;
  }
  div {
    margin-bottom: 10px;
  }
}
</style>